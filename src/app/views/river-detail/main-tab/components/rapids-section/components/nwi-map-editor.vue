<template>
  <div
    id="nwi-map-editor-container"
    :style="height ? `height:${height}px`:''"
  >
    <div id="nwi-map-editor" />
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
        label="Snap When Dragging"
      />
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import NwiBasemapToggle from '@/app/views/river-index/components/nwi-basemap-toggle.vue'
import { mapState } from 'vuex'
import {
  mapboxAccessToken
} from '@/app/environment/environment'
import debounce from 'lodash.debounce'

import { lineString, point } from '@turf/helpers'
import bbox from '@turf/bbox'
import nearestPointOnLine from '@turf/nearest-point-on-line'

export default {
  name: 'nwi-map-editor',
  components: {
    NwiBasemapToggle
  },
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
    baseMapUrl () {
      if (this.mapStyle === 'topo') {
        return 'mapbox://styles/mapbox/outdoors-v11'
      } else if (this.mapStyle === 'satellite') {
        // custom version of `satellite-v8` that includes icons that already exist in `outdoors-v11`
        return 'mapbox://styles/americanwhitewater/ck1h4j4hm2bts1cpueefclrrn'
      } else {
        return 'mapbox://styles/mapbox/outdoors-v11'
      }
    },
    ...mapState({
      mapStyle: state => state.riverIndexState.riverIndexData.mapStyle,
      data: state => state.riverDetailState.riverDetailData.data
    }),
    reachGeom () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.data?.geom?.split(',').map(d => d.split(' '))
      return geom ? lineString(geom) : null
    },
    startingBounds () {
      if (this.reachGeom) {
        return bbox(this.reachGeom)
      }
      return null
    }
  },
  watch: {
    mapStyle (v) {
      this.map.setStyle(this.baseMapUrl)
    },
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
      if (this.pointOfInterest) {
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
        container: 'nwi-map-editor',
        style: this.baseMapUrl,
        bounds: this.startingBounds,
        fitBoundsOptions: { padding: 80 }
      }

      this.map = new mapboxgl.Map(mapProps)

      this.map.on('styledata', this.loadReach)
      this.map.on('load', () => {
        this.loadReach()
        if (this.geom && this.geom.coordinates && this.geom.coordinates.length === 2) {
          this.renderPOI()
        }
      })
    },
    emitPOILocation () {
      this.$emit('poiMoved', this.pointOfInterest.getLngLat())
    },
    renderPOI () {
      this.pointOfInterest = new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([this.geom.coordinates[0], this.geom.coordinates[1]])
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
      this.mountMap()

      this.debouncedEmitPOILocation = debounce(this.emitPOILocation, 200, {
        leading: false,
        trailing: true
      })
    }
  }
}

</script>
