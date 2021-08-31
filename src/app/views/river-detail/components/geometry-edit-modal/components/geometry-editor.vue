<template>
  <div>
    <section class="geom-editor-instructions">
      <h5 class="mode-name mb-spacing-xs">Editing in {{ mapEditMode }} Mode</h5>
      <template v-if="geometryMode === 'creating'">
        <p
          v-if="mapEditMode === 'automatic'"
          class="bx--type-caption mb-spacing-sm"
        >
          Click on the map to create the start and end points of your reach.
          When you click, your selection will automatically snap to the National
          Hydrography Dataset (NHD), a USGS dataset of rivers and streams. Once
          you've defined two points, the map will automatically calculate a path
          between the two.
        </p>
        <p
          v-if="mapEditMode === 'manual'"
          class="bx--type-caption mb-spacing-sm"
        >
          Click on the map to start defining a line segment. You can keep adding
          new vertices by clicking in new places or you can "complete" your line
          by clicking a second time on the last vertex you created. The dotted
          pink lines represent the USGS National Hydrography Dataset (NHD), a
          USGS dataset of rivers and streams.
        </p>
      </template>
      <template v-else>
        <p
          v-if="mapEditMode === 'automatic'"
          class="bx--type-caption mb-spacing-sm"
        >
          The dotted lines represent the National Hydrography Dataset (NHD), a
          USGS dataset of rivers and streams in the United States. To modify the
          reach, click on either endpoint to "activate" it, then click it again
          and drag to move elsewhere on the NHD. The points will automatically
          "snap" to the nearest flowline in the NHD as you drag. A new
          "geometry" (line) will be generated when you finish moving the point.
          It isn't saved until you click "Submit" below.
        </p>
        <p
          v-if="mapEditMode === 'manual'"
          class="bx--type-caption mb-spacing-sm"
        >
          Manual mode allows you to modify the line segment by hand. Click on
          the line segment to activate editing. A series of vertices will appear
          along the line. Click on one, then click again and drag to modify the
          line. Note: if you go back to automatic mode and modify the reach
          again, your changes will be overwritten.
        </p>
      </template>
    </section>
    <div id="nhd-editor-container">
      <div class="nhd-editor-mode-switcher">
        <cv-dropdown v-model="mapEditMode">
          <cv-dropdown-item value="automatic"> Automatic </cv-dropdown-item>
          <cv-dropdown-item value="manual"> Manual </cv-dropdown-item>
        </cv-dropdown>
      </div>
      <div v-if="currentGeom" class="nhd-editor-clear-map">
        <cv-button
          style="padding: 0.5rem 1.25rem"
          kind="danger"
          size="small"
          @click="clearMap"
        >
          Clear Map
        </cv-button>
      </div>
      <div v-if="calculating" class="calculating-indicator">
        <cv-inline-loading class="bx--tag--blue bx--tag" state="loading" />
      </div>
      <div id="nhd-editor" ref="nhdEditor" />
      <nwi-basemap-toggle :offset-right="false" />
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapState } from "vuex";
import { mapboxAccessToken } from "@/app/environment";
import NwiBasemapToggle from "@/app/views/river-index/components/nwi-basemap-toggle.vue";
import { mapHelpersMixin } from "@/app/global/mixins";
import lineSlice from "@turf/line-slice";
import { lineString, point } from "@turf/helpers";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import SnapMode from "../utils/SnapMode";
import DirectSelectMode from "../utils/DirectSelectMode";
import SnapDrawPointMode from "../utils/SnapDrawPointMode";
import StaticMode from "@mapbox/mapbox-gl-draw-static-mode";
import DrawStyles from "../utils/DrawStyles";

const defaultMapModes = {
  editing: {
    automatic: "SnapMode",
    manual: "DirectSelectMode",
  },
  creating: {
    automatic: "SnapDrawPointMode",
    manual: "draw_line_string",
  },
};

