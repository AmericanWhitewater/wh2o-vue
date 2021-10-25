<template>
  <div class="reports-tab">
    <layout name="layout-full-width" class="mb-lg">
      <template #main>
        <template v-if="reportDetail || editingReport || newReport">
          <router-view />
        </template>
        <template v-else>
          <hr>
          <div class="bx--row">
            <div class="bx--col mb-spacing-md"><h2>Trip Reports</h2></div>
            <div class="bx--col">
              <cv-button
                v-if="user"
                size="small"
                @click.exact="$router.push({ name: 'new-report' })"
              >
                + New Trip Report
              </cv-button>
            </div>
          </div>
          <template v-if="loading && !reports">
            <utility-block
              class="reports-loading"
              state="loading"
              text="loading reports"
            />
          </template>
          <template v-else-if="reports">
            <report-preview
              v-for="(item, index) in reports"
              :key="index"
              :report="item"
            />
          </template>
        </template>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
import { objectPermissionsHelpersMixin } from "@/app/global/mixins";
import { Layout } from "@/app/global/layout";
import { ReportPreview } from "./components";
export default {
  name: "reports-tab",
  components: {
    Layout,
    UtilityBlock,
    ReportPreview,
  },
  mixins: [objectPermissionsHelpersMixin],
  computed: {
    ...mapState({
      user: (state) => state.User.data,
      editMode: (state) => state.Global.editMode,
      reports: (state) => state.RiverReports.data,
      loading: (state) => state.RiverReports.loading,
    }),
    // TODO: this is a bit brittle, would be good to come up with better strategy
    reportDetail() {
      return this.$route.name === "report-detail";
    },
    newReport() {
      return this.$route.name === "new-report";
    },
    editingReport() {
      return this.$route.name === "edit-report";
    },
  },
  methods: {},
  created() {
    if (!this.reports) {
      this.$store.dispatch("RiverReports/getProperty", this.$route.params.id);
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
