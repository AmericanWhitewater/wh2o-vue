<template>
  <div
    id="nwi-map-editor-container"
    :style="height ? `height:${height}px`:''"
  >
    <div id="nwi-map-editor" />
    <nwi-basemap-toggle
      :offset-right="false"
    />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import NwiBasemapToggle from '@/app/views/river-index/components/nwi-basemap-toggle.vue'
import { mapState } from 'vuex'
import { lineString } from '@turf/helpers'
import bbox from '@turf/bbox'

import {
  mapboxAccessToken
} from '@/app/environment/environment'

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
        if (this.pointOfInterest &&
            newVal.coordinates[0] !== oldVal.coordinates[0] &&
            newVal.coordinates[1] !== oldVal.coordinates[1]) {
          this.pointOfInterest.setLngLat([newVal.coordinates[0], newVal.coordinates[1]])
        }
      }
    }
  },
  methods: {
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
    fitMapToReachGeom () {
      this.map.fitBounds(this.startingBounds, { padding: 80 })
    },
    renderPOI () {
      this.pointOfInterest = new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([this.geom.coordinates[0], this.geom.coordinates[1]])
        .addTo(this.map)
      this.pointOfInterest.on('dragend', () => {
        this.$emit('poiMoved', this.pointOfInterest.getLngLat())
      })
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
        this.fitMapToReachGeom()
      }
    }
  },
  mounted () {
    if (mapboxAccessToken) {
      this.mountMap()
    }
  }
}

</script>

<style lang="scss">
#nwi-map-editor-container {
  min-width: 100%;

  width: 100%;
  position: relative;
}
#nwi-map-editor {
  height: 100%;
  width: 100%;
  background-color:$ui-03;
}
</style>
