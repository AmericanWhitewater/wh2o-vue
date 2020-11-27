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
            <div>
              <cv-button
                v-if="canEdit(data)"
                size="small"
                @keydown.enter="$refs.postUpdateModal.open()"
                @click.exact="$refs.postUpdateModal.open()"
              >
                Edit
              </cv-button>
              <cv-button
                v-if="canDelete(data)"
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
          <page-description
            :loading="loading"
            :description="data ? data.detail : ''"
          />
        </div>
      </div>
      <div class="bx--row mt-lg mb-lg">
        <div class="bx--col">
          <template v-if="loading && !data">
            <utility-block state="loading" />
          </template>
          <template v-else-if="data">
            <image-gallery :images="data.photos" />
          </template>
        </div>
        <div class="bx--col">
          <div class="bx--data-table-container mb-spacing-md">
            <table class="bx--data-table bx--data-table--zebra">
              <tbody>
                <tr>
                  <td>Reporter</td>
                  <td v-if="loading && !data"><cv-skeleton-text /></td>
                  <td v-else-if="data">{{ data.user.uname || "n/a" }}</td>
                </tr>
                <tr>
                  <td>Gauge</td>
                  <td v-if="loading && !data"><cv-skeleton-text /></td>
                  <td v-else-if="data">
                    <router-link
                      v-if="data.gauge && data.gauge.name"
                      :to="`/gage-detail/${data.gauge.id}`"
                    >
                      {{ data.gauge.name }}
                    </router-link>
                    <template v-if="!data.gauge"> n/a </template>
                  </td>
                </tr>
                <tr>
                  <td>Reading</td>
                  <td v-if="loading && !data"><cv-skeleton-text /></td>
                  <td v-else-if="data">{{ data.reading || "n/a" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <cv-button v-if="data && data.reach_id"
                      @click.exact="$router.push(`/river-detail/${data.reach_id}`)"
                     @keydown.enter="$router.push(`/river-detail/${data.reach_id}`)">
            View Reach
          </cv-button>
        </div>
      </div>
    </div>
    <confirm-delete-modal
      v-if="data"
      :visible="confirmDeleteModalVisible"
      :resourceName="data.id"
      @delete:confirmed="handleDelete()"
    />
    <post-update-modal
      v-if="data"
      ref="postUpdateModal"
      title="New Trip Report"
      kind="JOURNAL"
      :post="data"
      @update:success="load(reportId)"
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
import { objectPermissionsHelpersMixin } from "@/app/global/mixins";
import ImageGallery from "@/app/views/river-detail/components/image-gallery/image-gallery.vue";
import {
  UtilityBlock,
  ConfirmDeleteModal,
  PageDescription,
  PostUpdateModal,
} from "@/app/global/components";
import { deletePost } from "@/app/services";
import { mapState, mapActions } from "vuex";
export default {
  name: "report-detail",
  components: {
    UtilityBlock,
    ConfirmDeleteModal,
    ImageGallery,
    PageDescription,
    PostUpdateModal,
  },
  mixins: [objectPermissionsHelpersMixin],
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
    ...mapActions({
      load: "ReportDetail/getProperty",
      setRefId: "ReportDetail/setRefId",
    }),
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
      this.setRefId(this.reportId);
      this.load(this.reportId);
    }
  },
};
</script>