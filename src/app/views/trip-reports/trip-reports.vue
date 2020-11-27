<template>
  <div class="trip-reports">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <header class="bx--tile pt-spacing-md">
            <div class="">
              <h1 class="mb-spacing-md">Trip Reports</h1>
              <cv-breadcrumb no-trailing-slash>
                <cv-breadcrumb-item>
                  <cv-link to="/"> Home </cv-link>
                </cv-breadcrumb-item>
                <cv-breadcrumb-item>
                  <cv-link href="#0"> Trip Reports </cv-link>
                </cv-breadcrumb-item>
              </cv-breadcrumb>
            </div>
            <div v-if="user">
              <cv-button
                size="small"
                @click.exact="postUpdateModalVisible = true"
                @keydown.enter="postUpdateModalVisible = true"
              >
                Submit Report
              </cv-button>
            </div>
          </header>
          <utility-block
            text="image unavailable"
            state="content"
            theme="dark"
          />
          <page-description
            description="Reports give the public a chance to report on river conditions throughout the country as well as log the history of a river."
          />
          <div class="bx--data-table-container">
            <table class="bx--data-table bx--data-table--zebra">
              <thead>
                <tr>
                  <th>When</th>
                  <th>River/Gauge</th>
                  <th>Subject</th>
                  <th>Level</th>
                  <th>Reporter</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="loading">
                  <tr>
                    <td colspan="5">
                      <utility-block state="loading" />
                    </td>
                  </tr>
                </template>
                <template v-else-if="data">
                  <tr
                    v-for="(report, index) in data"
                    :key="index"
                    @click="$router.push(`/report-detail/${report.id}`)"
                  >
                    <td>
                      {{ formatDate(report.post_date, "LL") }}
                    </td>
                    <td>
                      {{ report.reach_id || "n/a" }}
                    </td>
                    <td>
                      {{ report.detail || "n/a" }}
                    </td>
                    <td>
                      {{ report.reading || "n/a" }}
                    </td>
                    <td>
                      {{ report.user.uname }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <post-update-modal
      :visible="postUpdateModalVisible"
      kind="JOURNAL"
      size="large"
      title="New Report"
      @update:submitted="postUpdateModalVisible = false"
      @update:success="handleSuccess"
      @update:cancelled="postUpdateModalVisible = false"
    >
      <template #form-fields="formData">
        <cv-text-input
          v-model="formData.formData.post.title"
          label="Title"
          theme="light"
          class="mb-spacing-md"
        />
        <cv-text-area
          v-model="formData.formData.post.detail"
          label="Description"
          theme="light"
          class="mb-spacing-md"
        />
      </template>
    </post-update-modal>
  </div>
</template>
<script>
import {
  UtilityBlock,
  PageDescription,
  PostUpdateModal,
} from "@/app/global/components";
import { mapState, mapActions } from "vuex";
export default {
  name: "trip-reports",
  components: {
    UtilityBlock,
    PageDescription,
    PostUpdateModal,
  },
  data: () => ({
    postUpdateModalVisible: false,
  }),
  computed: {
    ...mapState({
      data: (state) => state.TripReports.data,
      loading: (state) => state.TripReports.loading,
      user: state => state.User.data
    }),
  },
  methods: {
    ...mapActions({
      load: "TripReports/getProperty",
    }),
    handleSuccess(newReportId) {
      this.load();
      this.postUpdateModalVisible = false;
      this.$router.push(`/report-detail/${newReportId}`);
    },
  },
  created() {
    if (!this.data) {
      this.load();
    }
  },
};
</script>
