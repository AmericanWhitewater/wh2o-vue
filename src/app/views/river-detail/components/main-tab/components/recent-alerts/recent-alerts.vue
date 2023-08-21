<template>
  <aside
    v-if="loading || anythingPresent"
    v-view.once="loadData"
    class="mb-lg"
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
         <sidebar-documents
          v-if="loading || (documents && documents.length)"
        />
      </div>
    </cv-tile>
  </aside>
</template>
<script>
import { mapState } from 'vuex'
import { SidebarAlerts, SidebarArticles, SidebarProjects, SidebarDocuments } from './components'
export default {
  name: 'recent-alerts',
  components: {
    SidebarAlerts,
    SidebarArticles,
    SidebarProjects,
    SidebarDocuments
  },
  computed: {
    ...mapState({
      loading: state => state.RiverAlerts.loading,
      alerts: state => state.RiverAlerts.data,
      articles: state => state.RiverArticles.data,
      projects: state => state.RiverProjects.data
    }),
    documents() {
      if(this.$store.getters){
        return this.$store.getters['RiverLinker/documents']
      } else {
        return []
      }
    },
    anythingPresent () {
      return (this.alerts && this.alerts.length) || (this.articles && this.articles.length) || (this.projects && this.projects.length)|| (this.documents && this.documents.length)
    }
  },
  methods: {
    loadData () {
      this.$store.dispatch('RiverAlerts/getProperty', this.$route.params.id)
      this.$store.dispatch('RiverArticles/getProperty', this.$route.params.id)
      this.$store.dispatch('RiverProjects/getProperty', this.$route.params.id)
      this.$store.dispatch('RiverLinker/getProperty', this.$route.params.id)
    }
  }
}
</script>
