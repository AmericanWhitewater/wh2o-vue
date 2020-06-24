<template>
  <section class="mb-xl">
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
    }
  },
  methods: {
    getNhdLines () {
      return this.map
        .queryRenderedFeatures({ layers: ['nhd-lines'] })
    },
    generateNhdGraph () {
      const graph = new Graph()
      const lines = this.getNhdLines()
      lines.forEach(x => {
        graph.addNode(x.id.toString())
        // iterate through the other lines and define edges
        lines.forEach(y => {
          if (y.id === x.id) {
            return
          }
          graph.addNode(y.id.toString())
          if (lineIntersect(x, y).features.length) {
            graph.addEdge(x.id.toString(), y.id.toString())
          }
        })
      })
      return graph
    },
    calculateGeom () {
      const graph = this.generateNhdGraph()
      const lines = this.getNhdLines()
      // turf has a bug with nearestPointOnLine:
      // https://github.com/Turfjs/turf/issues/1726
      // so we're working around it by checking distance from line
      // with a very small threshhold
      const reachStart = this.draw.get('reachStart')
      const putinSegment = lines.find(x =>
        (pointToLineDistance(reachStart, x) < 0.01)
      )
      const reachEnd = this.draw.get('reachEnd')
      const takeoutSegment = lines.find(x =>
        (pointToLineDistance(reachEnd, x) < 0.01)
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
      return lineSlice(reachStart, reachEnd, initialLine)
    },
    mountMap () {
      mapboxgl.accessToken = mapboxAccessToken
      const mapProps = {
        container: 'nhd-editor',
        style: this.baseMapUrl,
        bounds: this.startingBounds,
        fitBoundsOptions: { padding: 80 }
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
        this.draw.delete('reachGeom')
        const newGeom = this.calculateGeom()
        this.draw.add({
          id: 'reachGeom',
          ...newGeom
        })
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
