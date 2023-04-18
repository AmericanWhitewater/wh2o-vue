<template>
  <div>
    <section class="geom-editor-instructions">
      <p class="bx--type-caption">
        "Automatic - AW" uses an AW-developed algorithm to calculate the river's
        path on top of the USGS NHD dataset. "Automatic - NLDI" uses a USGS
        interface called the "Network-Linked Data Index" -- it works reliably
        but can be less accurate than the AW algorithm. Manual allows you to
        define reaches by hand.
      </p>
      <hr >
      <h5 class="mode-name mb-spacing-xs">Editing in {{ mapEditMode }} Mode</h5>

      <template v-if="geometryMode === 'creating'">
        <p v-if="isAutomaticMode" class="bx--type-caption mb-spacing-sm">
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
        <p v-if="isAutomaticMode" class="bx--type-caption mb-spacing-sm">
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
      <cv-inline-notification
        v-if="tooZoomedOut && !noticeHidden"
        kind="warning"
        title="Zoom in to edit"
        sub-title="Since the editor snaps to a very dense dataset (the National Hydrography Dataset), you can only edit it meaningfully at closer zoom levels. Zoom in to enable editing."
        @close="noticeHidden = true"
      />
    </section>
    <div id="nhd-editor-container">
      <div class="nhd-editor-mode-switcher">
        <cv-select v-model="mapEditMode" label="" class="cv-select-without-label">
          <cv-select-option value="automatic">
            Automatic - AW
          </cv-select-option>
          <cv-select-option value="automatic-nldi">
            Automatic - NLDI
          </cv-select-option>
          <cv-select-option value="manual"> Manual </cv-select-option>
        </cv-select>
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
import maplibregl from "maplibre-gl";
import { mapState } from "vuex";
import { mapboxAccessToken } from "@/app/environment";
import NwiBasemapToggle from "@/app/views/river-index/components/nwi-basemap-toggle.vue";
import { mapHelpersMixin } from "@/app/global/mixins";
import { lineString, point } from "@turf/helpers";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import SnapMode from "../utils/SnapMode";
import DirectSelectMode from "../utils/DirectSelectMode";
import SnapDrawPointMode from "../utils/SnapDrawPointMode";
import StaticMode from "@mapbox/mapbox-gl-draw-static-mode";
import DrawStyles from "../utils/DrawStyles";
import { NHDTilesService } from "../utils/NHDTilesService";
import NLDIService from "../utils/NLDIService";

const defaultMapModes = {
  editing: {
    automatic: "SnapMode",
    "automatic-nldi": "SnapMode",
    manual: "DirectSelectMode",
  },
  creating: {
    automatic: "SnapDrawPointMode",
    "automatic-nldi": "SnapDrawPointMode",
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
    tooZoomedOut: false,
    noticeHidden: false,
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
      reach: state => state.RiverDetail.data,
      rapids: state => state.RiverRapids.data,
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
    isAutomaticMode() {
      return (
        this.mapEditMode === "automatic" ||
        this.mapEditMode === "automatic-nldi"
      );
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
    // turns off editing when user is too zoomed out
    tooZoomedOut(v) {
      if (v) {
        // deactivate editing
        this.draw.changeMode("StaticMode");
      } else {
        // switch back to currently active mode
        this.setMapEditingMode(this.mapEditMode);
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
    setInitialEditMode() {
      if (this.geometryMode === "editing") {
        // if editing, default to AW algorithm
        this.mapEditMode = "automatic";
      } else if (this.geometryMode === "creating") {
        // if new reach, default to NLDI
        this.mapEditMode = "automatic-nldi";
      }
    },
    clearMap() {
      if (confirm("Are you sure?")) {
        this.currentGeom = null;
        this.draw.deleteAll();
      }
    },
    async calculateGeom() {
      this.calculating = true;
      let newGeom;
      const reachStart = this.draw.get("reachStart");
      const reachEnd = this.draw.get("reachEnd");
      if (this.mapEditMode === "automatic") {
        newGeom = this.NHDTilesService.calculateGeom(
          reachStart,
          reachEnd,
          this.currentGeom
        );
      } else if (this.mapEditMode === "automatic-nldi") {
        newGeom = await NLDIService.calculateGeom(reachStart, reachEnd);
      }

      this.calculating = false;
      return newGeom;
    },
    setMapEditingMode(mode) {
      // if we're too zoomed out, editing mode is StaticMode
      // and we should keep it that way
      if (!this.tooZoomedOut) {
        const newMode = defaultMapModes[this.geometryMode][mode];
        const opts = {};
        if (newMode === "DirectSelectMode") {
          opts.featureId = "reachGeom";
        }
        this.draw.changeMode(newMode, opts);
      }

      this.renderDrawFeatures();
    },
    mountMap() {
      maplibregl.accessToken = mapboxAccessToken
      const mapProps = {
        container: this.$refs.nhdEditor,
        style: this.baseMapUrl,
        bounds: this.startingBounds,
        fitBoundsOptions: { padding: 80 },
        minZoom: 5,
        attributionControl: false
      };
      this.map = new maplibregl.Map(mapProps);

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
        this.setTooZoomedOut();
      });

      this.map.on("zoomend", this.setTooZoomedOut);

      this.map.on("draw.update", async () => {
        if (this.isAutomaticMode) {
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
            // add straight line from start to finish to facilitate geom calculation
            this.currentGeom = lineString(
              [
                this.draw.get("reachStart").geometry.coordinates,
                this.draw.get("reachEnd").geometry.coordinates,
              ],
              {},
              { id: "reachGeom" }
            );

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
    setTooZoomedOut() {
      const zoom = this.map.getZoom();
      // we can't support NHD calculations when too zoomed out computationally
      // plus, you can't really accurately "snap" to the NHD when you aren't zoomed
      // in enough to see it. So at low zooms, put the map in static mode and display
      // a notice
      if (zoom < 11) {
        this.tooZoomedOut = true;
      } else {
        this.tooZoomedOut = false;
      }
    },
    renderDrawFeatures() {
      if (!this.currentGeom) {
        return;
      }
      const features = [];
      // endpoints don't get rendered in "manual" mode
      if (this.isAutomaticMode) {
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
  },
  mounted() {
    // ensure that reachGeom prop is established
    this.$nextTick(() => {
      this.currentGeom = this.reachGeom;
      if (mapboxAccessToken) {
        this.mountMap();
        this.NHDTilesService = new NHDTilesService(this.map);
        this.setInitialEditMode();
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
.geom-editor-instructions {
  padding: 0 1rem;

  h5.mode-name {
    text-transform: capitalize;
  }
  max-width: 80%;
}

#nhd-editor-container {
  height: 70vh;
  position: relative;
  width: 100%;

  .nhd-editor-mode-switcher {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    display: block;
    left: 0.5rem;
    position: absolute;
    top: 0.5rem;
    width: 11rem;
    z-index: 1;

    .bx--select-input {
      border-radius: 3px;
    }

    button.bx--dropdown-text {
      cursor: pointer;
    }
  }

  .nhd-editor-clear-map {
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    display: block;
    left: 12rem;
    position: absolute;
    top: 0.5rem;
    z-index: 1;

    button {
      padding: 3px;
      text-align: center;
      vertical-align: text-top;
      width: unset;
    }
  }
}

#nhd-editor {
  background-color: $ui-03;
  height: 100%;
  width: 100%;
}
</style>