import MapboxDraw from '@mapbox/mapbox-gl-draw'
import Constants from '@mapbox/mapbox-gl-draw/src/constants'

import knn from 'rbush-knn'
import polygonToLine from '@turf/polygon-to-line'
import rbush from 'geojson-rbush'
import nearestPointOnLine from '@turf/nearest-point-on-line'

let cache = {}

export default {
  ...MapboxDraw.modes.draw_point,
  onClick (state, e) {
    this.updateUIClasses({ mouse: Constants.cursors.MOVE })
    const snappedPoint = this._getSnappedPoint(e.lngLat)
    state.point.updateCoordinate('', ...snappedPoint)
    this.map.fire(Constants.events.CREATE, {
      features: [state.point.toGeoJSON()]
    })
  },
  _getSnappedPoint (target) {
    const candidates = this._getCandidates()
    const nearestLines = knn(candidates, target.lng, target.lat, 10)

    if (nearestLines.length === 0) {
      return
    }

    const nearest = nearestLines
      .map(l => [l, nearestPointOnLine(l, [target.lng, target.lat])])
      .sort((a, b) => a[1].properties.dist - b[1].properties.dist)
      .shift()

    return nearest[1].geometry.coordinates
  },
  _getCandidates () {
    const key = this.map.getBounds().toString()

    if (cache[key] == null) {
      // clear cache
      cache = {}

      const candidates = this.map
        // querySourceFeatures("composite", { sourceLayer: "nhdpolygon" }) also
        // works, but there's something nice about syncing what's visible with
        // where points can snap
        .queryRenderedFeatures({ layers: this.config.layers })
        .map(x => {
          if (
            [
              Constants.geojsonTypes.POLYGON,
              Constants.geojsonTypes.MULTI_POLYGON
            ].includes(x.geometry.type)
          ) {
            return polygonToLine(x, x.properties)
          }

          return x
        })
        .flatMap(x => {
          if (x.type === Constants.geojsonTypes.FEATURE_COLLECTION) {
            return x.features
          }

          return x
        })

      if (candidates.length === 0) {
        // nowhere to snap to
        return null
      }

      cache[key] = rbush().load(candidates)
    }

    return cache[key]
  }
}
