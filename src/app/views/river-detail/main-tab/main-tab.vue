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
          <utility-block
            state="loading"
            :hide-text="true"
          />
        </template>
        <template v-if="!loading && data">
          <div class="map-wrapper">
            <NwiMap
              height="350"
              :detail-reach-id="reachId"
              :include-legend="false"
              :has-controls="false"
              :source-layers="sourceLayers"
              :starting-bounds="startingBounds"
            />
          </div>
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
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
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
import bbox from '@turf/bbox'
import { lineString } from '@turf/helpers'

export default {
  name: 'main-tab',
  components: {
    SideBar,
    RapidsSection,
    BetaBox,
    CommentsSection,
    UtilityBlock,
    RiverDescription,
    Layout,
    NwiMap
  },
  mixins: [checkWindow],
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
    startingBounds () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.data.geom.split(',').map(d => d.split(' '))
      return bbox(lineString(geom))
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
