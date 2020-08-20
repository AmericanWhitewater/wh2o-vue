<template>
  <div class="main-tab">
    <layout
      name="layout-full-width"
      class="mb-lg"
    >
      <template #main>
        <beta-box />
        <recent-alerts />
        <river-description />
        <rapids-section />
        <comments-section />
      </template>
    </layout>
  </div>
</template>
<script>
import { Layout } from '@/app/global/layout'
import {
  RecentAlerts,
  RapidsSection,
  RiverDescription,
  CommentsSection,
  BetaBox
} from './components'

export default {
  name: 'main-tab',
  components: {
    BetaBox,
    RecentAlerts,
    RapidsSection,
    CommentsSection,
    RiverDescription,
    Layout
  }
}
</script>
