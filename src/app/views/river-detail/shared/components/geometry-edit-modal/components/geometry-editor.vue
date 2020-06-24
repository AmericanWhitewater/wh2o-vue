<template>
  <section class="mb-xl">
    <p>
      The dotted lines represent the National Hydrography Dataset (NHD), a USGS dataset of rivers and streams
      in the United States. To modify the reach, click on either endpoint to "activate" it, then click it
      again and drag to move elsewhere on the NHD. A new "geometry" (line) will be generated when you finish
      moving the point.
    </p>
    <div
      id="nhd-editor-container"
      style="height: 500px;"
    >
      <div id="nhd-editor" />
      <nwi-basemap-toggle
        :offset-right="false"
      />
    </div>
  </section>
</template>

<script>
import NwiBasemapToggle from '@/app/views/river-index/components/nwi-basemap-toggle.vue'
import mapboxgl from 'mapbox-gl'
import { mapState } from 'vuex'
import {
  mapboxAccessToken
} from '@/app/environment/environment'

import bbox from '@turf/bbox'
import bboxPolygon from '@turf/bbox-polygon'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import along from '@turf/along'
import geoLength from '@turf/length'
import lineIntersect from '@turf/line-intersect'
import lineSlice from '@turf/line-slice'
import pointToLineDistance from '@turf/point-to-line-distance'
import { lineString } from '@turf/helpers'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

import Graph from 'graph-data-structure'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import SnapMode from '../utils/SnapMode'

export default {
  name: 'geometry-editor',
  components: {
    NwiBasemapToggle
  },
  data: () => ({
    currentGeom: null
  }),
  computed: {
    baseMapUrl () {
      if (this.mapStyle === 'topo') {
        return 'mapbox://styles/americanwhitewater/ck1se2yqi57ey1do8v1ewdbtr'
      } else if (this.mapStyle === 'satellite') {
        // custom version of `satellite-v8` that includes icons that already exist in `outdoors-v11`
        return 'mapbox://styles/americanwhitewater/ck1sdz9bp05tz1cmvi2xilge9'
      } else {
        return 'mapbox://styles/americanwhitewater/ck1se2yqi57ey1do8v1ewdbtr'
      }
    },
    reachGeom () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.data?.geom?.split(',').map(d => d.split(' ').map(e => parseFloat(e)))
      return geom ? lineString(geom, {}, { id: 'reachGeom' }) : null
    },
    reachStart () {
      return along(this.reachGeom, 0)
    },
    reachEnd () {
      const reachLength = geoLength(this.reachGeom)
      return along(this.reachGeom, reachLength)
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
    }
  },
  watch: {
    mapStyle (v) {
      this.map.setStyle(this.baseMapUrl)
    },
    currentGeom (v, old) {
      if (v !== old) {
        this.draw.delete('reachGeom')
        this.draw.add({
          id: 'reachGeom',
          ...v
        })
        this.$emit('updatedGeom', v)
      }
    }
  },
  methods: {
    getNhdLines () {
      const cacheKey = this.map.getBounds().toString()
      if (this.linesCache[cacheKey] == null) {
        this.linesCache = {}

        const lines = this.map
          .queryRenderedFeatures({ layers: ['nhd-lines'] })
          .filter(x => (
            x.geometry.type === 'LineString'
            // thought I could limit our linestrings here but this leaves out some important
            // data segments, maybe revisit?
            //            [46000, 46003, 46006, 46007].includes(x.properties.fcode)
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
            if (x !== y && lineIntersect(x, y).features.length) {
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
      this.currentGeom = newGeom
    },
    mountMap () {
      mapboxgl.accessToken = mapboxAccessToken
      const mapProps = {
        container: 'nhd-editor',
        style: this.baseMapUrl,
        bounds: this.startingBounds,
        fitBoundsOptions: { padding: 80 },
        minZoom: 12
      }
      this.map = new mapboxgl.Map(mapProps)

      this.draw = new MapboxDraw({
        displayControlsDefault: false,
        defaultMode: 'SnapMode',
        modes: {
          SnapMode: {
            ...SnapMode,
            config: {
              layers: ['nhd-lines']
            }
          }
        }
      })
      this.map.addControl(this.draw, 'top-left')

      this.map.on('load', () => { this.initializeDraw() })

      this.map.on('draw.update', (e) => {
        this.calculateGeom()
      })
    },
    initializeDraw () {
      if (this.reachGeom) {
        this.draw.add({
          id: 'reachStart',
          ...this.reachStart
        })
        this.draw.add({
          id: 'reachEnd',
          ...this.reachEnd
        })
        this.draw.add({
          id: 'reachGeom',
          ...this.reachGeom
        })
      }
    }
  },
  mounted () {
    if (mapboxAccessToken) {
      this.mountMap()
    }
    this.currentGeom = this.reachGeom
    this.graphCache = {}
    this.linesCache = {}
  }
}
</script>

<style lang="scss">
#nhd-editor-container {
  min-width: 100%;

  width: 100%;
  position: relative;
}
#nhd-editor {
  height: 100%;
  width: 100%;
  background-color:$ui-03;
}
</style>
