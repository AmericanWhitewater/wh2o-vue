<template>
  <div id="national-map-app">
    <div class="bx--grid">
      <div
        id="fullscreen-target"
        class="bx--row"
      >
        <div class="bx--col-sm-16 bx--col-lg-10">
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
        </div>
        <div class="bx--col-sm-16 bx--col-lg-6">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NwiRiversTable, NwiMap, NwiMapSearch } from './components'
import 'mapbox-gl/dist/mapbox-gl.css'
import { riverIndexActions } from './shared/state'
import { mapState } from 'vuex'
import { riverSearchHttpConfig } from '@/app/global/mixins'
import UtilityBlock from '@/app/global/components/utility-block/utility-block.vue'
/**
 * @todo beforeDestroy store bbox / zoom level
 */

export default {
  name: 'river-index',
  components: {
    NwiMap,
    NwiRiversTable,
    UtilityBlock,
    NwiMapSearch
  },
  mixins: [riverSearchHttpConfig],
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
    sourceLayers: ['reach-segments', 'reach-segment-labels', 'projects']
  }),
  computed: {
    ...mapState({
      reachesInViewport: state => state.riverIndexState.riverIndexData.data,
      error: state => state.riverIndexState.riverIndexData.error
    })
  },
  methods: {
    changeReachesInViewport (newReaches) {
      this.$store.dispatch(riverIndexActions.LOAD_REACHES, newReaches)
    },
    centerFeature (feature) {
      this.featureToCenter = feature
    },
    clickFeature (feature) {
      if (
        ['reach-segments', 'reach-segment-labels'].indexOf(
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
#national-map-app {
  height: 100%;
  width: 100%;
  position: relative;

}
#fullscreen-target {
  background-color: #fff;
}
</style>
