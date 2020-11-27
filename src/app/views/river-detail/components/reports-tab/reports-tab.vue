<template>
  <div class='reports-tab mb-xl'>
    <h1>Reports</h1>
    <post-update-modal />
    <template v-if="loading">
      loading
    </template>
    <template v-else-if="data">
      <report v-for="(item, index) in data" :key="index" :data="item" />
    </template>
    <template v-else>
      something went wrong
    </template>
  </div>
</template>
<script>
import {mapState} from "vuex"
import Report from "./components/report"
import {PostUpdateModal} from "@/app/global/components"
export default {
  name: "reports-tab",
  components: {
    Report,
    PostUpdateModal
  },
  computed: {
    ...mapState({
      data: state => state.RiverReports.data,
      loading: state => state.RiverReports.loading,
      refId: state => state.RiverReports.refId,
    }),
    reachId() {
      return this.$route.params.id
    }
  },
  created() {
    if(!this.data || (this.refId !== this.reachId)) {
      this.$store.dispatch('RiverReports/getProperty', this.reachId)
      this.$store.dispatch('RiverReports/setRefId', this.reachId)
    }
  }
};
</script>