export default {
  name: "geometry-editor",
  components: {
    NwiBasemapToggle,
  },
  mixins: [mapHelpersMixin],
  data: () => ({
    currentGeom: null,
    mapEditMode: "automatic",
    calculating: false,
    map: null,
  }),
  computed: {
    // these basemaps are different than our other NWI maps because they use the NHD flowlines
    // as a result, we can't use the basemapToggleMixin
    baseMapUrl() {
      if (this.mapStyle === "topo") {
        return "mapbox://styles/americanwhitewater/ckbv35azb12w51initt7y2adv";
      } else if (this.mapStyle === "satellite") {
        return "mapbox://styles/americanwhitewater/ckbv3rzya136r1ioalj7qemof";
      } else {
        return "mapbox://styles/americanwhitewater/ckbv35azb12w51initt7y2adv";
      }
    },
    reachStart() {
      const geom = this.currentGeom || this.reachGeom;
      return geom ? point(geom.geometry.coordinates[0]) : null;
    },
    reachEnd() {
      const geom = this.currentGeom || this.reachGeom;
      return geom ? point(geom.geometry.coordinates.slice(-1)[0]) : null;
    },
    ...mapState({
      mapStyle: (state) => state.RiverIndex.mapStyle,
    }),
    startingBounds() {
      return this.reachStartingBounds;
    },
    // determines whether we need to add elements to the map
    // or edit ones that already exist
    geometryMode() {
      if (this.currentGeom) {
        return "editing";
      } else {
        return "creating";
      }
    },
  },
  watch: {
    mapStyle() {
      this.map.setStyle(this.baseMapUrl);
    },
    currentGeom(v, old) {
      if (v !== old) {
        this.$emit("updatedGeom", v);
      }
    },
    geometryMode() {
      this.setMapEditingMode(this.mapEditMode);
    },
    mapEditMode(v) {
      this.setMapEditingMode(v);
    },
  },
  methods: {
    clearMap() {
      if (confirm("Are you sure?")) {
        this.currentGeom = null;
        this.draw.deleteAll();
      }
    },
    // Logic for interacting with the USGS NLDI to create reach segments from the NHD
    // is borrowed from https://github.com/sdl60660/river-runner
    async calculateGeom() {
      const reachStart = this.draw.get("reachStart");
      const reachEnd = this.draw.get("reachEnd");

      this.draw.changeMode("StaticMode");

      let slicedReach;
      // attempt to use the NLDI to get the flowline matching the requested points
      try {
        this.calculating = true;
        let closestFeature;
        closestFeature = await this.findClosestFeature(reachStart);

        let flowlinesData;
        flowlinesData = await this.fetchNLDI(closestFeature);

        const combinedFlowlines = flowlinesData.features[0];
        combinedFlowlines.geometry.coordinates = flowlinesData.features
          .map((a) => a.geometry.coordinates)
          .flat();
        slicedReach = lineSlice(reachStart, reachEnd, combinedFlowlines);
        this.calculating = false;
      } catch {
        // if NLDI doesn't work for whatever reason, just return a straight line
        slicedReach = lineString([
          this.draw.get("reachStart").geometry.coordinates,
          this.draw.get("reachEnd").geometry.coordinates,
        ]);
      }
      this.draw.changeMode("SnapMode");

      return slicedReach;
    },
    setMapEditingMode(mode) {
      const newMode = defaultMapModes[this.geometryMode][mode];
      const opts = {};
      if (newMode === "DirectSelectMode") {
        opts.featureId = "reachGeom";
      }
      this.draw.changeMode(newMode, opts);

      this.renderDrawFeatures();
    },
    mountMap() {
      mapboxgl.accessToken = mapboxAccessToken;
      const mapProps = {
        container: this.$refs.nhdEditor,
        style: this.baseMapUrl,
        bounds: this.startingBounds,
        fitBoundsOptions: { padding: 80 },
        minZoom: 5,
      };
      this.map = new mapboxgl.Map(mapProps);

      this.draw = new MapboxDraw({
        displayControlsDefault: false,
        defaultMode: defaultMapModes[this.geometryMode][this.mapEditMode],
        styles: DrawStyles,
        modes: {
          StaticMode,
          DirectSelectMode,
          draw_line_string: MapboxDraw.modes.draw_line_string,
          simple_select: MapboxDraw.modes.simple_select,
          SnapDrawPointMode: {
            ...SnapDrawPointMode,
            config: {
              layers: ["nhdflowline"],
            },
          },
          SnapMode: {
            ...SnapMode,
            config: {
              layers: ["nhdflowline"],
            },
          },
        },
      });
      this.map.addControl(this.draw, "top-left");

      this.map.on("load", () => {
        this.renderDrawFeatures();
      });
      this.map.on("draw.update", async () => {
        if (this.mapEditMode === "automatic") {
          // calculate the new line "automatically"
          this.currentGeom = await this.calculateGeom();
          // render the new line
          this.draw.delete("reachGeom");
          this.draw.add({
            id: "reachGeom",
            ...this.currentGeom,
          });
        } else {
          // get the new geom from draw, where it was set
          this.currentGeom = this.draw.get("reachGeom");
        }
      });

      // for creating a new reach (or adding geom to one that doesn't have it)
      this.map.on("draw.create", async (e) => {
        if (this.mapEditMode === "manual") {
          const newReach = e.features[0];
          // need to copy to new feature with 'reachGeom' id to function with
          // existing logic
          this.draw.delete(newReach.id);
          newReach.id = "reachGeom";
          this.draw.add(newReach);
          this.currentGeom = newReach;
        } else {
          // automatic
          // in automatic mode, user is prompted to create two points (snapped to NHD)
          // then calculateGeom() is called
          const newPoint = e.features[0];
          this.draw.delete(newPoint.id);

          if (!this.draw.get("reachStart")) {
            newPoint.id = "reachStart";
          } else if (!this.draw.get("reachEnd")) {
            newPoint.id = "reachEnd";
          } else {
            return;
          }
          this.draw.add(newPoint);

          if (this.draw.get("reachStart") && this.draw.get("reachEnd")) {
            this.currentGeom = await this.calculateGeom();
            // render the new line
            this.draw.add({
              id: "reachGeom",
              ...this.currentGeom,
            });
          }
        }
      });
    },
    renderDrawFeatures() {
      if (!this.currentGeom) {
        return;
      }
      const features = [];
      // endpoints don't get rendered in "manual" mode
      if (this.mapEditMode === "automatic") {
        features.push(
          {
            id: "reachStart",
            ...this.reachStart,
          },
          {
            id: "reachEnd",
            ...this.reachEnd,
          }
        );
      }
      features.push({
        id: "reachGeom",
        ...this.currentGeom,
      });
      this.draw.set({
        type: "FeatureCollection",
        features: features,
      });
    },
    // Logic for interacting with the USGS NLDI to create reach segments from the NHD
    // is borrowed from https://github.com/sdl60660/river-runner
    async findClosestFeature(point) {
      let closestFeature;
      let resultFound = false;
      let roundingDigits = 6;
      while (resultFound === false && roundingDigits >= 0) {
        roundingDigits -= 1;
        const closestFeatureURL = `https://labs.waterdata.usgs.gov/api/nldi/linked-data/comid/position?coords=POINT%28${point.geometry.coordinates[0].toFixed(
          roundingDigits
        )}%20${point.geometry.coordinates[1].toFixed(roundingDigits)}%29`;
        const coordinateResponse = await fetch(closestFeatureURL);
        const data = await coordinateResponse.json();
        closestFeature = data.features[0];
        resultFound = true;
      }
      return closestFeature;
    },
    async fetchNLDI(closestFeature) {
      const siteURL =
        closestFeature.properties.navigation +
        "/DM/flowlines" +
        "?f=json&distance=6000";
      const response = await fetch(siteURL);
      try {
        const data = await response.json();
        return data;
      } catch {
        return null;
      }
    },
  },
  mounted() {
    // ensure that reachGeom prop is established
    this.$nextTick(() => {
      this.currentGeom = this.reachGeom;
      if (mapboxAccessToken) {
        this.mountMap();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.calculating-indicator {
  border-radius: 3px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  position: absolute;
  z-index: 1;
}
</style>