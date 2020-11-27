<template>
  <div class="report-detail">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <header v-if="loading && !data" class="bx--tile">
            <div>
              <cv-skeleton-text />
              <cv-skeleton-text heading />
              <cv-breadcrumb-skeleton no-trailing-slash />
            </div>
          </header>
          <header v-else-if="data" class="bx--tile pt-spacing-md">
            <div class="">
              <h4>
                {{ formatDate(data.post_date) }}
              </h4>
              <h1 class="mb-spacing-md">
                {{ data.title || "Untitled Report" }}
              </h1>
              <cv-breadcrumb no-trailing-slash>
                <cv-breadcrumb-item>
                  <cv-link to="/trip-reports"> Trip Reports </cv-link>
                </cv-breadcrumb-item>
                <cv-breadcrumb-item>
                  <cv-link href="#0"> Report Detail </cv-link>
                </cv-breadcrumb-item>
              </cv-breadcrumb>
            </div>
            <div v-if="user && user.uid === data.user.uid">
              <cv-button
                size="small"
                @click.exact="
                  $store.dispatch('Global/toggleEditMode', !editMode)
                "
              >
                Edit
              </cv-button>
              <cv-button
                size="small"
                kind="danger"
                @click.exact="confirmDeleteModalVisible = true"
                @keydown.enter="confirmDeleteModalVisible = true"
              >
                Delete
              </cv-button>
            </div>
          </header>
          <header v-else class="bx--tile">
            <div>
              <h4>Error</h4>
              <h1 class="mb-spacing-md">Something went wrong</h1>
            </div>
          </header>
          <utility-block
            text="No geospatial data available"
            state="content"
            theme="dark"
          />
        </div>
      </div>
      <div class="bx--row mt-lg mb-lg">
        <div class="bx--col">
          <p v-if="data">
            {{ data.detail || "Detail Unavailable" }}
          </p>
        </div>
        <div class="bx--col">
          <div class="bx--data-table-container">
            <table class="bx--data-table bx--data-table--zebra">
              <tbody>
                <tr>
                  <td>Reporter</td>
                  <td v-if="data && data.user">{{ data.user.uname }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <confirm-delete-modal
      v-if="data"
      :visible="confirmDeleteModalVisible"
      :resourceName="data.id"
      @delete:confirmed="handleDelete()"
    />
  </div>
</template>
<script>
import { UtilityBlock, ConfirmDeleteModal } from "@/app/global/components";
import { deletePost } from "@/app/services";
import { mapState } from "vuex";
export default {
  name: "report-detail",
  components: {
    UtilityBlock,
    ConfirmDeleteModal,
  },
  data: () => ({
    confirmDeleteModalVisible: false,
    deleteLoading: false,
  }),
  computed: {
    ...mapState({
      data: (state) => state.ReportDetail.data,
      loading: (state) => state.ReportDetail.loading,
      refId: (state) => state.ReportDetail.refId,
      editMode: (state) => state.Global.editMode,
      user: (state) => state.User.data,
    }),
    reportId() {
      return this.$route.params.id;
    },
  },
  methods: {
    async handleDelete() {
      try {
        this.deleteLoading = false;
        const result = await deletePost(this.reportId);

        if (!result.errors) {
          this.$store.dispatch("Global/sendToast", {
            kind: "success",
            title: "Success",
            subtitle: "Report Deleted.",
          });
          this.$store.dispatch("TripReports/getProperty");
          this.$router.push("/trip-reports");
          this.confirmDeleteModalVisible = false;
        }
      } catch (error) {
        this.$store.dispatch("Global/sendToast", {
          kind: "error",
          title: "Error",
          subtitle: "Something went wrong.",
        });
      } finally {
        this.deleteLoading = false;
      }
    },
  },
  created() {
    if (!this.data || this.reportId !== this.refId) {
      this.$store.dispatch("ReportDetail/setRefId", this.reportId);
      this.$store.dispatch("ReportDetail/getProperty", this.reportId);
    }
  },
};
</script>