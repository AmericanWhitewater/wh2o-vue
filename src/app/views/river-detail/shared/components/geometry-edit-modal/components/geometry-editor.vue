<template>
  <section>
    <h5 class="mode-name">
      Editing in {{ mapEditMode }} Mode
    </h5>
    <template v-if="geometryMode === 'creating'">
      <p v-if="mapEditMode ==='automatic'">
        Click on the map to create the start and end points of your reach. When you click, your selection will
        automatically snap to the National Hydrography Dataset (NHD), a USGS dataset of rivers and streams. Once
        you've defined two points, the map will automatically calculate a path between the two.
      </p>
      <p v-if="mapEditMode ==='manual'">
        Click on the map to start defining a line segment. You can keep adding new vertices by clicking in new places
        or you can "complete" your line by clicking a second time on the last vertex you created. The dotted pink
        lines represent the USGS National Hydrography Dataset (NHD), a USGS dataset of rivers and streams.
      </p>
    </template>
    <template v-else>
      <p v-if="mapEditMode === 'automatic'">
        The dotted lines represent the National Hydrography Dataset (NHD), a USGS dataset of rivers and streams
        in the United States. To modify the reach, click on either endpoint to "activate" it, then click it
        again and drag to move elsewhere on the NHD. The points will automatically "snap" to the nearest flowline
        in the NHD as you drag. A new "geometry" (line) will be generated when you finish moving the point.
        It isn't saved until you click "Submit" below.
      </p>
      <p v-if="mapEditMode === 'manual'">
        Manual mode allows you to modify the line segment by hand. Click on the line segment to activate editing.
        A series of vertices will appear along the line. Click on one, then click again and drag to modify the line.
        Note: if you go back to automatic mode and modify the reach again, your changes will be overwritten.
      </p>
    </template>
    <cv-inline-notification
      v-if="tooZoomedOut && !noticeHidden"
      kind="warning"
      title="Zoom in to edit"
      sub-title="Since the editor snaps to a very dense dataset (the National Hydrography Dataset), you can only edit it meaningfully at closer zoom levels. Zoom in to enable editing."
      @close="noticeHidden = true"
    />
    <div
      id="nhd-editor-container"
      style="height: 400px;"
    >
      <div class="nhd-editor-mode-switcher">
        <cv-dropdown v-model="mapEditMode">
          <cv-dropdown-item value="automatic">
            Automatic
          </cv-dropdown-item>
          <cv-dropdown-item value="manual">
            Manual
          </cv-dropdown-item>
        </cv-dropdown>
      </div>
      <div
        v-if="currentGeom"
        class="nhd-editor-clear-map"
      >
        <cv-button
          kind="danger"
          size="small"
          @click="clearMap"
        >
          Clear Map
        </cv-button>
      </div>
      <div
        id="nhd-editor"
        ref="nhdEditor"
      />
      <nwi-basemap-toggle
        :offset-right="false"
      />
    </div>
  </section>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import { mapState } from 'vuex'
import {
  mapboxAccessToken
} from '@/app/environment'
import NwiBasemapToggle from '@/app/views/river-index/components/nwi-basemap-toggle.vue'

import bbox from '@turf/bbox'
import bboxPolygon from '@turf/bbox-polygon'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import booleanPointOnLine from '@turf/boolean-point-on-line'
import lineIntersect from '@turf/line-intersect'
import lineSlice from '@turf/line-slice'
import pointToLineDistance from '@turf/point-to-line-distance'
import { lineString, point } from '@turf/helpers'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import Graph from 'graph-data-structure'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import SnapMode from '../utils/SnapMode'
import SnapDrawPointMode from '../utils/SnapDrawPointMode'
import StaticMode from '@mapbox/mapbox-gl-draw-static-mode'
import DrawStyles from '../utils/DrawStyles'

