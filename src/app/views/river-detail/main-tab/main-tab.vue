<template>
  <div class="main-tab">
    <layout
      name="layout-full-width"
      class="mb-lg"
    >
      <template #main>
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
    SideBar,
    RapidsSection,
    CommentsSection,
    RiverDescription,
    Layout
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
