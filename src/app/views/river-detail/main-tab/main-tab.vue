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
        <loading-block :hide-text="true" />
      </template>
    </layout>
    <layout
      name="layout-two-thirds"
      class="mb-lg"
    >
      <template #main>
        <river-description />
      </template>
      <template #sidebar>
        <side-bar />
      </template>
    </layout>
    <layout
      name="layout-full-width"
      class="mb-lg"
    >
      <template #main>
        <rapids-section />
        <comments-section />
      </template>
    </layout>
  </div>
</template>
<script>

import { LoadingBlock } from '@/app/global/components'
import { Layout } from '@/app/global/layout'
import {
  SideBar,
  BetaBox,
  RapidsSection,
  CommentsSection,
  RiverDescription
} from './components'

export default {
  name: 'MainTab',
  components: {
    SideBar,
    RapidsSection,
    CommentsSection,
    BetaBox,
    RiverDescription,
    LoadingBlock,
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
}
</style>