const defaultMapModes = {
  editing: {
    automatic: 'SnapMode',
    manual: 'simple_select'
  },
  creating: {
    automatic: 'SnapDrawPointMode',
    manual: 'draw_line_string'
  }
}

export default {
  name: 'geometry-editor',
  components: {
    NwiBasemapToggle
  },
  data: () => ({
    currentGeom: null,
    tooZoomedOut: false,
    noticeHidden: false,
    mapEditMode: 'automatic'
  }),
  computed: {
    // these basemaps are different than our other NWI maps because they use the NHD flowlines
    // as a result, we can't use the basemapToggleMixin
    baseMapUrl () {
      if (this.mapStyle === 'topo') {
        return 'mapbox://styles/americanwhitewater/ckbv35azb12w51initt7y2adv'
      } else if (this.mapStyle === 'satellite') {
        return 'mapbox://styles/americanwhitewater/ckbv3rzya136r1ioalj7qemof'
      } else {
        return 'mapbox://styles/americanwhitewater/ckbv35azb12w51initt7y2adv'
      }
    },
    reachGeom () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.data?.geom?.split(',').map(d => d.split(' ').map(e => parseFloat(e)))
      return geom ? lineString(geom, {}, { id: 'reachGeom' }) : null
    },
    reachStart () {
      const geom = this.currentGeom || this.reachGeom
      return geom ? point(geom.geometry.coordinates[0]) : null
    },
    reachEnd () {
      const geom = this.currentGeom || this.reachGeom
      return geom ? point(geom.geometry.coordinates.slice(-1)[0]) : null
    },
    ...mapState({
      mapStyle: state => state.riverIndexState.riverIndexData.mapStyle,
      data: state => state.riverDetailState.riverDetailData.data
    }),
    startingBounds () {
      if (this.reachGeom) {
        return bbox(this.reachGeom)
      }
      return null
    },
    // determines whether we need to add elements to the map
    // or edit ones that already exist
    geometryMode () {
      if (this.currentGeom) {
        return 'editing'
      } else {
        return 'creating'
      }
    }
  },
  watch: {
    mapStyle (v) {
      this.map.setStyle(this.baseMapUrl)
    },
    currentGeom (v, old) {
      if (v !== old) {
        this.$emit('updatedGeom', v)
      }
    },
    // turns off editing when user is too zoomed out
    tooZoomedOut (v) {
      if (v) {
        // deactivate editing
        this.draw.changeMode('StaticMode')
      } else {
        // switch back to currently active mode
        this.setMapEditingMode(this.mapEditMode)
      }
    },
    geometryMode (v) {
      this.setMapEditingMode(this.mapEditMode)
    },
    mapEditMode (v) {
      this.setMapEditingMode(v)
    }
  },
  methods: {
    clearMap () {
      if (confirm('Are you sure?')) {
        this.currentGeom = null
        this.draw.deleteAll()
      }
    },
    getNhdLines () {
      const cacheKey = this.map.getBounds().toString()
      if (this.linesCache[cacheKey] == null) {
        this.linesCache = {}

        const lines = this.map
          .queryRenderedFeatures({ layers: ['nhdflowline'] })
          .filter(x => (
            x.geometry.type === 'LineString' &&
            // this is mostly taken from Seth's code, we may want to revisit?
            // ideally improves speed by excluding some NHD flowlines from graph
            ![31800, 33601, 33603, 34300, 34305, 34306, 36400, 40300, 40307, 40308, 40309, 44500, 46100, 48400, 48500, 56800].includes(x.properties.fcode)
          ))
        this.linesCache[cacheKey] = lines
      }
      return this.linesCache[cacheKey]
    },
    getNhdGraph () {
      const graphCacheKey = this.map.getBounds().toString()
      if (this.graphCache[graphCacheKey] == null) {
        this.graphCache = {}

        const graph = new Graph()
        const lines = this.getNhdLines()
        lines.forEach((x) => { graph.addNode(x.id.toString()) })

        lines.forEach((x, index) => {
          lines.slice(index + 1).forEach(y => {
            if (x !== y &&
                (booleanPointOnLine(y.geometry.coordinates[0], x) ||
                 booleanPointOnLine(y.geometry.coordinates.slice(-1)[0], x))) {
              graph.addEdge(x.id.toString(), y.id.toString())
              graph.addEdge(y.id.toString(), x.id.toString())
            }
          })
        })
        this.graphCache[graphCacheKey] = graph
      }
      return this.graphCache[graphCacheKey]
    },
    calculateGeom () {
      const graph = this.getNhdGraph()
      const lines = this.getNhdLines()
      const reachStart = this.draw.get('reachStart')
      const reachEnd = this.draw.get('reachEnd')

      // if the start and finish are not both visible in the current viewport,
      // we need to operate differently, so detect that here:
      const mapBbox = bboxPolygon(this.map.getBounds().toArray().flat())
      const intersection = lineIntersect(this.currentGeom, mapBbox)

      let newSegmentStart
      let newSegmentEnd
      let whichPointIsOutside
      let intersectionPoint
      // geom intersects viewport!
      if (intersection.features.length) {
        intersectionPoint = intersection.features[0]
        // determine whether reachStart or reachEnd is in the viewport
        if (booleanPointInPolygon(reachStart, mapBbox)) {
          whichPointIsOutside = 'end'
          newSegmentStart = reachStart
          newSegmentEnd = intersectionPoint
        } else {
          whichPointIsOutside = 'start'
          newSegmentStart = intersectionPoint
          newSegmentEnd = reachEnd
        }
      } else {
        newSegmentStart = reachStart
        newSegmentEnd = reachEnd
      }

      // use the segment start/end to generate a new path between those segments
      // turf has a bug with nearestPointOnLine:
      // https://github.com/Turfjs/turf/issues/1726
      // so we're working around it by checking distance from line
      // with a very small threshhold
      const putinSegment = lines.find(x =>
        (pointToLineDistance(newSegmentStart, x) < 0.01)
      )
      const takeoutSegment = lines.find(x =>
        (pointToLineDistance(newSegmentEnd, x) < 0.01)
      )
      const shortestPath = graph.shortestPath(
        putinSegment.id.toString(),
        takeoutSegment.id.toString()
      )
      const coords = []
      shortestPath.forEach(x => {
        const l = lines.find(l => (l.id.toString() === x))
        coords.push(...l.geometry.coordinates)
      })
      const initialLine = lineString(coords)
      const slicedLine = lineSlice(newSegmentStart, newSegmentEnd, initialLine)

      let newGeom

      // if the segment extends beyond the viewport, merge it with the original geom, sliced at the viewport overlap
      if (whichPointIsOutside) {
        let fullCoords
        if (whichPointIsOutside === 'end') {
          const originalSegment = lineSlice(intersectionPoint, reachEnd, this.currentGeom)
          fullCoords = [...slicedLine.geometry.coordinates, ...originalSegment.geometry.coordinates]
        } else {
          const originalSegment = lineSlice(reachStart, intersectionPoint, this.currentGeom)
          fullCoords = [...originalSegment.geometry.coordinates, ...slicedLine.geometry.coordinates]
        }
        newGeom = lineString(fullCoords)
      } else {
        newGeom = slicedLine
      }
      return newGeom
    },
    setMapEditingMode (mode) {
      // if we're too zoomed out, editing mode is StaticMode
      // and we should keep it that way
      if (!this.tooZoomedOut) {
        this.draw.changeMode(defaultMapModes[this.geometryMode][mode])
      }

      this.renderDrawFeatures()
    },
    mountMap () {
      mapboxgl.accessToken = mapboxAccessToken
      const mapProps = {
        container: this.$refs.nhdEditor,
        style: this.baseMapUrl,
        bounds: this.startingBounds,
        fitBoundsOptions: { padding: 80 },
        minZoom: 5
      }
      this.map = new mapboxgl.Map(mapProps)

      this.draw = new MapboxDraw({
        displayControlsDefault: false,
        defaultMode: defaultMapModes[this.geometryMode][this.mapEditMode],
        styles: DrawStyles,
        modes: {
          StaticMode,
          ...MapboxDraw.modes,
          SnapDrawPointMode: {
            ...SnapDrawPointMode,
            config: {
              layers: ['nhdflowline']
            }
          },
          SnapMode: {
            ...SnapMode,
            config: {
              layers: ['nhdflowline']
            }
          }
        }
      })
      this.map.addControl(this.draw, 'top-left')

      this.map.on('load', () => {
        this.renderDrawFeatures()
        this.setTooZoomedOut()
      })

      this.map.on('zoomend', this.setTooZoomedOut)

      this.map.on('draw.update', (e) => {
        if (this.mapEditMode === 'automatic') {
          // calculate the new line "automatically"
          this.currentGeom = this.calculateGeom()
          // render the new line
          this.draw.delete('reachGeom')
          this.draw.add({
            id: 'reachGeom',
            ...this.currentGeom
          })
        } else {
          // get the new geom from draw, where it was set
          this.currentGeom = this.draw.get('reachGeom')
        }
      })

      // for creating a new reach (or adding geom to one that doesn't have it)
      this.map.on('draw.create', (e) => {
        if (this.mapEditMode === 'manual') {
          const newReach = e.features[0]
          // need to copy to new feature with 'reachGeom' id to function with
          // existing logic
          this.draw.delete(newReach.id)
          newReach.id = 'reachGeom'
          this.draw.add(newReach)
          this.currentGeom = newReach
        } else { // automatic
          // in automatic mode, user is prompted to create two points (snapped to NHD)
          // then calculateGeom() is called
          const newPoint = e.features[0]
          this.draw.delete(newPoint.id)

          if (!this.draw.get('reachStart')) {
            newPoint.id = 'reachStart'
          } else if (!this.draw.get('reachEnd')) {
            newPoint.id = 'reachEnd'
          } else {
            return
          }
          this.draw.add(newPoint)

          if (this.draw.get('reachStart') && this.draw.get('reachEnd')) {
            // add straight line from start to finish to facilitate geom calculation
            this.currentGeom = lineString([
              this.draw.get('reachStart').geometry.coordinates,
              this.draw.get('reachEnd').geometry.coordinates], {}, { id: 'reachGeom' })

            this.currentGeom = this.calculateGeom()
            // render the new line
            this.draw.add({
              id: 'reachGeom',
              ...this.currentGeom
            })
          }
        }
      })
    },
    setTooZoomedOut () {
      const zoom = this.map.getZoom()
      // we can't support NHD calculations when too zoomed out computationally
      // plus, you can't really accurately "snap" to the NHD when you aren't zoomed
      // in enough to see it. So at low zooms, put the map in static mode and display
      // a notice
      if (zoom < 11) {
        this.tooZoomedOut = true
      } else {
        this.tooZoomedOut = false
      }
    },
    renderDrawFeatures () {
      if (!this.currentGeom) {
        return
      }
      const features = []
      // endpoints don't get rendered in "manual" mode
      if (this.mapEditMode === 'automatic') {
        features.push({
          id: 'reachStart',
          ...this.reachStart
        }, {
          id: 'reachEnd',
          ...this.reachEnd
        })
      }
      features.push({
        id: 'reachGeom',
        ...this.currentGeom
      })
      this.draw.set({
        type: 'FeatureCollection',
        features: features
      })
    }
  },
  mounted () {
    // ensure that reachGeom prop is established
    this.$nextTick(() => {
      this.currentGeom = this.reachGeom
      if (mapboxAccessToken) {
        this.mountMap()
      }
    })

    this.graphCache = {}
    this.linesCache = {}
  }
}
</script>
