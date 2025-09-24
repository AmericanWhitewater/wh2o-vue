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
                <td>Gauge Reading</td>
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
              <tr v-if="report.observation">
                <td>Flow (<flow-range-help-modal short-prompt-text />)</td>
                <td>
                  {{ observationEnum[report.observation] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="report-detail user-generated-content" v-html="report.detail" />
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
import { FlowRangeHelpModal, UtilityBlock } from "@/app/global/components";
import { getReport } from "@/app/services";

import moment from "moment";

// caching reports in the component so that users don't have to wait for another
// request if they browse back to a report they just looked at
const reportsCache = {};

export default {
  name: "report-detail",
  components: {
    ReportImageGallery,
    ReportHeader,
    UtilityBlock,
    FlowRangeHelpModal,
  },
  mixins: [objectPermissionsHelpersMixin, gaugeHelpers],
  props: {},
  data: () => ({
    report: null,
    loading: true,
  }),
  metaInfo() {
    if (!this.report) return { title: 'American Whitewater' };
    const formattedDate = moment(this.report.post_date).format('MMM D, YYYY');
    return {
      title: `${this.report.title} - ${formattedDate} | American Whitewater`
    }
  },
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
          this.report.photos.sort((a,b) => (moment(a.created_at) - moment(b.created_at)));
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
