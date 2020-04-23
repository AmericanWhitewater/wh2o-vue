<template>
  <div id="map-tab">
    <layout
      name="layout-two-thirds"
    >
      <template #main>
        <template v-if="token">
          <NwiMap
            :include-legend="false"
            :mapbox-access-token="token"
            :tileservers="[tileserver]"
            :has-controls="false"
            :detail-reach-id="reachId"
            :source-layers="sourceLayers"
            :center="center"
            :starting-zoom="zoom"
          />
        </template>
        <template v-else>
          <utility-block
            state="error"
            text="map failed"
          />
        </template>
      </template>
      <template #sidebar>
        <hr>
        <h2 class="mb-spacing-md">
          Access
        </h2>
        <div class="bx--row mb-sm">
          <div class="bx--col">
            <h4>Latitude</h4>
            <h3>{{ riverData.plat }}</h3>
          </div>
          <div class="bx--col">
            <h4>Longitude</h4>
            <h3>{{ riverData.plon }}</h3>
          </div>
        </div>
        <div class="bx--row">
          <div class="bx--col">
            <div v-html="riverData.shuttledetails" />
          </div>
        </div>
      </template>
    </layout>
  </div>
</template>
<script>
import { Layout } from '@/app/global/layout'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { NwiMap } from '@/app/views/river-index/components'
import { mapActions } from '../shared/state'
import { mapState } from 'vuex'
import {
  mapboxAccessToken,
  nwiTileServer
} from '@/app/environment/environment'

export default {
  name: 'map-tab',
  components: {

    Layout,
    UtilityBlock,
    NwiMap
  },
  data: () => ({
    detailFeature: null,
    includeLegend: false,
    mapControls: ['baseMap', 'color', 'fullscreen'],
    mockBBox: ['-106.297217', '38.776635', '-105.967627', '38.907397'],
    sourceLayers: ['reach-segments', 'rapids', 'access'],
    tileserver: nwiTileServer,
    token: mapboxAccessToken
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
    // temporary hack while we wait for bbox!!!
    center () {
      return [this.riverData.plon, this.riverData.plat]
    },
    zoom () {
      return 10
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
