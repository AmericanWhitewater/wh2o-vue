<template>
  <div class="page-banner">
    <div class="map-wrapper">
      <template v-if="reach && reachGeom">
        <div
          id="nwi-map-banner-container"
        >
          <div
            id="nwi-map-banner"
            ref="nwiMapBanner"
            style="height:400px;"
          />
          <nwi-basemap-toggle
            :offset-right="false"
          />
        </div>
      </template>
      <template v-else>
        <utility-block
          :text="mapUnavailableText"
          state="content"
          theme="dark"
        />
      </template>
      <slot />
    </div>
  </div>
</template>
<script>
import bbox from '@turf/bbox'
import { lineString, point, featureCollection } from '@turf/helpers'
import mapboxgl from 'mapbox-gl'
import { mapState } from 'vuex'
import NwiMapStyles from '@/app/views/river-index/components/nwi-map-styles'
import {
  mapboxAccessToken
} from '@/app/environment'
import { basemapToggleMixin, mapHelpersMixin } from '@/app/global/mixins'
import UtilityBlock from '@/app/global/components/utility-block/utility-block.vue'

export default {
  name: 'map-banner',
  components: {
    UtilityBlock
  },
  mixins: [basemapToggleMixin, mapHelpersMixin],
  props: {
    loading: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    reachGeom () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.reach?.geom?.split(',').map(d => d.split(' '))
      return geom ? lineString(geom) : null
    },
    ...mapState({
      mapStyle: state => state.RiverIndex.mapStyle,
      reach: state => state.RiverDetail.data,
      editMode: state => state.Global.editMode
    }),
    startingBounds () {
      if (this.reachGeom) {
        return bbox(this.reachGeom)
      }
      return null
    },
    mapUnavailableText () {
      if (this.editMode) {
        return ''
      }
      return 'No geospatial data available'
    }
  },
  methods: {
    mountMap () {
      mapboxgl.accessToken = mapboxAccessToken
      const mapProps = {
        container: this.$refs.nwiMapBanner,
        style: this.baseMapUrl,
        bounds: this.startingBounds,
        fitBoundsOptions: { padding: 80 },
        interactive: false
      }

      this.map = new mapboxgl.Map(mapProps)
      this.map.on('styledata', this.loadReach)
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
          this.addReachToMap()
          this.addAccessToMap()
        }
      }
    },
    addReachToMap () {
      // this logic is duplicated in `nwi-map.vue` but seemed like it would
      // confuse things to share, if it's used again anywhere else it should be
      // refactored into a mixin or something
      const colors = Object.values(NwiMapStyles.colorSchemes.difficulty)
      const difficulty = this.mapClassToDifficulty(this.reach.class)
      let reachColor

      if (difficulty > 6) {
        reachColor = colors[3]
      } else if (difficulty > 4) {
        reachColor = colors[2]
      } else if (difficulty > 2) {
        reachColor = colors[1]
      } else if (difficulty <= 2) {
        reachColor = colors[0]
      } else {
        reachColor = '#53789a'
      }
      const paintProps = {
        ...NwiMapStyles.sourceLayers['reach-segments'].reachSegments.paint,
        'line-color': reachColor
      }
      this.map.addLayer({
        id: 'reachGeom',
        source: 'reachGeom',
        type: 'line',
        layout: NwiMapStyles.sourceLayers['reach-segments'].reachSegments.layout,
        paint: paintProps
      })
    },
    addAccessToMap () {
      const putin = point(this.reachGeom.geometry.coordinates[0])
      putin.properties.type = 'put-in'
      const takeout = point(this.reachGeom.geometry.coordinates.slice(-1)[0])
      takeout.properties.type = 'take-out'
      this.map.addSource('reachAccess', { type: 'geojson', data: featureCollection([putin, takeout]) })
      this.map.addLayer({
        id: 'reachAccess',
        source: 'reachAccess',
        type: 'circle',
        layout: NwiMapStyles.sourceLayers.access.access.layout,
        paint: NwiMapStyles.sourceLayers.access.access.paint
      })
    }
  },
  mounted () {
    if (mapboxAccessToken && this.reachGeom) {
      this.mountMap()
    }
  }
}
</script>
