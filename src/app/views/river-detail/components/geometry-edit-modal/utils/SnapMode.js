import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as Constants from "@mapbox/mapbox-gl-draw/src/constants";
import knn from "rbush-knn";
import polygonToLine from "@turf/polygon-to-line";
import rbush from "geojson-rbush";
import nearestPointOnLine from "@turf/nearest-point-on-line";

let cache = {};

export default {
  ...MapboxDraw.modes.simple_select,
  clickOnFeature(state, e) {
    const featureId = e.featureTarget.properties.id;

    // prevent non-points from being selected
    if (this.getFeature(featureId).type !== Constants.geojsonTypes.POINT) {
      return;
    }

    return MapboxDraw.modes.simple_select.clickOnFeature.call(this, state, e);
  },
  clickOnVertex() {
    // don't allow vertices to be selected
  },
  dragMove(state, e) {
    // Dragging when drag move is enabled
    state.dragMoving = true;
    e.originalEvent.stopPropagation();

    this._moveFeatures(this.getSelected(), state.dragMoveLocation);

    state.dragMoveLocation = e.lngLat;
  },
  _getCandidates() {
    const key = this.map.getBounds().toString();

    if (cache[key] == null) {
      // clear cache
      cache = {};

      const candidates = this.map
        // querySourceFeatures("composite", { sourceLayer: "nhdpolygon" }) also
        // works, but there's something nice about syncing what's visible with
        // where points can snap
        .queryRenderedFeatures({ layers: this.config.layers })
        .map((x) => {
          if (
            [
              Constants.geojsonTypes.POLYGON,
              Constants.geojsonTypes.MULTI_POLYGON,
            ].includes(x.geometry.type)
          ) {
            return polygonToLine(x, x.properties);
          }

          return x;
        })
        .flatMap((x) => {
          if (x.type === Constants.geojsonTypes.FEATURE_COLLECTION) {
            return x.features;
          }

          return x;
        });

      if (candidates.length === 0) {
        // nowhere to snap to
        return null;
      }

      cache[key] = rbush().load(candidates);
    }

    return cache[key];
  },
  _moveFeatures(features, target) {
    const candidates = this._getCandidates();

    if (candidates == null) {
      // nowhere to snap to
      return;
    }

    features.forEach((feature) => {
      if (feature.type === Constants.geojsonTypes.POINT) {
        const nearestLines = knn(candidates, target.lng, target.lat, 10);

        if (nearestLines.length === 0) {
          return;
        }

        const [nearestLine, nearest] = nearestLines
          .map((l) => [l, nearestPointOnLine(l, [target.lng, target.lat])])
          .sort((a, b) => a[1].properties.dist - b[1].properties.dist)
          .shift();

        feature.incomingCoords(nearest.geometry.coordinates);

        // copy attributes over from the nearest line for display purposes
        feature.properties = {
          ...feature.properties,
          nhdplusid: nearestLine.id,
          gnis_name: nearestLine.properties.gnis_name,
          fcode: nearestLine.properties.fcode,
        };
      } else {
        // shouldn't be possible because of clickOnFeature and clickOnVertex
        // implementations
        // console.warn('Unsupported feature type:', feature.type)
      }
    });
  },
};
