<template>
  <aside
    v-view.once="loadData"
    class="main-tab-sidebar pb-lg"
  >
    <cv-tile
      ref="contentArea"
      :class="[{ sticky: sticky }, 'content-area bx--row']"
    >
      <div class="bx--col">
        <sidebar-alerts @alerts:change="isSticky" />
        <sidebar-articles @articles:change="isSticky" />
      </div>
    </cv-tile>
  </aside>
</template>
<script>
import { SidebarAlerts, SidebarArticles } from './components'
import { alertsActions, newsTabActions } from '@/app/views/river-detail/shared/state'
export default {
  name: 'side-bar',
  components: {
    SidebarAlerts,
    SidebarArticles
  },
  data: () => ({
    sticky: true
  }),
  methods: {
    isSticky () {
      if (this.$refs.contentArea.clientHeight > 800) {
        this.sticky = false
      } else {
        this.sticky = true
      }
    },
    loadData () {
      this.$store.dispatch(
        alertsActions.FETCH_ALERTS_DATA,
        this.$route.params.id
      )
      this.$store.dispatch(
        newsTabActions.FETCH_NEWS_TAB_DATA,
        this.$route.params.id
      )
    }
  }
}
</script>
