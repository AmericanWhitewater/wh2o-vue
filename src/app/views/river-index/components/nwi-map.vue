<template>
  <div id="nwi-map-container">
    <nwi-map-controls
      v-if="hasControls"
      :base-map="baseMap"
      :color-by="colorBy"
      :id-for-full-screen="idForFullScreen"
      :map-controls="mapControls"
      @baseMap="updateBaseMap"
      @colorBy="updateColorBy"
      @loading="updateLoading"
      @searchResults="updateSearchResults"
    />
    <div
      id="nwi-map"
      :class="{ hasSidebar: hasSidebar }"
    />
    <nwi-map-legend
      v-if="includeLegend"
      :color-by="colorBy"
    />
    <cv-loading
      v-if="loading"
      :active="loading"
    />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import bbox from '@turf/bbox'
import debounce from 'lodash.debounce'
import NwiMapStyles from './nwi-map-styles.js'
import NwiMapLegend from './nwi-map-legend.vue'
import NwiMapControls from './nwi-map-controls.vue'
import { Events as topic } from '@/app/global/services'
import { mapState } from 'vuex'
import { riverIndexActions } from '../shared/state'

const fitBoundsOptions = {
  padding: 80
}

export default {
  name: 'nwi-map',
  components: {
    NwiMapLegend,
    NwiMapControls
  },
  props: {
    // toggles controls
    hasControls: {
      type: Boolean,
      required: false,
      default: true
    },
    // visually highlights a feature on the map
    highlightedFeature: {
      type: Object,
      required: false
    },
    // display loading spinner because of events from other components
    externalLoading: {
      type: Boolean,
      default: false
    },
    // render legend
    includeLegend: {
      type: Boolean,
      required: false,
      default: true
    },
    // map component doesn't know if it has a neighboring info panel without this prop;
    // determines whether or not map width is 100%
    hasSidebar: {
      type: Boolean,
      default: true
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
    // defines the basemap (satellite or outdoors)
    initialBaseMap: {
      type: String,
      default: 'topo'
    },
    // if present, causes the map to zoom to the geometry of this feature
    featureToCenter: {
      type: Object,
      required: false
    },
    mapboxAccessToken: {
      type: String,
      required: true
    },
    tileservers: {
      type: Array,
      required: true
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
    idForFullScreen: {
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
      baseMap: this.initialBaseMap,
      searchResults: false
    }
  },
  computed: {
    ...mapState({
      mapStyle: state => state.riverIndexState.riverIndexData.mapStyle
    }),
    baseMapUrl () {
      if (this.baseMap === 'topo') {
        return 'mapbox://styles/mapbox/outdoors-v11'
      } else if (this.baseMap === 'satellite') {
        // custom version of `satellite-v8` that includes icons that already exist in `outdoors-v11`
        return 'mapbox://styles/americanwhitewater/ck1h4j4hm2bts1cpueefclrrn'
      } else {
        return 'mapbox://styles/mapbox/outdoors-v11'
      }
    },
    // parses out the layers we're adding to the map from NwiMapStyles / sourceLayers prop
    mapLayers () {
      const { sourceLayers } = NwiMapStyles

      return Object.keys(sourceLayers)
        .map(source => Object.keys(sourceLayers[source]))
        .flat()
    }
  },
  watch: {
    mapStyle (v) {
      if (v !== 'graphic') {
        this.baseMap = v
      }
    },
    // visually highlights a given feature on the map
    highlightedFeature (newVal) {
      // TODO: consider refactoring this to use feature state (it might be faster)
      if (newVal) {
        this.map.setFilter('activeReachSegmentCasing', [
          '==',
          ['get', 'id'],
          newVal.properties.id
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
    baseMap (newVal) {
      this.map.setStyle(this.baseMapUrl)
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
    }
  },
  methods: {
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
    // if searchResults is not false, filter map to only display those results
    updateSearchResults (resultIds) {
      if (resultIds) {
        this.map.setFilter('reachSegments', ['in', 'id', ...resultIds])
        this.searchResults = resultIds
      } else {
        this.map.setFilter('reachSegments', null)
        this.searchResults = false
      }
      // need to send this up another level so it can be used in the rivers table
      this.$emit('searchResults', this.searchResults)
    },
    updateBaseMap (newVal) {
      this.baseMap = newVal
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
      this.debouncedEmitHighlight(event.features[0])
    },
    mouseleaveFeature () {
      this.map.getCanvas().style.cursor = ''
      this.debouncedEmitHighlight(null)
    },
    emitHighlight (reach) {
      this.$store.dispatch(riverIndexActions.HIGHLIGHT_FEATURE, reach)
      this.$emit('highlightFeature', reach)
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
      let reaches
      // can have multiple responses for a given reach because of tiling,
      // so need to make array unique
      const uniq = {}
      reaches = this.map
        .queryRenderedFeatures({ layers: ['reachSegments'] })
        // eslint-disable-next-line
        .filter(
          obj => !uniq[obj.properties.id] && (uniq[obj.properties.id] = true)
        )
      // because the map events aren't exactly synchronous, we improve usability by
      // including a search filter here
      if (this.searchResults) {
        reaches = reaches.filter(reach =>
          this.searchResults.includes(reach.properties.id)
        )
      }

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
          tiles: this.tileservers,
          minzoom: 4,
          maxzoom: 14
        })
        const { sourceLayers } = NwiMapStyles
        // iterating through the sourceLayers specified by prop this.sourceLayers
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
        // for now, just filter out access as that one is the frustrating one
        // because of overlap with the detail reach access points
        if (this.mapLayers.includes('access')) {
          this.map.setFilter('access', [
            '==',
            ['get', 'reach_id'],
            this.detailReachId
          ])
        }
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
    }
  },
  mounted () {
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
  created () {
    this.map = null
    this.debouncedEmitHighlight = debounce(this.emitHighlight, 200, {
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
}
</script>

<style lang="scss">
#nwi-map-container {
  min-height: 500px;
  min-width: 100%;
  height: calc(100vh - 75px);
  width: 100%;
  position: relative;

  canvas,
  #nwi-map {
    height: 100%;
    width: 100%;

    &.hasSidebar {
      height: 65%;

      @include carbon--breakpoint("md") {
        height: 100%;
      }
    }

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
