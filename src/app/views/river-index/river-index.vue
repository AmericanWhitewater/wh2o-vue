<template>
  <div id="national-map-app">
    <div class="bx--grid">
      <div
        id="fullscreen-target"
        class="bx--row"
      >
        <div class="bx--col-sm-12 bx--col-md-12 bx--col-lg-12 bx--col-max-10">
          <nwi-map
            :external-loading="loading || searchLoading"
            :feature-to-center="featureToCenter"
            :has-controls="false"
            :highlighted-feature="highlightedFeature"
            :source-layers="sourceLayers"
            center-on-user-location
            id-for-full-screen="national-map-app"
            :include-legend="showLegend"
            @centeredFeature="centerFeature"
            @changeReachesInViewport="changeReachesInViewport"
            @clickFeature="clickFeature"
            @highlightFeature="changeHighlightedFeature"
            @searchResults="updateSearchResults"
          />
        </div>
        <div class="bx--col-sm-12 bx--col-md-8 bx--col-lg-4 bx--col-max-6">
          <NwiMapControlsV2 />
          <template v-if="loading || searchLoading">
            <UtilityBlock state="loading" />
          </template>
          <template v-else-if="results">
            <nwi-rivers-table
              :highlighted-feature="highlightedFeature"
              :reaches="results"
              :showing-search-results="showingSearchResults"
              @centerReach="centerFeature"
              @highlightFeature="changeHighlightedFeature"
            />
          </template>
          <template v-else>
            <UtilityBlock
              state="error"
              text="Map Error. Try search."
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NwiRiversTable, NwiMap, NwiMapControlsV2 } from './components'
import 'mapbox-gl/dist/mapbox-gl.css'
import { riverIndexActions } from './shared/state'
import { riverSearchActions } from '@/app/views/river-search/shared/state'
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
    NwiMapControlsV2
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
    searchTerm: '',
    river: null,
    featureToCenter: null,
    loading: false,
    sourceLayers: ['reach-segments', 'reach-segment-labels', 'projects']
  }),
  computed: {
    ...mapState({
      searchResults: state => state.riverSearchState.riverSearchData.data,
      searchLoading: state => state.riverSearchState.riverSearchData.loading,
      reachesInViewport: state => state.riverIndexState.riverIndexData.data,
      error: state => state.riverIndexState.riverIndexData.error,
      highlightedFeature: state =>
        state.riverIndexState.riverIndexData.highlightedFeature
    }),
    showingSearchResults () {
      if (this.searchResults) {
        return this.searchResults.length > 0
      } else {
        return false
      }
    },
    results () {
      if (this.reachesInViewport && this.reachesInViewport.length > 0) {
        return this.reachesInViewport
      }

      if (this.searchResults && this.searchResults.length > 0) {
        return this.searchResults
      }

      return null
    }
  },
  methods: {
    updateSearchResults (newVal) {
      this.searchResults = newVal
    },
    changeHighlightedFeature (feature) {
      this.$store.dispatch(riverIndexActions.HIGHLIGHT_FEATURE, feature)
      // this.highlightedFeature = feature
    },
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
        } else {
          window.location.href = this.reachDetailUrl(feature.properties.id)
        }
      } else if (feature.sourceLayer === 'projects') {
        if (this.$route.name === 'river-index') {
          this.$router.push(`/project-detail/${feature.properties.id}`)
        } else {
          // projects have weird URLs -- if shortname is present, that's used in the URL, otherwise ID
          // thought they might be interchangeable but I tested it and they are not
          window.location.href = this.projectDetailUrl(
            feature.properties.shortname || feature.properties.id
          )
        }
      }
    },
    searchRiver () {
      this.$store.dispatch(riverSearchActions.FETCH_RIVER_SEARCH_DATA, {
        river: this.searchTerm
      })
      /**
       * @todo figure out how to dynamically set scroll position
       * transition to search page is jarring, search results obscured
       */
      this.searchTerm = ''
      this.$router.push('/river-search').catch(() => {})
    },
    reachDetailUrl (reachId) {
      return `/content/River/detail/id/${reachId}/`
    },
    projectDetailUrl (projectId) {
      return `/content/Project/view/id/${projectId}/`
    }
  }
}
</script>

<style lang="scss" scoped>
#national-map-app {
  height: 100%;
  width: 100%;
  position: relative;

  @include carbon--breakpoint("sm") {
    height: 95vh;
  }

  @include carbon--breakpoint("lg") {
    height: 80vh;
    overflow: hidden;
  }
}
#fullscreen-target {
  background-color: #fff;
}
</style>
