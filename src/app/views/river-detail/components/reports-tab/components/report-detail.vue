<template>
  <utility-block v-if="loading && !report" state="loading" />
  <div v-else class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <header class="bx--tile pt-spacing-md">
          <div class="">
            <h4>
              {{ formatDate(report.post_date) }}
            </h4>
            <h1 class="mb-spacing-md">
              {{ report.title || "Untitled Report" }}
            </h1>
            <cv-breadcrumb no-trailing-slash>
              <cv-breadcrumb-item>
                <cv-link :to="{ name: 'reports-tab' }"> Trip Reports </cv-link>
              </cv-breadcrumb-item>
              <cv-breadcrumb-item>
                <cv-link href="#">
                  {{ report.id }}
                </cv-link>
              </cv-breadcrumb-item>
            </cv-breadcrumb>
          </div>
          <div>
            <cv-button
              v-if="canEdit(report)"
              size="small"
              @keydown.enter="$refs.postUpdateModal.open()"
              @click.exact="$refs.postUpdateModal.open()"
            >
              Edit
            </cv-button>
            <cv-button
              v-if="canDelete(report)"
              size="small"
              kind="danger"
              @click.exact="confirmDeleteModalVisible = true"
              @keydown.enter="confirmDeleteModalVisible = true"
            >
              Delete
            </cv-button>
          </div>
        </header>
      </div>
    </div>
    <div class="bx--row mt-lg mb-lg">
      <div class="bx--col">
        <p class="mb-md" v-text="report ? report.detail : ''" />
        <div class="bx--data-table-container mb-spacing-md">
          <table class="bx--data-table bx--data-table--zebra">
            <tbody>
              <tr>
                <td>Reporter</td>
                <td>{{ report.user.uname || "n/a" }}</td>
              </tr>
              <tr>
                <td>Gauge</td>
                <td>
                  <router-link
                    v-if="report.gauge && report.gauge.name"
                    :to="`/gage-detail/${report.gauge.id}`"
                  >
                    {{ report.gauge.name }}
                  </router-link>
                  <template v-if="!report.gauge"> n/a </template>
                </td>
              </tr>
              <tr>
                <td>Reading</td>
                <td>{{ report.reading || "n/a" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bx--col">
        <!-- images -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { objectPermissionsHelpersMixin } from "@/app/global/mixins";
export default {
  name: "report-detail",
  components: {},
  mixins: [objectPermissionsHelpersMixin],
  props: {},
  data: () => ({}),
  computed: {
    ...mapState({
      reports: (state) => state.RiverReports.data,
      user: (state) => state.User.data,
      editMode: (state) => state.Global.editMode,
      loading: (state) => state.RiverReports.loading,
    }),
    report() {
      return this.reports.find(
        (report) => report.id === this.$route.params.reportId
      );
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
