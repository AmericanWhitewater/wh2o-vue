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
