<template>
  <div class="main-tab">
    <layout
      name="layout-fifty-fifty"
      class="mb-lg"
    >
      <template #left>
        <beta-box />
      </template>
      <template #right>
        <template v-if="loading">
          <loading-block :hide-text="true" />
        </template>
        <template v-if="!loading && data && token">
          <div class="map-wrapper">
            <NwiMap
              height="350"
              :include-legend="false"
              :has-sidebar="false"
              :mapbox-access-token="token"
              :tileservers="[tileserver]"
              :has-controls="false"
            />
          </div>
        </template>
        <template v-if="!token">
          <error-block
            title="Disabled"
            text="map is currently unavailable"
          />
        </template>
      </template>
    </layout>
    <layout
      name="layout-two-thirds"
      class="mb-lg"
      :options="{
        sidebar: {
          left: windowWidth < breakpoints.lg
        }
      }"
    >
      <template #main>
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
import { LoadingBlock, ErrorBlock } from '@/app/global/components'
import { Layout } from '@/app/global/layout'
import { NwiMap } from '@/app/views/river-index/components'
import { checkWindow } from '@/app/global/mixins'
import { mapState } from 'vuex'
import {
  SideBar,
  BetaBox,
  RapidsSection,
  RiverDescription,
  CommentsSection
} from './components'

export default {
  name: 'main-tab',
  components: {
    SideBar,
    RapidsSection,
    BetaBox,
    CommentsSection,
    ErrorBlock,
    RiverDescription,
    LoadingBlock,
    Layout,
    NwiMap
  },
  mixins: [checkWindow],
  data: () => ({
    tileserver: nwiTileServer,
    token: mapboxAccessToken
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.riverDetailData.loading,
      data: state => state.riverDetailState.riverDetailData.data,
      error: state => state.riverDetailState.riverDetailData.error
    }),
    riverId () {
      return this.$route.params.id
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
    height:350px
  }
}
</style>
