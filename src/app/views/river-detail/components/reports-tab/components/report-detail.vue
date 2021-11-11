<template>
  <utility-block v-if="loading || !report" state="loading" />
  <div v-else class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <report-header :report="report" />
      </div>
    </div>
    <div class="bx--row mt-lg mb-lg">
      <div class="bx--col-sm-12 bx--col-md">
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
                <td>{{ gaugeReading(report) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bx--col-sm-12 bx--col-md">
        <image-gallery :images="report.photos" gallery-type="report-detail" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ImageGallery from "@/app/views/river-detail/components/image-gallery/image-gallery.vue";
import ReportHeader from "./report-header";
import {
  objectPermissionsHelpersMixin,
  gaugeHelpers,
} from "@/app/global/mixins";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
import { getReport } from "@/app/services";

// caching reports in the component so that users don't have to wait for another
// request if they browse back to a report they just looked at
const reportsCache = {};

export default {
  name: "report-detail",
  components: {
    ImageGallery,
    ReportHeader,
    UtilityBlock,
  },
  mixins: [objectPermissionsHelpersMixin, gaugeHelpers],
  props: {},
  data: () => ({
    report: null,
    loading: true,
  }),
  computed: {
    ...mapState({
      user: (state) => state.User.data,
      editMode: (state) => state.Global.editMode,
    }),
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
    reportId: {
      immediate: true,
      handler: async function (newVal) {
        if (reportsCache[newVal]) {
          this.report = reportsCache[newVal];
        } else {
          this.report = await getReport(this.reportId);
          reportsCache[this.report.id] = this.report;
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
