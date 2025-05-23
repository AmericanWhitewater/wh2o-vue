<template>
  <div
    id="rapid-map-editor-container"
    :style="height ? `height:${height}px`:''"
  >
    <div
      id="rapid-map-editor"
      ref="rapidMapEditor"
    />
    <nwi-basemap-toggle
      :offset-right="false"
    />
    <div
      v-if="reachGeom"
      id="snap-mode-control"
    >
      <cv-checkbox
        v-model="snapMode"
        value="Snap Mode"
        label="Snap to reach"
      />
    </div>
  </div>
</template>

<script>
import maplibregl from 'maplibre-gl'
import { mapState } from 'vuex'
import { basemapToggleMixin, mapHelpersMixin } from '@/app/global/mixins'
import debounce from 'lodash.debounce'

import { point } from '@turf/helpers'
import buffer from '@turf/buffer'
import bbox from '@turf/bbox'
import nearestPointOnLine from '@turf/nearest-point-on-line'
import booleanPointOnLine from '@turf/boolean-point-on-line'

export default {
  name: 'rapid-map-editor',
  mixins: [basemapToggleMixin, mapHelpersMixin],
  props: {
    height: {
      type: String,
      required: false
    },
    geom: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    snapMode: true,
    map: null,
    pointOfInterest: null
  }),
  computed: {
    ...mapState({
      mapStyle: state => state.RiverIndex.mapStyle,
      reach: state => state.RiverDetail.data,
      rapids: (state) => state.RiverRapids.data,
    }),
    bboxAroundRapid () {
      if (this.geom && this.geom.coordinates && this.geom.coordinates.length === 2) {
        return bbox(buffer(this.geom, 2))
      }
      return null
    },
    startingBounds () {
      return this.bboxAroundReach || this.bboxAroundRapid || this.bboxAroundPOIs || this.defaultMapBounds
    },
    boundsPadding () {
      if (this.reachGeom) {
        return 80
      }
      return 0
    },
    // returns true if geom prop is a defined point
    pointPassed () {
      return this.geom && this.geom.coordinates && this.geom.coordinates.length === 2
    },
    isPointOffLine () {
      return this.pointPassed && this.reachGeom && !booleanPointOnLine(this.geom, this.reachGeom, { epsilon: 5e-8 });
    }
  },
  watch: {
    // this ensures that if the lat/lng fields are changed
    // manually by the user, the marker updates accordingly
    geom: {
      deep: true,
      immediate: true,
      handler (newVal) {
        // if editing a point that is unsnapped, set snap mode to false
        if (this.isPointOffLine) {
          this.snapMode = false;
        }
        // if the marker already exists, either remove it or update its location
        if (this.pointOfInterest) {
          if (!this.pointPassed) {
            this.pointOfInterest.remove();
            this.pointOfInterest = null;
          } else {
            const oldCoords = this.pointOfInterest.getLngLat()
            if (oldCoords.lng !== newVal.coordinates[0] || oldCoords.lat !== newVal.coordinates[1]) {
              this.pointOfInterest.setLngLat([newVal.coordinates[0], newVal.coordinates[1]])
              // ensure it snaps if the coords have been changed upstream
              if (this.snapMode) {
                this.snapPOIToReach()
              }
            }
          }
        } else if (this.pointPassed) { // if there's no marker but there is a point prop
          this.renderPOI(this.geom);
        }
      },
    },
    reachGeom: {
      deep: true,
      handler () {
        this.loadReachSource();
      }
    },
    snapMode: {
      handler (newVal) {
        if (newVal) {
          this.snapPOIToReach();
        }
        this.conditionallyBindSnapHandler()
      }
    },
    startingBounds: {
      handler (bounds) {
        if (this.map) {
          this.map.fitBounds(bounds, {
            linear: true
          })
        }
      }
    }
  },
  methods: {
    conditionallyBindSnapHandler () {
      if (this.reachGeom && this.pointOfInterest) {
        if (this.snapMode) {
          this.pointOfInterest.on('drag', this.snapPOIToReach)
        } else {
          this.pointOfInterest.off('drag', this.snapPOIToReach)
        }
      }
    },
    bindMapClickHandler () {
      this.map.on("click", async (e) => {
        if (!this.pointOfInterest) { // does nothing if a point already exists
          const newPoint = point([e.lngLat.lng, e.lngLat.lat]);
          await this.renderPOI(newPoint.geometry);
          if (this.snapMode) {
            this.snapPOIToReach();
          } else { // snap function already emits location
            this.emitPOILocation();
          }
        }
      });
    },
    mountMap () {
      const mapProps = {
        container: this.$refs.rapidMapEditor,
        style: this.baseMapUrl,
        bounds: this.startingBounds,
        fitBoundsOptions: { padding: this.boundsPadding },
        attributionControl: false
      }

      this.map = new maplibregl.Map(mapProps)

      this.map.on('styledata', this.loadReach)
      this.map.on('load', () => {
        this.loadReach()
        this.bindMapClickHandler();
        if (this.pointPassed) {
          this.renderPOI(this.geom)
        }
      })
    },
    emitPOILocation () {
      this.$emit('poiMoved', this.pointOfInterest.getLngLat())
    },
    async renderPOI (geometry) {
      this.pointOfInterest = new maplibregl.Marker({
        draggable: true
      }).setLngLat(geometry.coordinates)
        .addTo(this.map)
      this.pointOfInterest.on('dragend', this.debouncedEmitPOILocation)
      this.conditionallyBindSnapHandler()
    },
    loadReachSource () {
      if (this.reachGeom) {
        // if the source is already present, replace the data
        const source = this.map.getSource('reachGeom');
        if (source !== undefined) {
          source.setData(this.reachGeom);
        } else {
          this.map.addSource('reachGeom', {
            type: 'geojson',
            data: {
              ...this.reachGeom
            }
          });
        }
      }
    },
    loadReach () {
      if (this.reachGeom) {
        this.loadReachSource();
        if (this.map.getLayer('reachGeom') === undefined) {
          this.map.addLayer({
            id: 'reachGeom',
            source: 'reachGeom',
            type: 'line',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': 'blue',
              'line-width': 6
            }
          })
        }
      }
    },
    snapPOIToReach () {
      const coords = this.pointOfInterest.getLngLat()
      const origPoint = point([coords.lng, coords.lat])
      const newPoint = nearestPointOnLine(this.reachGeom, origPoint, { units: 'miles' })
      this.pointOfInterest.setLngLat([newPoint.geometry.coordinates[0], newPoint.geometry.coordinates[1]])
      this.debouncedEmitPOILocation()
    }
  },
  mounted () {
    this.mountMap();

    this.debouncedEmitPOILocation = debounce(this.emitPOILocation, 200, {
      leading: false,
      trailing: true
    })
  },
  beforeDestroy() {
    if(this.map) {
      this.map.remove()
    }
  }
}

</script>
