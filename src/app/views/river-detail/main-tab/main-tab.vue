<template>
  <div class="main-tab">
    <layout
      name="layout-full-width"
      class="mb-lg"
    >
      <template #main>
        <div
          id="map-wrapper"
          class="mb-sm"
        >
          <nwi-map
            v-if="startingBounds"
            height="400"
            :detail-reach-id="reachId"
            :include-legend="false"
            :has-controls="false"
            :source-layers="sourceLayers"
            :starting-bounds="startingBounds"
            fullscreen-target="map-wrapper"
            hide-result-counter
          />
          <utility-block
            v-if="!startingBounds"
            state="error"
            text="failed to load map"
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
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
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
import bbox from '@turf/bbox'
import { lineString } from '@turf/helpers'

export default {
  name: 'main-tab',
  components: {
    BetaBox,
    UtilityBlock,
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
    startingBounds () {
      // TODO: get graphql API to return a linestring or geojson instead of this text
      const geom = this.data?.geom?.split(',').map(d => d.split(' '))
      return geom ? bbox(lineString(geom)) : null
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
  #map-wrapper {
    height:400px;
    position: relative;
    z-index: 1;
  }
}
</style>
