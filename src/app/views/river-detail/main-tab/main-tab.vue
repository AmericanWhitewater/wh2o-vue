<template>
  <div class="main-tab">
    <layout
      name="layout-full-width"
      class="mb-lg"
    >
      <template #main>
        <div class="map-wrapper mb-sm">
          <NwiMap
            v-if="data"
            height="400"
            :detail-reach-id="reachId"
            :include-legend="false"
            :has-controls="false"
            :source-layers="sourceLayers"
            :center="center"
            :starting-zoom="zoom"
          />
        </div>
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
import { Layout } from '@/app/global/layout'
import { mapState } from 'vuex'
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
    Layout
  },
  data: () => ({
    sourceLayers: ['reach-segments', 'access']
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.riverDetailData.loading,
      data: state => state.riverDetailState.riverDetailData.data,
      error: state => state.riverDetailState.riverDetailData.error
    }),
    reachId () {
      return Number(this.$route.params.id)
    },
    // temporary hack while we wait for bbox!!!
    center () {
      return [this.data?.plon, this.data?.plat]
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
