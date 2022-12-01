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
              <template v-if="user">
                <cv-button
                  size="small"
                  @click.exact="$router.push({ name: 'new-report' })"
                >
                  + New Trip Report
                </cv-button>
              </template>
              <template v-else>
                <login-button buttonText="Log in to add a report" />
              </template>
            </div>
          </div>
          <template v-if="loading">
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

            <div class="bx--row">
              <div class="bx--col">
                <table-pagination
                  v-if="pagination"
                  :number-of-items="pagination.total"
                  :page="pagination.currentPage"
                  :perPage="pagination.perPage"
                  @change="changePage"
                />
              </div>
            </div>
          </template>
        </template>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { LoginButton, TablePagination, UtilityBlock } from "@/app/global/components";
import { objectPermissionsHelpersMixin } from "@/app/global/mixins";
import { Layout } from "@/app/global/layout";
import { ReportPreview } from "./components";
export default {
  name: "reports-tab",
  components: {
    Layout,
    LoginButton,
    UtilityBlock,
    TablePagination,
    ReportPreview,
  },
  mixins: [objectPermissionsHelpersMixin],
  computed: {
    ...mapState({
      user: (state) => state.User.data,
      editMode: (state) => state.Global.editMode,
      reports: (state) => state.RiverReports.data,
      pagination: (state) => state.RiverReports.pagination,
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
  methods: {
    changePage(newPaginator) {
      this.$store.dispatch("RiverReports/getProperty", {
        id: this.$route.params.id,
        perPage: newPaginator.length,
        page: newPaginator.page,
      });
    },
  },
  created() {
    if (!this.reports) {
      this.$store.dispatch("RiverReports/getProperty", {
        id: this.$route.params.id,
      });
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
