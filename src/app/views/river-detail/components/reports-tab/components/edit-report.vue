<template>
  <utility-block v-if="loading || !report" state="loading" />
  <div v-else>
    <hr>
    <h2 class="mb-spacing-md">Trip Reports</h2>
    <cv-breadcrumb no-trailing-slash>
      <cv-breadcrumb-item>
        <cv-link :to="{ name: 'reports-tab' }"> Trip Reports </cv-link>
      </cv-breadcrumb-item>
      <cv-breadcrumb-item>
        <cv-link href=""> Editing {{ report.id }} </cv-link>
      </cv-breadcrumb-item>
    </cv-breadcrumb>
    <hr>

    <report-form :report="report" />
  </div>
</template>

<script>
import { ReportForm } from "./";
import { getReport } from "@/app/services";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";

export default {
  name: "edit-report",
  components: {
    ReportForm,
    UtilityBlock,
  },
  data: () => ({
    report: null,
    loading: true,
  }),
  computed: {
    reportId() {
      return this.$route.params.reportId;
    },
  },
  watch: {
    report(newVal) {
      if (newVal) {
        this.loading = false;
      }
    },
    // TODO: refactor so that report-detail and this use state to share
    // cached report details
    reportId: {
      immediate: true,
      handler: async function (newVal) {
        this.report = await getReport(newVal);
        // new photos are added at the top for ease of use, so we want
        // this order to be created_at DESC, the inverse of when it's displayed
        this.report.photos.sort((a,b) => (new Date(b.created_at) - new Date(a.created_at)));

      },
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
