<template>
  <div id="map-tab">
    <layout
      :name="!loading && !error ? 'layout-two-thirds' : 'layout-full-width'"
    >
      <template #main>
        <loading-block
          v-if="loading"
          text="Loading Map..."
        />
        <error-block
          v-if="!loading && error"
          title="Map unavailable"
          text="please try again later"
        />
        <nwi-map
          v-if="!loading && !error"
          :starting-bounds="mockBBox"
          :source-layers="sourceLayers"
          :tileservers="tileservers"
          :detail-reach-id="reachId"
          :mapbox-access-token="token"
          id-for-full-screen="map-tab"
          :include-legend="includeLegend"
          :map-controls="mapControls"
          @clickFeature="clickFeature"
        />
      </template>
      <template #sidebar>
        map sidebar
      </template>
    </layout>
  </div>
</template>
<script>
import { Layout } from '@/app/global/layout'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'
import { NwiMap } from '@/app/views/river-index/components/national-map-app/components'
import { mapActions } from '../shared/state'
import { mapState } from 'vuex'
import {
  mapboxAccessToken,
  nwiTileServer
} from '@/app/environment/environment'

export default {
  name: 'MapTab',
  components: {
    ErrorBlock,
    Layout,
    LoadingBlock,
    NwiMap
  },
  data: () => ({
    detailFeature: null,
    includeLegend: false,
    mapControls: ['baseMap', 'color', 'fullscreen'],
    mockBBox: ['-106.297217', '38.776635', '-105.967627', '38.907397'],
    sourceLayers: ['reach-segments', 'rapids', 'access'],
    tileservers: null,
    token: null,
    mapHttpConfig: {
      lat: null,
      lon: null
    }
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.mapData.loading,
      error: state => state.riverDetailState.mapData.error,
      data: state => state.riverDetailState.mapData.data
    }),
    reachId () {
      return parseInt(this.$route.params.id, 10)
    }
  },
  methods: {
    loadData () {
      if (!this.data && !this.error) {
        this.$store.dispatch(mapActions.FETCH_MAP_DATA, this.mapHttpConfig)
      }
    },
    clickFeature (feature) {
      this.detailFeature = feature
    }
  },
  created () {
    this.token = mapboxAccessToken
    this.tileservers = nwiTileServer

    this.loadData()
  }
}
</script>
<style lang="scss" scoped>
#map-tab {
  padding-top: 2rem;
}
</style>
