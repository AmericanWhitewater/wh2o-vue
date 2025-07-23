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
          v-if="loading || (recentAlerts && recentAlerts.length)"
        />
        <sidebar-articles
          v-if="loading || (recentArticles && recentArticles.length)"
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
      documents: state => state.RiverDocuments.data,
      projects: state => state.RiverProjects.data
    }),
    anythingPresent () {
      return (this.recentAlerts && this.recentAlerts.length) || (this.recentArticles && this.recentArticles.length) || (this.projects && this.projects.length)|| (this.documents && this.documents.length)
    },
    recentArticles() {
      return this.articles?.filter(x => Date.parse(x.posted_date) >= this.yearsAgo(1));
    },
    recentAlerts() {
      return this.alerts?.filter(x => Date.parse(x.post_date) >= this.yearsAgo(2));
    },
  },
  methods: {
    loadData () {
      this.$store.dispatch('RiverAlerts/getProperty', this.$route.params.id)
      this.$store.dispatch('RiverArticles/getProperty', this.$route.params.id)
      this.$store.dispatch('RiverProjects/getProperty', this.$route.params.id)
      this.$store.dispatch('RiverLinker/getProperty', this.$route.params.id)
    },
    yearsAgo(yrs) {
      const d = new Date();
      d.setFullYear(d.getFullYear() - yrs);
      return d;
    }
  }
}
</script>
