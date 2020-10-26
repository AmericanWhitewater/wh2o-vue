<template>
  <div class="river-index-page">
    <v-row>
      <v-col>
        <nwi-map
            :external-loading="loading"
            :feature-to-center="featureToCenter"
            :has-controls="false"
            :source-layers="sourceLayers"
            center-on-user-location
            id-for-full-screen="national-map-app"
            :include-legend="showLegend"
            map-container-id="nwi-map-index"
            @centeredFeature="centerFeature"
            @changeReachesInViewport="changeReachesInViewport"
            @clickFeature="clickFeature"
          />
      </v-col>
    
    <v-col>
      <NwiMapSearch />
          <template v-if="loading">
            <UtilityBlock state="loading" />
          </template>
          <template v-else>
            <nwi-rivers-table
              :reaches-on-map="reachesInViewport"
              @centerReach="centerFeature"
            />
          </template>
    </v-col>

    </v-row>
  </div>
</template>

<script>
import { NwiRiversTable, NwiMap, NwiMapSearch, NwiStateList } from './components'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapState } from 'vuex'
import {UtilityBlock} from '@/components/common'
/**
 * @todo beforeDestroy store bbox / zoom level
 */

export default {
  name: 'river-index',
  components: {
    NwiMap,
    NwiRiversTable,
    UtilityBlock,
    NwiMapSearch,
    NwiStateList
  },
  props: {
    showRiversTable: {
      type: Boolean,
      default: true,
      required: false
    },
    showControls: {
      type: Boolean,
      default: true,
      required: false
    },
    showLegend: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data: () => ({
    river: null,
    featureToCenter: null,
    loading: false,
    sourceLayers: ['reach-segments', 'reach-segment-labels', 'reaches-without-geom', 'projects']
  }),
  computed: {
    ...mapState({
      reachesInViewport: state => state.RiverIndex.data,
      error: state => state.RiverIndex.error
    })
  },
  methods: {
    changeReachesInViewport (newReaches) {
      this.$store.dispatch('RiverIndex/loadReaches', newReaches)
    },
    centerFeature (feature) {
      this.featureToCenter = feature
    },
    clickFeature (feature) {
      if (
        ['reach-segments', 'reach-segment-labels', 'reaches-without-geom'].indexOf(
          feature.sourceLayer
        ) !== -1
      ) {
        if (this.$route.name === 'river-index') {
          this.$router.push(`/river-detail/${feature.properties.id}/main`)
        }
      } else if (feature.sourceLayer === 'projects') {
        if (this.$route.name === 'river-index') {
          this.$router.push(`/project-detail/${feature.properties.id}`)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.river-index-page {
  width: 100%;
}
</style>
