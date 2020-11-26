<template>
  <div class="gage-detail pb-lg">
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
          <header v-else-if="data" class="bx--tile">
            <div>
              <h4>
                {{ data.source }}
              </h4>
              <h1 class="mb-spacing-md" v-text="data.name" />
              <cv-breadcrumb no-trailing-slash>
                <cv-breadcrumb-item>
                  <cv-link to="/gages"> Gages List </cv-link>
                </cv-breadcrumb-item>
                <cv-breadcrumb-item>
                  <cv-link href="#0"> Gage Id: {{ data.id }} </cv-link>
                </cv-breadcrumb-item>
              </cv-breadcrumb>
            </div>
          </header>
          <header v-else class="bx--tile">
            <div>
              <h4>Error</h4>
              <h1 class="mb-spacing-md">Something went wrong</h1>
            </div>
          </header>
          <utility-block
            v-if="loading && !data"
            size="lg"
            state="loading"
            theme="dark"
            hide-text
          />
          <transition :name="transitionName" mode="out-in">
            <map-banner v-if="!loading && data" />
          </transition>
        </div>
      </div>
      <div class="bx--row mt-sm">
        <div class="bx--col">
          <template v-if="loading">
            <utility-block state="loading" />
          </template>
          <template v-else-if="data">
            <template v-if="readingsLoading">
              <utility-block state="loading" />
            </template>
            <template v-else-if="readings && metrics">
              <flow-chart :readings="readings" :gages="[data]" class="mb-md" />
            </template>
            <gage-chart-controls />
          </template>
        </div>
        <div class="bx--col">
          <div class="bx--data-table-container">
            <table class="bx--data-table bx--data-table--zebra">
              <tbody>
                <tr>
                  <td>Enabled</td>
                  <td v-if="!loading && data">
                    {{ data.enabled }}
                  </td>
                </tr>
                <tr>
                  <td>Source</td>
                  <td v-if="!loading && data">
                    {{ data.source }}
                  </td>
                </tr>
                <tr>
                  <td>State</td>
                  <td v-if="!loading && data">
                    {{ data.state }}
                  </td>
                </tr>
                <tr>
                  <td>Timezone</td>
                  <td v-if="!loading && data">
                    {{ data.timezone }}
                  </td>
                </tr>
                <tr>
                  <td>Latitude</td>
                  <td>
                    n/a
                  </td>
                </tr>
                <tr>
                  <td>Longitude</td>
                  <td>
                    n/a
                  </td>
                </tr>
                <tr>
                  <td>HUC</td>
                  <td v-if="!loading && data">
                    {{ data.huc }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MapBanner } from "@/app/views/river-detail/components";
import UtilityBlock from "@/app/global/components/utility-block/utility-block.vue";
import { mapState, mapActions } from "vuex";
import {GageChartControls, FlowChart} from "@/app/views/river-detail/components/flow-tab/components"
export default {
  name: "gage-detail",
  components: {
    UtilityBlock,
    MapBanner,
    GageChartControls,
    FlowChart
  },
  data: () => ({
    transitionName: "fade",
  }),
  computed: {
    ...mapState({
      data: (state) => state.GageDetail.data,
      loading: (state) => state.GageDetail.loading,
      error: (state) => state.GageDetail.error,
      refId: (state) => state.GageDetail.refId,
      readings: state => state.GageReadings.data,
      readingsLoading: state => state.GageReadings.loading,
      metrics: state => state.GageMetrics.data
    }),
    gageId() {
      return this.$route.params.id;
    }
  },
  methods: {
    ...mapActions({
      load: "GageDetail/getProperty",
      loadReadings: "GageReadings/getProperty",
      setRefId: "GageDetail/setRefId",
    }),
  },
  async created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;
      if (transitionName === "slide") {
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
        transitionName = toDepth < fromDepth ? "slide-left" : "slide-right";
      }

      this.transitionName = transitionName || "fade";

      next();
    });

    if (!this.data || this.refId !== this.gageId) {
      await this.load(this.gageId);
      this.setRefId(this.gageId);
    }
  },
};
</script>
