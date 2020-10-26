import bbox from '@turf/bbox'
import { mapState } from 'vuex'
import { lineString, point, featureCollection } from '@turf/helpers'
import buffer from '@turf/buffer'

export const mapHelpersMixin = {
  computed: {
    ...mapState({
      reach: state => state.riverDetailState.riverDetailData.data,
      rapids: state => state.riverDetailState.rapidsData.data
    }),
    reachGeom () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.reach?.geom?.split(',').map(d => d.split(' ').map(y => parseFloat(y)))
      return geom ? lineString(geom) : null
    },
    bboxAroundReach () {
      return this.reachGeom ? bbox(this.reachGeom) : null
    },
    // uses state to find starting bounds for a reach detail map
    // if reach geometry exists, use that
    // else if POIs exist, build a bbox around them
    // else default map bounds
    reachStartingBounds () {
      return this.bboxAroundReach || this.bboxAroundPOIs || this.defaultMapBounds
    },
    bboxAroundPOIs () {
      if (this.rapids && this.rapids.length > 0) {
        const poiLocations = this.rapids.filter(
          (x) => x.rloc
        ).map((x) => (point(x.rloc.split(' ').map(x => parseFloat(x)))))
        const collection = featureCollection(poiLocations)
        const container = bbox(buffer(collection, 2))
        return container
      }
      return null
    },
    // bounds of a view of the continental US
    defaultMapBounds () {
      return [
        -64.42046827451144,
        29.26833088399728,
        -127.80531178236257,
        49.66720956723569
      ]
    }
  },
  methods: {
    // basically duplicating https://github.com/AmericanWhitewater/wh2o/blob/development/app/Http/Controllers/API/TilesController.php#L16-L99
    mapClassToDifficulty (classString) {
      const mapping = {
        I: 0,
        'I(II)': 0,
        'I(III)': 0,
        'I(IV)': 0,
        'I(V)': 0,
        'I(V+)': 0,
        'I-II': 1,
        'I-II(III)': 1,
        'I-II(IV)': 1,
        'I-II(V)': 1,
        'I-II(V+)': 1,
        II: 1,
        'II(III)': 1,
        'II(IV)': 1,
        'II(V)': 1,
        'II(V+)': 1,
        'I-II+(III)': 2,
        'I-II+(IV)': 2,
        'I-II+(V)': 2,
        'I-II+(V+)': 2,
        'II+': 2,
        'II+(III)': 2,
        'II+(IV)': 2,
        'II+(V)': 2,
        'II+(V+)': 2,
        'I-III': 3,
        'I-III(IV)': 3,
        'I-III(V)': 3,
        'I-III(V+)': 3,
        'II-III': 3,
        'II-III(IV)': 3,
        'II-III(V)': 3,
        'II-III(V+)': 3,
        III: 3,
        'I-III+': 4,
        'I-III+(IV)': 4,
        'I-III+(V)': 4,
        'I-III+(V+)': 4,
        'II-III+': 4,
        'II-III+(IV)': 4,
        'II-III+(V)': 4,
        'II-III+(V+)': 4,
        'III+': 4,
        'III+(IV)': 4,
        'III+(V)': 4,
        'III+(V+)': 4,
        'I-IV': 5,
        'I-IV(V)': 5,
        'I-IV(V+)': 5,
        'II-IV': 5,
        'II-IV(V)': 5,
        'II-IV(V+)': 5,
        'III-IV': 5,
        'III-IV(V)': 5,
        'III-IV(V+)': 5,
        IV: 5,
        'IV(V)': 5,
        'IV(V+)': 5,
        'I-IV+': 6,
        'I-IV+(V)': 6,
        'I-IV+(V+)': 6,
        'II-IV+': 6,
        'II-IV+(V)': 6,
        'II-IV+(V+)': 6,
        'III-IV+': 6,
        'III-IV+(V)': 6,
        'III-IV+(V+)': 6,
        'IV+': 6,
        'I-V': 7,
        'I-V(V+)': 7,
        'II-V': 7,
        'II-V(V+)': 7,
        'III-V': 7,
        'III-V(V+)': 7,
        'IV-V': 7,
        'IV-V(V+)': 7,
        V: 7,
        'II-V+': 8,
        'III-V+': 8,
        'IV-V+': 8,
        'V+': 8
      }
      return mapping[classString]
    }
  }
}
