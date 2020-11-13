<template>
  <aside
    v-if="loading || anythingPresent"
    v-view.once="loadData"
  >
    <cv-tile
      ref="contentArea"
      class="content-area bx--row"
    >
      <div class="bx--col">
        <sidebar-alerts
          v-if="loading || (alerts && alerts.length)"
        />
        <sidebar-articles
          v-if="loading || (articles && articles.length)"
        />
        <sidebar-projects
          v-if="loading || (projects && projects.length)"
        />
      </div>
    </cv-tile>
  </aside>
</template>
<script>
import { mapState } from 'vuex'
import { SidebarAlerts, SidebarArticles, SidebarProjects } from './components'
import {fetchAlertsData, fetchNewsTabData, fetchReachProjectsData} from '@/app/views/river-detail/controllers'
export default {
  name: 'recent-alerts',
  components: {
    SidebarAlerts,
    SidebarArticles,
    SidebarProjects
  },
  computed: {
    ...mapState({
      loading: state => state.RiverAlerts.loading,
      alerts: state => state.RiverAlerts.data,
      articles: state => state.RiverNews.data,
      projects: state => state.RiverProjects.data
    }),
    anythingPresent () {
      return (this.alerts && this.alerts.length) || (this.articles && this.articles.length) || (this.projects && this.projects.length)
    }
  },
  methods: {
    loadData () {
      // [{
      //   module: 'RiverAlerts',
      //   method: fetchAlertsData,
      // }, {
      //   module: 'RiverNews',
      //   method: fetchNewsTabData
      // },
      // {
      //   module: 'RiverProjects',
      //   method: fetchReachProjectsData
      // }].forEach(item => {
      //   this.$store.dispatch(
      //     `${item.module}/getProperty`,
      //     {
      //       id:this.$route.params.id,
      //       method: item.method
      //     }
      //   )
      // })

      this.$store.dispatch('RiverAlerts/getProperty', this.$route.params.id)
      this.$store.dispatch('RiverNews/getProperty', this.$route.params.id)

    }
  }
}
</script>
