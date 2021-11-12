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
                <td>{{ report.user.uname || "n/a" }}</td>
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
        <image-gallery :images="reportPhotos" gallery-type="report-detail" />
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
    }),
    reportId() {
      return this.$route.params.reportId;
    },
    // in a workaround to deal with the relationship between posts and photos,
    // the image-gallery component takes photos that have a number of post attributes
    // augmented onto them. So we have to do that augmentation here.
    // in the main gallery, the service/state that retrieve the photos does that work
    // but here, the photos are coming back as part of the report object
    reportPhotos() {
      return this.report?.photos?.map((p) => {
        return {
          ...p,
          reading: this.report.reading,
          gauge: this.report.gauge,
          metric: this.report.metric,
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
