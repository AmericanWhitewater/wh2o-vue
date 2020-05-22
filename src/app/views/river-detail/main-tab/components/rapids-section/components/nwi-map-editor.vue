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
    }
  },
  computed: {
    activeReach () {
      return this.$store.state.riverDetailState.rapidsData.data
    },
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
    startingBounds (v) {
      this.map.fitBounds(v, { padding: 80 })
    }
  },
  methods: {
    mountMap () {
      mapboxgl.accessToken = mapboxAccessToken
      const mapProps = {
        container: 'nwi-map-editor',
        style: this.baseMapUrl,
        trackUserLocation: true
      }

      this.map = new mapboxgl.Map(mapProps)

      this.map.on('styledata', this.loadReach)
      this.map.on('load', this.loadReach)
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
