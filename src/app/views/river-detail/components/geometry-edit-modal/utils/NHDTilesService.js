import bboxPolygon from '@turf/bbox-polygon'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import booleanPointOnLine from '@turf/boolean-point-on-line'
import lineIntersect from '@turf/line-intersect'
import lineSlice from '@turf/line-slice'
import pointToLineDistance from '@turf/point-to-line-distance'
import { lineString } from '@turf/helpers'
import Graph from 'graph-data-structure'

// this is a class so it can be initialized with the maplibregljs map object
// then continue to use it to populate and refresh the graph and lines caches
class NHDTilesService {
  constructor(map) {
    this.map = map;
    this.graphCache = {};
    this.linesCache = {};
  }

  calculateGeom(reachStart, reachEnd, currentGeom) {
    const graph = this.getNhdGraph()
    const lines = this.getNhdLines()


      // if the start and finish are not both visible in the current viewport,
      // we need to operate differently, so detect that here:
      const mapBbox = bboxPolygon(this.map.getBounds().toArray().flat())
      const intersection = lineIntersect(currentGeom, mapBbox)

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
      // so we're identifying the line closest using pointToLineDistance instead
      const putinDistances = lines.map(x => pointToLineDistance(newSegmentStart, x));
      const putinSegment = lines[putinDistances.indexOf(Math.min(...putinDistances))];

      const takeoutDistances = lines.map(x => pointToLineDistance(newSegmentEnd, x));
      const takeoutSegment = lines[takeoutDistances.indexOf(Math.min(...takeoutDistances))];
      
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
          const originalSegment = lineSlice(intersectionPoint, reachEnd, currentGeom)
          fullCoords = [...slicedLine.geometry.coordinates, ...originalSegment.geometry.coordinates]
        } else {
          const originalSegment = lineSlice(reachStart, intersectionPoint, currentGeom)
          fullCoords = [...originalSegment.geometry.coordinates, ...slicedLine.geometry.coordinates]
        }
        newGeom = lineString(fullCoords)
      } else {
        newGeom = slicedLine
      }
      return newGeom
  }

  getNhdLines () {
    const cacheKey = this.map.getBounds().toString()
    if (this.linesCache[cacheKey] == null) {
      this.linesCache = {}
      const mapFeatures = this.map.queryRenderedFeatures({ layers: ['nhdflowline'] })
      const lines = mapFeatures
        // mapFeatures sometimes has multiLineStrings in it that need to be split for our graph algorithm
        .flatMap(x => {
          if (x.geometry.type === 'MultiLineString') {
            return x.geometry.coordinates.map((coords, index) => (
              lineString(coords, x.properties, { id: `${x.id}-${index}`})
            ))
          } else {
            return x
          }
        })
        .filter(x => (
          x.geometry.type === 'LineString' &&
          // this is mostly taken from Seth's code, we may want to revisit?
          // ideally improves speed by excluding some NHD flowlines from graph
          ![31800, 33601, 33603, 34300, 34305, 34306, 36400, 40300, 40307, 40308, 40309, 44500, 46100, 48400, 48500, 56800].includes(x.properties.fcode)
        ))
      this.linesCache[cacheKey] = lines
    }
    return this.linesCache[cacheKey]
  }

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
  }
}

export { NHDTilesService };