<template>
  <div
    id="nwi-map-container"
    :style="height ? `height:${height}px`:''"
  >
    <template v-if="mapboxAccessToken">
      <div id="nwi-map" />
      <nwi-map-legend
        v-if="includeLegend"
        :color-by="colorBy"
      />
      <nwi-basemap-toggle
        v-if="!hideBasemapToggle"
        :offset-right="!hideFullscreenToggle"
      />
      <nwi-fullscreen-toggle
        v-if="!hideFullscreenToggle"
        :fullscreen-target="fullscreenTarget"
      />
      <nwi-result-counter
        v-if="!hideResultCounter"
      />
      <cv-loading
        v-if="loading"
        :active="loading"
      />
    </template>
    <template v-else>
      <utility-block
        state="error"
        text="insert one token to continue"
      />
    </template>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import bbox from '@turf/bbox'
import debounce from 'lodash.debounce'
import NwiMapStyles from './nwi-map-styles.js'
import NwiMapLegend from './nwi-map-legend.vue'
import NwiBasemapToggle from './nwi-basemap-toggle.vue'
import NwiFullscreenToggle from './nwi-fullscreen-toggle.vue'
import NwiResultCounter from './nwi-result-counter.vue'
import { Events as topic } from '@/app/global/services'
import { mapState } from 'vuex'
import { riverIndexActions } from '../shared/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block.vue'
import {
  mapboxAccessToken,
  nwiTileServer
} from '@/app/environment/environment'

const fitBoundsOptions = {
  padding: 80
}

