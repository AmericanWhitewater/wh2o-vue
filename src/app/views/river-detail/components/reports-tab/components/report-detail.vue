<template>
  <utility-block v-if="loading || !report" state="loading" />
  <div v-else class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <report-header :report="report" @clickedEdit="resetCache" />
      </div>
    </div>
    <div class="bx--row mt-lg mb-lg">
      <div class="bx--col-sm-12 bx--col-md">
        <div class="bx--data-table-container mb-spacing-md">
          <table class="bx--data-table bx--data-table--zebra">
            <tbody>
              <tr>
                <td>Reporter</td>
                <td>{{ report.user.name || "n/a" }}</td>
              </tr>
              <tr v-if="report.reading">
                <td>Flow</td>
                <td>
                  {{ gaugeReading(report) }}
                  <template v-if="report.gauge && report.gauge.name">
                    at
                    <router-link
                      v-if="report.gauge && report.gauge.name"
                      :to="`/gage-detail/${report.gauge.id}`"
                    >
                      {{ report.gauge.name }}
                    </router-link>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="report-detail" v-html="report.detail" />
      </div>
      <div class="bx--col-sm-12 bx--col-md">
        <report-image-gallery :images="reportPhotos" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ReportHeader from "./report-header";
import ReportImageGallery from "./report-image-gallery";
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
    ReportImageGallery,
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
    }),
    reportId() {
      return this.$route.params.reportId;
    },
    // in the gallery tab, the images are retrieved with post data inside them
    // it's the inverse here, so we're modifying to match the image-detail component
    // to match the structure
    reportPhotos() {
      return this.report?.photos?.map((p) => {
        return {
          ...p,
          post: {
            reading: this.report.reading,
            gauge: this.report.gauge,
            metric: this.report.metric,
          },
        };
      });
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
  methods: {
    resetCache() {
      delete reportsCache[this.report.id];
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
