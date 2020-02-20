<template>
  <div id="national-map-app">
    <nwi-map
      :external-loading="loading"
      :feature-to-center="featureToCenter"
      :has-sidebar="showSidebar"
      :has-controls="showControls"
      :highlighted-feature="highlightedFeature"
      :mapbox-access-token="mapboxAccessToken"
      :source-layers="sourceLayers"
      :tileservers="tileservers"
      center-on-user-location
      id-for-full-screen="national-map-app"
      :include-legend="showLegend"
      @centeredFeature="centerFeature"
      @changeReachesInViewport="changeReachesInViewport"
      @clickFeature="clickFeature"
      @highlightFeature="changeHighlightedFeature"
      @searchResults="updateSearchResults"
    />
    <nwi-rivers-table
      v-if="showRiversTable"
      :highlighted-feature="highlightedFeature"
      :reaches="reachesInViewport"
      :showing-search-results="showingSearchResults"
      @centerReach="centerFeature"
      @highlightFeature="changeHighlightedFeature"
    />
  </div>
</template>

<script>
import { NwiRiversTable, NwiMap } from './components'
import 'mapbox-gl/dist/mapbox-gl.css'

/**
 * @todo beforeDestroy store bbox / zoom level
 */

export default {
  name: 'NationalMapApp',
  components: {
    NwiMap,
    NwiRiversTable
  },
  props: {
    mapboxAccessToken: {
      type: String,
      required: true
    },
    tileserver: {
      type: String,
      default: 'http://localhost:8080/tiles/{z}/{x}/{y}.mvt'
    },
    showSidebar: {
      type: Boolean,
      default: true,
      required: false
    },
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
  data () {
    return {
      river: null,
      highlightedFeature: null,
      reachesInViewport: [],
      featureToCenter: null,
      searchResults: false,
      loading: false,
      tileservers: [this.tileserver],
      sourceLayers: ['reach-segments', 'reach-segment-labels', 'projects']
    }
  },
  computed: {
    showingSearchResults () {
      // if bool, it's false, otherwise true
      return typeof this.searchResults !== 'boolean'
    }
  },
  methods: {
    updateSearchResults (newVal) {
      this.searchResults = newVal
    },
    changeHighlightedFeature (feature) {
      this.highlightedFeature = feature
    },
    changeReachesInViewport (newReaches) {
      //  only use store if we're in the vue spa
      // if (this.$route.name === 'river-index') {
      //   await this.$store.dispatch(riverIndexActions.LOAD_REACHES, newReaches)
      // }

      this.reachesInViewport = newReaches
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
          this.$router.push(`/river-detail/${feature.properties.id}`)
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
  width: 100%;
  position: relative;
  height: 70vh;

  @include MQ(XS) {
    height: 95vh;
  }

  @include MQ(LG) {
    height: 80vh;
  }
}

.river-index {
  #national-map-app {
    height: 100%;
    overflow: hidden;
  }
}
</style>
