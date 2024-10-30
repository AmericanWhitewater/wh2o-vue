<template>
  <div class="main-tab">
    <layout
      name="layout-full-width"
      class="mb-lg"
    >
      <template #main>
        <beta-box :reachDetail="reachDetail" />
        <recent-alerts />
        <river-description />
        <rapids-section />
        <reports-section />
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
  ReportsSection,
  BetaBox
} from './components'

export default {
  name: 'main-tab',
  components: {
    BetaBox,
    RecentAlerts,
    RapidsSection,
    ReportsSection,
    RiverDescription,
    Layout
  },
  props: {
    reachDetail: {
      type: Object,
      required: false
    }
  }
}
</script>
