<template>
  <div
    id="nwi-map-container"
    :style="`height:${containerHeight};`"
  >
    <template v-if="mapboxAccessToken">
      <div
        ref="mapContainer"
        class="nwi-map"
      />
      <nwi-map-legend
        v-if="includeLegend"
        :color-by="colorBy"
      />
      <nwi-map-controls
        :map-controls="mapControls"
        :fullscreen-target="fullscreenTarget"
      />
      <nwi-result-counter
        v-if="!hideResultCounter"
        :loading="mapDataLoading"
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
import {
  NwiMapStyles,
  NwiMapLegend,
  NwiMapControls,
  NwiResultCounter
} from '.'
import { basemapToggleMixin } from '@/mixins'
import { mapState, mapActions } from 'vuex'
import {UtilityBlock} from '@/components/common'
import {
  mapboxAccessToken,
  nwiTileServer
} from '@/environment'

const fitBoundsOptions = {
  padding: 80
}

export default {
  name: 'nwi-map',
  components: {
    NwiMapLegend,
    UtilityBlock,
    NwiMapControls,
    NwiResultCounter
  },
  mixins: [basemapToggleMixin],
  props: {
    height: {
      type: String,
      required: false
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
      default: () => ['baseMap', 'colorBy', 'fullscreen']
    }
  },
  data () {
    return {
      mapDataLoading: false,
      mapboxAccessToken: mapboxAccessToken
    }
  },
  computed: {
    ...mapState({
      mapStyle: state => state.RiverIndex.mapStyle,
      mapBounds: state => state.RiverIndex.mapBounds,
      colorBy: state => state.RiverIndex.mapColorBy,
      mouseoveredFeature: state => state.RiverIndex.mouseoveredFeature
    }),
    containerHeight () {
      if (this.height) {
        return `${this.height}px`
      } else {
        return 'calc(100vh - 125px)'
      }
    },
    // parses out the layers we're adding to the map from NwiMapStyles / sourceLayers prop
    mapLayers () {
      const { sourceLayers } = NwiMapStyles
      return this.sourceLayers
        .map(source => Object.keys(sourceLayers[source]))
        .flat()
    }
  },
  watch: {
    // visually highlights a moused over feature on the map
    mouseoveredFeature (newFeature, oldFeature) {
      if (newFeature && newFeature.id) {
        // we have other features like labels that apply to reach-segments but *not* reaches-without-geom
        // so we're checking if it's reaches-without-geom and otherwise defaulting to reach-segments
        const sourceLayer = newFeature.sourceLayer === 'reaches-without-geom' ? 'reaches-without-geom' : 'reach-segments'
        this.map.setFeatureState({
          id: newFeature.id,
          source: newFeature.source,
          sourceLayer: sourceLayer
        }, {
          hover: true
        })
      } else {
        // did not mouse over a reach, so need to reset feature state of previous reach
        // if it was set
        if (oldFeature && oldFeature.id) {
          const sourceLayer = oldFeature.sourceLayer === 'reaches-without-geom' ? 'reaches-without-geom' : 'reach-segments'
          // if we start using featureState for anything other than hover, we'll need to specify ID and key here
          this.map.removeFeatureState({ source: 'nwi-source', sourceLayer: sourceLayer })
        }
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
          bounds = bbox(feature._geometry)
        }
        this.map.fitBounds(bounds, fitBoundsOptions)
        this.$emit('centeredFeature')
      }
    },
    detailReachId (newReach) {
      this.adjustMapForDetailReach()
      // this has to be re-called since we're changing paint props again
      this.updateMapColorScheme(this.colorBy)
    },
    startingBounds (newBounds) {
      this.map.fitBounds(newBounds, fitBoundsOptions)
    }
  },
  methods: {
    ...mapActions({
      setMapBounds: 'RiverIndex/setMapBounds',
      mouseOverFeature: 'RiverIndex/mouseOverFeature'
    }),
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
      this.mouseOverFeature(feature)
    },
    updateMapColorScheme (newScheme) {
      const colors = Object.values(NwiMapStyles.colorSchemes[newScheme])
      let colorScheme
      if (newScheme === 'difficulty') {
        colorScheme = [
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
      } else if (newScheme === 'currentFlow') {
        colorScheme = [
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
      } else {
        colorScheme = '#53789a'
      }
      if (this.sourceLayers.includes('reach-segments')) {
        this.map.setPaintProperty('reachSegments', 'line-color', colorScheme)
        this.map.setPaintProperty('reachSegmentDashes', 'line-color', colorScheme)
      }
      if (this.sourceLayers.includes('reaches-without-geom')) {
        this.map.setPaintProperty('reachesWithoutGeom', 'circle-color', colorScheme)
      }
    },
    // this method notifies upstream components of what reaches are visible in
    // the current viewport
    updateReachesInViewport () {
      // can have multiple responses for a given reach because of tiling,
      // so need to make array unique
      const uniq = {}
      const reachContainingLayers = ['reachSegments', 'reachesWithoutGeom'].filter(
        x => this.mapLayers.includes(x)
      )
      const reaches = this.map
        .queryRenderedFeatures({ layers: reachContainingLayers })
        // eslint-disable-next-line
        .filter(
          obj => !uniq[obj.properties.id] && (uniq[obj.properties.id] = true)
        )

      // only show river sidebar if there's a reasonable number of rivers
      if (reaches.length <= 300) {
        this.$emit('changeReachesInViewport', reaches)
      } else {
        this.$emit('changeReachesInViewport', [])
      }
    },
    loadAWMapData () {
      if (!this.map.getSource('nwi-source')) {
        this.map.addSource('nwi-source', {
          type: 'vector',
          tiles: [nwiTileServer],
          promoteId: 'id',
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

            this.map.addLayer({
              id: mapLayer,
              source: 'nwi-source',
              'source-layer': sourceLayer,
              type: sourceLayers[sourceLayer][mapLayer].type,
              paint: sourceLayers[sourceLayer][mapLayer].paint,
              layout: sourceLayers[sourceLayer][mapLayer].layout,
              ...zoomAttributes
            })
          })
        })

        if (this.detailReachId) {
          this.adjustMapForDetailReach()
        }

        this.updateMapColorScheme(this.colorBy)

        // the assumption when you set `sourceLayers` prop is that the last layer
        // displays on top. Unfortunately, when attaching mouse events, we want
        // the top layer to be the clickable one -- meaning it needs to be attached first.
        // so we have to reverse mapLayers here to match our desired order
        this.mapLayers.reverse().forEach(layer => {
          this.attachMouseEvents(layer)
        })
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
          }
        })
      }
    },
    // preprocesses NwiMapStyles.js paint properties to de-emphasize (through opacity)
    // other reaches if this.detailReachId is set
    // need to pass layer in here because 'reach-segments' is different from the rest
    processPaintPropsForDetailReach (layer, paint) {
      if (!this.detailReachId || layer === 'activeReachSegmentCasing') {
        return paint
      } else {
        const inactiveOpacity = 0.5
        // we are iterating through paint props and looking for 'opacity' in the key
        const newPaint = {}
        Object.keys(paint).forEach(key => {
          // don't process opacity that is set to 0
          if (
            key.includes('opacity') &&
            (isNaN(paint[key]) || paint[key] > 0)
          ) {
            if (['reachSegments', 'reachesWithoutGeom', 'reachesWithoutGeomLabels'].includes(layer)) {
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
    adjustMapForDetailReach () {
      this.filterNonDetailReachFeatures()

      const { sourceLayers } = NwiMapStyles

      this.sourceLayers.forEach(sourceLayer => {
        Object.keys(sourceLayers[sourceLayer]).forEach(mapLayer => {
          const paintProps = this.processPaintPropsForDetailReach(
            mapLayer,
            sourceLayers[sourceLayer][mapLayer].paint
          )
          Object.keys(paintProps).forEach(propKey => {
            this.map.setPaintProperty(
              mapLayer,
              propKey,
              paintProps[propKey]
            )
          })
        })
      })
    },
    mountMap () {
      mapboxgl.accessToken = this.mapboxAccessToken
      const mapProps = {
        container: this.$refs.mapContainer,
        style: this.baseMapUrl,
        trackUserLocation: true
      }
      if (this.startingBounds) {
        mapProps.bounds = this.startingBounds
        mapProps.fitBoundsOptions = fitBoundsOptions
      } else if (this.mapBounds) {
        mapProps.bounds = this.mapBounds
      } else {
        mapProps.center = this.center
        mapProps.zoom = this.startingZoom
        if (this.centerOnUserLocation && 'geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(position => {
            this.map.flyTo({
              center: [position.coords.longitude, position.coords.latitude],
              zoom: 9
            })
          })
        }
      }
      this.map = new mapboxgl.Map(mapProps)

      this.map.addControl(
        new mapboxgl.NavigationControl({ showCompass: true }),
        'bottom-left'
      )

      this.map.on('styledata', this.loadAWMapData)
      this.map.on('styledata', this.modifyMapboxBaseStyle)

      // this is a kind of weird solution to the fact that once in a blue moon,
      // our app CSS doesn't finish loading before the map is mounted, which causes
      // the map to render improperly until the window is resized
      this.map.on('load', this.map.resize)

      this.map.on('sourcedata', (e) => {
        if (e.isSourceLoaded) {
          this.mapDataLoading = false
        }
        this.debouncedUpdateReachesInViewport()
      })
      this.map.on('sourcedataloading', () => { this.mapDataLoading = true })

      this.map.on('moveend', this.debouncedUpdateReachesInViewport)
      this.map.on('moveend', () => {
        // TODO: refactor detail page map tab so that it shares code with this component via mixin
        // but does not use the same component
        if (!this.detailReachId) {
          this.setMapBounds(this.map.getBounds().toArray())
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

  canvas,
  .nwi-map {
    height: 100%;
    width: 100%;
    // background-color:$ui-03;
    &.river-detail {
      //  @include carbon--breakpoint("md") {
      //   width: 68%;
      //   height: 100%;
      // }

      // @include carbon--breakpoint("max") {
      //   width: 76%;
      // }
    }

  }

  // I think we have to show the logo for legal reasons, hiding it for demo purposes
  a.mapboxgl-ctrl-logo,
  .mapboxgl-ctrl.mapboxgl-ctrl-attrib {
    display: none !important;
  }
}
</style>