export default {
  name: 'nwi-map',
  components: {
    NwiMapLegend,
    UtilityBlock,
    NwiBasemapToggle,
    NwiFullscreenToggle,
    NwiResultCounter
  },
  props: {
    height: {
      type: String,
      required: false
    },
    // display loading spinner because of events from other components
    externalLoading: {
      type: Boolean
    },
    // render legend
    includeLegend: {
      type: Boolean,
      required: false,
      /**
       * @note vue defaults to false, consider refactoring
       */
      default: true
    },
    // hide basemap toggle (satellite/topo)
    hideBasemapToggle: {
      type: Boolean,
      required: false
    },
    hideResultCounter: {
      type: Boolean,
      required: false
    },
    // modifies the map style to highlight a single reach identified by ID
    detailReachId: {
      type: Number,
      required: false
    },
    // defines the color scheme for the reach-segments layer
    initialColorBy: {
      type: String,
      default: 'difficulty'
    },
    // if present, causes the map to zoom to the geometry of this feature
    featureToCenter: {
      type: Object,
      required: false
    },
    startingZoom: {
      type: Number,
      default: 4
    },
    center: {
      type: Array,
      default: () => [-98.35, 39.5] // geographic center of USA
    },
    // pass bounds for map initialization (used instead of `center`)
    startingBounds: {
      type: Array
    },
    // if true, attempts to get user location and zooms to it when map initializes
    centerOnUserLocation: {
      type: Boolean,
      default: false
    },
    // order of source layers matters -- add last to have display on top
    sourceLayers: {
      type: Array,
      default: () => ['reach-segments']
    },
    fullscreenTarget: {
      type: String,
      required: false
    },
    // passes list of desired toolbar controls into the NwiMapControls component
    mapControls: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      loading: false,
      colorBy: this.initialColorBy,
      mapboxAccessToken: mapboxAccessToken
    }
  },
  computed: {
    ...mapState({
      mapStyle: state => state.riverIndexState.riverIndexData.mapStyle,
      searchResults: state => state.riverSearchState.riverSearchData.data,
      searchTerm: state => state.riverSearchState.riverSearchData.searchTerm,
      mouseoveredFeature: state => state.riverIndexState.riverIndexData.mouseoveredFeature
    }),
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
    hideFullscreenToggle () {
      return !this.fullscreenTarget
    },
    // parses out the layers we're adding to the map from NwiMapStyles / sourceLayers prop
    mapLayers () {
      const { sourceLayers } = NwiMapStyles
      return this.sourceLayers
        .map(source => Object.keys(sourceLayers[source]))
        .flat()
    },
    searchResultIds () {
      if (this.searchResults) {
        return this.searchResults.map(r => r.id)
      }
      return []
    }
  },
  watch: {
    mapStyle (v) {
      if (v !== 'graphic') {
        this.map.setStyle(this.baseMapUrl)
      }
    },
    // visually highlights a mosued over feature on the map
    mouseoveredFeature (feature) {
      // TODO: consider refactoring this to use feature state (it might be faster)
      if (feature) {
        this.map.setFilter('activeReachSegmentCasing', [
          '==',
          ['get', 'id'],
          feature.properties.id
        ])
      } else {
        // hide 'active-reach-segment-casing' layer
        this.map.setFilter('activeReachSegmentCasing', ['all', false])
      }
    },
    externalLoading (newVal, oldVal) {
      // if value of externalLoading is responsible for current value of loading,
      // update it, otherwise leave as is (because an internal process set it to loading)
      if (this.loading === oldVal) {
        this.loading = newVal
      }
    },
    colorBy (newVal) {
      this.updateMapColorScheme(newVal)
    },
    // centers the map on a given feature
    featureToCenter (feature) {
      if (feature) {
        let bounds
        // ideally the tile server will be returning `bbox` as a property
        if (feature.properties.bbox) {
          bounds = JSON.parse(feature.properties.bbox)
        } else {
          // this method isn't great because mapbox is giving us "tiled" versions
          // of the features, so the geom may be just part of the feature in question
          bounds = bbox(feature)
        }
        this.map.fitBounds(bounds, fitBoundsOptions)
        this.$emit('centeredFeature')
      }
    },
    // any time search results change, apply filters
    searchResultIds (resultIds) {
      this.applySearchResultFilters()
    }
  },
  methods: {
    applySearchResultFilters () {
      // this feels a bit complicated. Basically:
      // -- only reach layers that are affected by search need to be filtered here
      // -- we can only call setFilter on layers that exist on the map
      // -- so we iterate through layers that exist on the map and apply filter IF they match
      //    layersNeedingFiltering
      const layersNeedingFiltering = ['reachSegments', 'reachClass', 'reachSegmentLabels']
      this.mapLayers.forEach(mapLayer => {
        if (layersNeedingFiltering.includes(mapLayer)) {
          if (this.searchResultIds && this.searchTerm) {
            this.map.setFilter(mapLayer, ['in', 'id', ...this.searchResultIds])
          } else {
            this.map.setFilter(mapLayer, null)
          }
        }
      })
    },
    // can be used to make tweaks to the mapbox base styles after loading
    modifyMapboxBaseStyle () {
      if (this.map.getLayer('satellite')) {
        this.map.setPaintProperty('satellite', 'raster-opacity', [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          0.5,
          11,
          0.5,
          12,
          1
        ])
      }
    },
    updateLoading (loading) {
      this.loading = loading
    },
    updateColorBy (newVal) {
      this.colorBy = newVal
    },
    attachMouseEvents (layer) {
      this.map.on('mouseenter', layer, this.mouseenterFeature)
      this.map.on('mouseleave', layer, this.mouseleaveFeature)
      this.map.on('click', layer, this.debouncedClickFeature)
    },
    clickFeature (event) {
      if (event.features) {
        const feature = event.features[0]
        this.$emit('clickFeature', feature)
      }
    },
    mouseenterFeature (event) {
      this.map.getCanvas().style.cursor = 'pointer'
      this.debouncedMouseoverFeature(event.features[0])
    },
    mouseleaveFeature () {
      this.map.getCanvas().style.cursor = ''
      this.debouncedMouseoverFeature(null)
    },
    mouseoverFeature (feature) {
      this.$store.dispatch(riverIndexActions.MOUSEOVER_FEATURE, feature)
    },
    updateMapColorScheme (newScheme) {
      const colors = Object.values(NwiMapStyles.colorSchemes[newScheme])
      if (newScheme === 'difficulty') {
        const difficultyColors = [
          'case',
          ['>', ['get', 'difficulty'], 6],
          colors[3],
          ['>', ['get', 'difficulty'], 4],
          colors[2],
          ['>', ['get', 'difficulty'], 2],
          colors[1],
          ['<=', ['get', 'difficulty'], 2],
          colors[0],
          '#53789a'
        ]
        this.map.setPaintProperty(
          'reachSegments',
          'line-color',
          difficultyColors
        )
        this.map.setPaintProperty(
          'reachSegmentDashes',
          'line-color',
          difficultyColors
        )
      } else if (newScheme === 'currentFlow') {
        const flowColors = [
          'match',
          ['get', 'condition'],
          'low',
          colors[1],
          'med',
          colors[2],
          'high',
          colors[3],
          colors[0]
        ]
        this.map.setPaintProperty('reachSegments', 'line-color', flowColors)
        this.map.setPaintProperty(
          'reachSegmentDashes',
          'line-color',
          flowColors
        )
      } else {
        this.map.setPaintProperty('reachSegments', 'line-color', '#53789a')
      }
    },
    // this method notifies upstream components of what reaches are visible in
    // the current viewport
    updateReachesInViewport () {
      // can have multiple responses for a given reach because of tiling,
      // so need to make array unique
      const uniq = {}
      const reaches = this.map
        .queryRenderedFeatures({ layers: ['reachSegments'] })
        // eslint-disable-next-line
        .filter(
          obj => !uniq[obj.properties.id] && (uniq[obj.properties.id] = true)
        )
      // because the map events aren't exactly synchronous, we improve usability by
      // including a search filter here
      this.applySearchResultFilters()

      // only show river sidebar if there's a reasonable number of rivers
      if (reaches.length <= 300) {
        this.$emit('changeReachesInViewport', reaches)
      } else {
        this.$emit('changeReachesInViewport', [])
      }
    },
    loadAWMapData () {
      if (!this.map.getSource('nwi-source')) {
        this.loading = true
        this.map.addSource('nwi-source', {
          type: 'vector',
          tiles: [nwiTileServer],
          minzoom: 4,
          maxzoom: 14
        })
        const { sourceLayers } = NwiMapStyles
        // iterating through the sourceLayers specified by prop this.sourceLayers
        // can't use this.mapLayers because we need the sourceLayers to access props
        this.sourceLayers.forEach(sourceLayer => {
          Object.keys(sourceLayers[sourceLayer]).forEach(mapLayer => {
            const zoomAttributes = {
              minzoom: sourceLayers[sourceLayer][mapLayer].minzoom || 0,
              maxzoom: sourceLayers[sourceLayer][mapLayer].maxzoom || 22
            }

            // if this.detailReachId is set, we need to modify the opacity styling from NwiMapStyles.js
            // to de-emphasize other reaches, so we're pre-processing the "paint" object
            const paintProps = this.processPaintPropsForEmphasis(
              mapLayer,
              sourceLayers[sourceLayer][mapLayer].paint
            )

            this.map.addLayer({
              id: mapLayer,
              source: 'nwi-source',
              'source-layer': sourceLayer,
              type: sourceLayers[sourceLayer][mapLayer].type,
              paint: paintProps,
              layout: sourceLayers[sourceLayer][mapLayer].layout,
              ...zoomAttributes
            })
          })
        })
        // hide 'active-reach-segment-casing' layer
        this.map.setFilter('activeReachSegmentCasing', ['all', false])

        if (this.detailReachId) {
          this.filterNonDetailReachFeatures()
        }

        this.updateMapColorScheme(this.colorBy)

        this.mapLayers.forEach(layer => {
          this.attachMouseEvents(layer)
        })

        this.loading = false
      }
    },
    filterNonDetailReachFeatures () {
      if (this.detailReachId) {
        this.mapLayers.forEach(mapLayer => {
          if (['access', 'rapids'].includes(mapLayer)) {
            // access and rapids use `reach_id` instead of `id`
            this.map.setFilter(mapLayer, [
              '==',
              ['get', 'reach_id'],
              this.detailReachId
            ])
          } else if (['projects', 'projectIcons'].includes(mapLayer)) {
            // projects aren't relevant here, can keep displaying, everything else is reach-specific
          } else {
            this.map.setFilter(mapLayer, ['==', ['get', 'id'], this.detailReachId])
          }
        })
      }
    },
    // preprocesses NwiMapStyles.js paint properties to de-emphasize (through opacity)
    // other reaches if this.detailReachId is set
    // need to pass layer in here because 'reach-segments' is different from the rest
    processPaintPropsForEmphasis (layer, paint) {
      if (!this.detailReachId) {
        return paint
      } else {
        const inactiveOpacity = 0.4
        // we are iterating through paint props and looking for 'opacity' in the key
        const newPaint = {}
        Object.keys(paint).forEach(key => {
          // don't process opacity that is set to 0
          if (
            key.includes('opacity') &&
            (isNaN(paint[key]) || paint[key] > 0)
          ) {
            if (layer === 'reachSegments') {
              newPaint[key] = [
                'case',
                ['==', ['get', 'id'], this.detailReachId],
                1,
                inactiveOpacity
              ]
            } else {
              newPaint[key] = [
                'case',
                ['==', ['get', 'reach_id'], this.detailReachId],
                1,
                inactiveOpacity
              ]
            }
          } else {
            newPaint[key] = paint[key]
          }
        })
        return newPaint
      }
    },
    mountMap () {
      mapboxgl.accessToken = this.mapboxAccessToken
      const mapProps = {
        container: 'nwi-map',
        style: this.baseMapUrl,
        // hash: true
        trackUserLocation: true
      }
      if (this.startingBounds) {
        mapProps.bounds = this.startingBounds
        mapProps.fitBoundsOptions = fitBoundsOptions
      } else {
        mapProps.center = this.center
        mapProps.zoom = this.startingZoom
      }

      this.map = new mapboxgl.Map(mapProps)

      if (this.centerOnUserLocation && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          this.map.flyTo({
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 9
          })
        })
      }

      this.map.addControl(
        new mapboxgl.NavigationControl({ showCompass: true }),
        'bottom-left'
      )
      this.map.on('styledata', this.loadAWMapData)
      this.map.on('styledata', this.modifyMapboxBaseStyle)

      // unfortunately this has to hook onto 'data' because we can't queue it directly after search
      // results are called because of the poorly designed and async nature of map filtering and
      // queryRenderedFeatures...which means it gets called a lot more than it needs to, hence the
      // debouncing and slightly clunky UX
      this.map.on('moveend', this.debouncedUpdateReachesInViewport)
      this.map.on('data', this.debouncedUpdateReachesInViewport)

      // ensures that when map is rendered in a tab, it sizes properly when the tab is opened
      topic.subscribe('tab-changed', () => {
      // TODO: only call this if the tab was the map tab?
        if (this.$route.name === 'map-tab') {
          this.map.resize()
        }
        // if map was initialized with bounds, re-fit because it needs to be called when map is visible
        if (this.startingBounds) {
          this.map.fitBounds(this.startingBounds, fitBoundsOptions)
        }
      })
    },
    initMap () {
      this.map = null
      this.debouncedMouseoverFeature = debounce(this.mouseoverFeature, 200, {
        leading: false,
        trailing: true
      })
      this.debouncedClickFeature = debounce(this.clickFeature, 200, {
        leading: true,
        trailing: false
      })
      this.debouncedUpdateReachesInViewport = debounce(
        this.updateReachesInViewport,
        200,
        {
          leading: true,
          trailing: true
        }
      )
    }
  },
  mounted () {
    if (this.mapboxAccessToken) {
      this.mountMap()
    }
  },
  created () {
    if (this.mapboxAccessToken) {
      this.initMap()
    }
  }
}
</script>

<style lang="scss">
#nwi-map-container {
  min-width: 100%;

  width: 100%;
  position: relative;

  @include carbon--breakpoint('sm') {
    height: calc(100vh - 114px);
  }
  @include carbon--breakpoint('md') {
  height: calc(100vh - 55px);
  }

  canvas,
  #nwi-map {
    height: 100%;
    width: 100%;
    background-color:$ui-03;
    &.river-detail {
       @include carbon--breakpoint("md") {
        width: 68%;
        height: 100%;
      }

      @include carbon--breakpoint("max") {
        width: 76%;
      }
    }

  }

  .cv-loading {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    z-index: 8000;
  }

  // I think we have to show the logo for legal reasons, hiding it for demo purposes
  a.mapboxgl-ctrl-logo,
  .mapboxgl-ctrl.mapboxgl-ctrl-attrib {
    display: none !important;
  }
}
</style>
