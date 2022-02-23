<template>
  <cv-modal
    ref="modalWrapper"
    size="medium"
    @primary-click="_confirm()"
    @modal-hidden="_cancel()"
    @modal-shown="setModalOffset"
  >
    <template slot="title">
      <h2>Assign gallery image to trip report</h2>
    </template>
    <template slot="content">
      <p class="bx--type-caption">
        This is meant as a tool for cleaning up orphaned photos. If you're
        adding new photos to a report, you should do it in the report interface!
      </p>
      <cv-select
        v-model="selectedReport"
        label="Choose a trip report"
        class="mb-spacing-md"
      >
        <cv-select-option value="">None</cv-select-option>
        <cv-select-option
          v-for="(g, index) in availableReports"
          :key="index"
          :value="g.id"
          >{{ reportDisplayName(g) }}
        </cv-select-option>
      </cv-select>
    </template>
    <template slot="secondary-button"> Cancel </template>
    <template slot="primary-button"> OK </template>
  </cv-modal>
</template>

<script>
import {
  shadowDomFixedHeightOffset,
  objectPermissionsHelpersMixin,
  formatDate,
} from "@/app/global/mixins";
import { mapState } from "vuex";

// modal open/close modelled on https://stackabuse.com/how-to-create-a-confirmation-dialogue-in-vue-js/
export default {
  name: "assign-to-report-modal",
  mixins: [
    shadowDomFixedHeightOffset,
    objectPermissionsHelpersMixin,
    formatDate,
  ],
  data: () => ({
    resolvePromise: undefined,
    rejectPromise: undefined,
    selectedReport: null,
  }),
  computed: {
    ...mapState({
      reports: (state) => state.RiverReports.data,
    }),
    // filter reports for the ones that the user has permissions to edit
    availableReports() {
      return this.reports?.filter((x) => this.canEdit(x));
    },
  },
  methods: {
    reportDisplayName(report) {
      return `${report.title} - ${report.user?.name} - ${this.formatDate(
        report.post_date
      )}`;
    },
    show() {
      this.$refs.modalWrapper.show();

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    _confirm() {
      // return selected image
      this.resolvePromise(this.selectedReport);
      this.$refs.modalWrapper.hide();
    },
    _cancel() {
      this.resolvePromise(false);
    },
  },
};
</script>
