<template>
  <div
    id="nwi-map-editor-container"
    :style="height ? `height:${height}px`:''"
  >
    <div
      id="nwi-map-editor"
      ref="nwiMapEditor"
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
import mapboxgl from 'mapbox-gl'
import { mapState } from 'vuex'
import { basemapToggleMixin, mapHelpersMixin } from '@/app/global/mixins'
import {
  mapboxAccessToken
} from '@/app/environment'
import debounce from 'lodash.debounce'

import { lineString, point } from '@turf/helpers'
import buffer from '@turf/buffer'
import bbox from '@turf/bbox'
import nearestPointOnLine from '@turf/nearest-point-on-line'

export default {
  name: 'nwi-map-editor',
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
    // TODO: we may want to default snapMode on or off depending
    // on whether the point is *already* snapped to the line
    snapMode: true
  }),
  computed: {
    ...mapState({
      mapStyle: state => state.riverIndexState.riverIndexData.mapStyle,
      data: state => state.riverDetailState.riverDetailData.data
    }),
    reachGeom () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.data?.geom?.split(',').map(d => d.split(' '))
      return geom ? lineString(geom) : null
    },
    bboxAroundPoint () {
      if (this.geom && this.geom.coordinates && this.geom.coordinates.length === 2) {
        return bbox(buffer(this.geom, 2))
      }
      return null
    },
    startingBounds () {
      if (this.reachGeom) {
        return bbox(this.reachGeom)
      } else if (this.bboxAroundPoint) {
        return this.bboxAroundPoint
      }
      return this.defaultMapBounds()
    },
    boundsPadding () {
      if (this.reachGeom) {
        return 80
      }
      return 0
    }
  },
  watch: {
    // this ensures that if the lat/lng fields are changed
    // manually by the user, the marker updates accordingly
    geom: {
      deep: true,
      immediate: true,
      handler (newVal, oldVal) {
        if (this.pointOfInterest) {
          const oldCoords = this.pointOfInterest.getLngLat()
          if (oldCoords.lng !== newVal.coordinates[0] || oldCoords.lat !== newVal.coordinates[1]) {
            this.pointOfInterest.setLngLat([newVal.coordinates[0], newVal.coordinates[1]])
            // ensure it snaps if the coords have been changed upstream
            if (this.snapMode) {
              this.snapPOIToReach()
            }
          }
        }
      }
    },
    snapMode: {
      handler (v) {
        this.conditionallyBindSnapHandler()
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
    mountMap () {
      mapboxgl.accessToken = mapboxAccessToken
      const mapProps = {
        container: this.$refs.nwiMapEditor,
        style: this.baseMapUrl,
        bounds: this.startingBounds,
        fitBoundsOptions: { padding: this.boundsPadding }
      }

      this.map = new mapboxgl.Map(mapProps)

      this.map.on('styledata', this.loadReach)
      this.map.on('load', () => {
        this.loadReach()
        if (this.geom && this.geom.coordinates && this.geom.coordinates.length === 2) {
          this.renderPOI(this.geom)
        } else {
          this.map.once('click', async (e) => {
            await this.renderPOI(point(e.lngLat).geometry)
            this.emitPOILocation()
          })
        }
      })
    },
    emitPOILocation () {
      this.$emit('poiMoved', this.pointOfInterest.getLngLat())
    },
    async renderPOI (geometry) {
      this.pointOfInterest = new mapboxgl.Marker({
        draggable: true
      }).setLngLat(geometry.coordinates)
        .addTo(this.map)
      this.pointOfInterest.on('dragend', this.debouncedEmitPOILocation)
      this.conditionallyBindSnapHandler()
    },
    loadReach () {
      if (this.reachGeom) {
        if (this.map.getSource('reachGeom') === undefined) {
          this.map.addSource('reachGeom', {
            type: 'geojson',
            data: {
              ...this.reachGeom
            }
          })
        }
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
    if (mapboxAccessToken) {
      // ensures geom properties are set when the map renders
      this.$nextTick(() => {
        this.mountMap()
      })

      this.debouncedEmitPOILocation = debounce(this.emitPOILocation, 200, {
        leading: false,
        trailing: true
      })
    }
  }
}

</script>
