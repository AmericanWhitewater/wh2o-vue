<template>
  <div id="map-tab">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col-sm-12 bx--col-md-12 bx--col-lg-12 bx--col-max-12">
          <NwiMap
            v-if="startingBounds"
            :include-legend="false"
            :has-controls="false"
            :detail-reach-id="reachId"
            :source-layers="sourceLayers"
            :starting-bounds="startingBounds"
            hide-result-counter
            @clickFeature="clickFeature"
          />
          <utility-block
            v-if="!startingBounds"
            text="failed to load map"
            state="error"
            class="mb-md"
          />
        </div>
        <div class="bx--col-sm-12 bx--col-md-4 bx--col-lg-4 bx--col-max-4">
          <info-panel
            :feature="detailFeature"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { NwiMap } from '@/app/views/river-index/components'
import { mapActions } from '../shared/state'
import { mapState } from 'vuex'
import { InfoPanel } from './components'
import bbox from '@turf/bbox'
import { lineString } from '@turf/helpers'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'

export default {
  name: 'map-tab',
  components: {
    InfoPanel,
    NwiMap,
    UtilityBlock
  },
  data: () => ({
    detailFeature: null,
    includeLegend: false,
    mapControls: ['baseMap', 'color', 'fullscreen'],
    mockBBox: ['-106.297217', '38.776635', '-105.967627', '38.907397'],
    sourceLayers: ['reach-segments', 'rapids', 'access']
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.mapData.loading,
      error: state => state.riverDetailState.mapData.error,
      data: state => state.riverDetailState.mapData.data,
      riverLoading: state => state.riverDetailState.riverDetailData.loading,
      riverError: state => state.riverDetailState.riverDetailData.error,
      riverData: state => state.riverDetailState.riverDetailData.data
    }),
    reachId () {
      return parseInt(this.$route.params.id, 10)
    },
    startingBounds () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.riverData?.geom?.split(',').map(d => d.split(' '))
      return geom ? bbox(lineString(geom)) : null
    }
  },
  methods: {
    loadData () {
      if (!this.data) {
        this.$store.dispatch(mapActions.FETCH_ACCESS_DATA, this.reachId)
      }
    },
    clickFeature (feature) {
      this.detailFeature = feature
    }
  },
  created () {
    this.loadData()
  }
}
</script>
<style lang="scss" scoped>
#map-tab {
  padding-top: 2rem;
}
</style>
