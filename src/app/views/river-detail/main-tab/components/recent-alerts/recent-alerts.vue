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
import { alertsActions, newsTabActions, projectsActions } from '@/app/views/river-detail/shared/state'
export default {
  name: 'recent-alerts',
  components: {
    SidebarAlerts,
    SidebarArticles,
    SidebarProjects
  },
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.alertsData.loading,
      alerts: state => state.riverDetailState.alertsData.data,
      articles: state => state.riverDetailState.newsTabData.data,
      projects: state => state.riverDetailState.projectsData.data
    }),
    anythingPresent () {
      return (this.alerts && this.alerts.length) || (this.articles && this.articles.length) || (this.projects && this.projects.length)
    }
  },
  methods: {
    loadData () {
      this.$store.dispatch(
        alertsActions.FETCH_ALERTS_DATA,
        this.$route.params.id
      )
      this.$store.dispatch(
        newsTabActions.FETCH_NEWS_TAB_DATA,
        this.$route.params.id
      )
      this.$store.dispatch(
        projectsActions.FETCH_PROJECTS_DATA,
        this.$route.params.id
      )
    }
  }
}
</script>
