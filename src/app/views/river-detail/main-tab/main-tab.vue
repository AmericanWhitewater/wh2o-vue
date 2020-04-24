<template>
  <div class="main-tab">
    <!-- <layout
      name="layout-fifty-fifty"
      class="mb-lg"
    >
      <template #left>
        <beta-box />
      </template>
      <template #right>
        <template v-if="loading">
          <utility-block
            state="loading"
            :hide-text="true"
          />
        </template>
        <template v-if="!loading && data && token">
          <div class="map-wrapper">
            <NwiMap
              height="350"
              :detail-reach-id="riverId"
              :include-legend="false"
              :has-sidebar="false"
              :mapbox-access-token="token"
              :tileservers="[tileserver]"
              :has-controls="false"
              :source-layers="sourceLayers"
              :center="center"
              :starting-zoom="zoom"
            />
          </div>
        </template>
        <template v-if="!token">
          <utility-block
            title="Disabled"
            text="map is currently unavailable"
          />
        </template>
      </template>
    </layout> -->
    <layout
      name="layout-full-width"
      class="mb-lg"
      :options="{
        sidebar: {
          left: windowWidth < breakpoints.lg
        }
      }"
    >
      <template #main>
        <template v-if="loading">
          <utility-block
            state="loading"
            :hide-text="true"
          />
        </template>
        <template v-if="data">
          <div class="map-wrapper">
            <NwiMap
              height="400"
              :detail-reach-id="riverId"
              :include-legend="false"
              :has-sidebar="false"
              :mapbox-access-token="token"
              :tileservers="[tileserver]"
              :has-controls="false"
              :source-layers="sourceLayers"
              :center="center"
              :starting-zoom="zoom"
            />
          </div>
        </template>
        <beta-box />
        <river-description />
        <rapids-section />
        <comments-section />
      </template>
      <template #sidebar>
        <side-bar />
      </template>
    </layout>
  </div>
</template>
<script>
import {
  mapboxAccessToken,
  nwiTileServer
} from '@/app/environment/environment'
import { Layout } from '@/app/global/layout'
import { checkWindow } from '@/app/global/mixins'
import { mapState } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { NwiMap } from '@/app/views/river-index/components'
import {
  SideBar,
  RapidsSection,
  RiverDescription,
  CommentsSection,
  BetaBox
} from './components'

export default {
  name: 'main-tab',
  components: {
    BetaBox,
    SideBar,
    NwiMap,
    RapidsSection,
    CommentsSection,
    RiverDescription,
    Layout,
    UtilityBlock
  },
  mixins: [checkWindow],
  data: () => ({
    tileserver: nwiTileServer,
    token: mapboxAccessToken,
    sourceLayers: ['reach-segments', 'access']
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.riverDetailData.loading,
      data: state => state.riverDetailState.riverDetailData.data,
      error: state => state.riverDetailState.riverDetailData.error
    }),
    riverId () {
      return parseInt(this.$route.params.id)
    },
    // temporary hack while we wait for bbox!!!
    center () {
      return [this.data.plon, this.data.plat]
    },
    zoom () {
      return 10
    }
  }
}
</script>
<style lang="scss">
.main-tab {
  padding-top: $spacing-xl;
  .bx--skeleton__heading {
    height: 400px;
  }
  .map-wrapper {
    height:400px;
    position: relative;
    z-index: 1;
  }
}
</style>
