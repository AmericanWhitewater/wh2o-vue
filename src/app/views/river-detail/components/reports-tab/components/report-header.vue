<template>
  <header class="bx--tile pt-spacing-md bx--row">
    <div class="bx--col-sm-12 bx--col-md-6">
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
    <div class="bx--col-sm-12 bx--col-md-2">
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
        @click.exact="triggerReportDelete"
        @keydown.enter="triggerReportDelete"
      >
        Delete
      </cv-button>
      <confirm-delete-modal ref="confirmDeleteModal" />
    </div>
  </header>
</template>
<script>
import { objectPermissionsHelpersMixin } from "@/app/global/mixins";
import { ConfirmDeleteModal } from "@/app/global/components";

export default {
  name: "report-header",
  components: {
    ConfirmDeleteModal,
  },
  mixins: [objectPermissionsHelpersMixin],
  props: {
    report: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async triggerReportDelete() {
      const ok = await this.$refs.confirmDeleteModal.show({
        title: "Delete Report",
        message: `Are you sure you want to delete "${
          this.report.title || "Untitled Report"
        }"?`,
      });
      if (ok) {
        this.$store.dispatch("RiverReports/deleteProperty", this.report.id);
        this.$router.push({ name: "reports-tab" });
      }
    },
  },
};
</script>