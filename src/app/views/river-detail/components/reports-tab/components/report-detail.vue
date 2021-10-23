<template>
  <utility-block v-if="loading || !report" state="loading" />
  <div v-else class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <report-header :report="report" />
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
        <image-gallery :images="report.photos" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ImageGallery from "@/app/views/river-detail/components/image-gallery/image-gallery.vue";
import ReportHeader from "./report-header";
import { objectPermissionsHelpersMixin } from "@/app/global/mixins";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";

export default {
  name: "report-detail",
  components: {
    ImageGallery,
    ReportHeader,
    UtilityBlock,
  },
  mixins: [objectPermissionsHelpersMixin],
  props: {},
  data: () => ({}),
  computed: {
    ...mapState({
      user: (state) => state.User.data,
      editMode: (state) => state.Global.editMode,
      loading: (state) => state.RiverReports.loading,
    }),
    reportId() {
      return this.$route.params.reportId;
    },
    report() {
      return this.$store.getters["RiverReports/getReportById"](this.reportId);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
