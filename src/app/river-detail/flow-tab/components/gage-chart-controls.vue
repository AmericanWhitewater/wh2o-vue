<template>
  <div class>
    <cv-dropdown
      :label="gageLabel"
      v-model="selectedSettings.gage_name"
      :disabled="oneGauge"
      @change="fetchReadings"
      class="mb-spacing-md"
    >
      <cv-dropdown-item
        v-for="(g, index) in gauges"
        :key="index"
        :value="g.gauge_id.toString()"
        >{{ g.gauge_name }}</cv-dropdown-item
      >
    </cv-dropdown>
    <cv-dropdown
      v-model="gageHttpConfig.metric_id"
      label="Metric"
      @change="fetchReadings"
      class="mb-spacing-md"
    >
      <cv-dropdown-item
        v-for="(g, index) in metrics"
        :key="index"
        :value="g.id.toString()"
        >{{ g.unit }}</cv-dropdown-item
      >
    </cv-dropdown>
    <cv-dropdown
      label="Timespan"
      v-model="selectedSettings.timeScale"
      @change="fetchReadings"
      :disabled="loading"
      class="mb-spacing-md"
    >
      <cv-dropdown-item value="day">Day</cv-dropdown-item>
      <cv-dropdown-item value="week">Week</cv-dropdown-item>
      <cv-dropdown-item value="month">Month</cv-dropdown-item>
      <cv-dropdown-item value="year">Year</cv-dropdown-item>
    </cv-dropdown>
  </div>
</template>
<script>
import { metricsActions, readingsActions } from "../../shared/state";
import { gageHttpConfig } from "../../shared/mixins";
import moment from "moment";
export default {
  name: "GageChartControls",
  mixins: [gageHttpConfig],
  data: () => {
    return {
      gageLabel: "",
      selectedSettings: {
        label: "Reach Gages",
        gage_name: "",
        timeScale: "day"
      }
    };
  },
  computed: {
    storePath() {
      return this.$store.state.riverDetailState;
    },
    loading() {
      return this.storePath.gageReadingsData.loading;
    },
    river() {
      return this.storePath.riverDetailData.data.CContainerViewJSON_view
        .CRiverMainGadgetJSON_main;
    },
    gauges() {
      return this.river.gauges;
    },
    oneGauge() {
      if (this.gauges.length === 1) {
        return true;
      } else {
        return false;
      }
    },
    metrics() {
      // TODO: only show metrics that the reach has readings for
      const metrics = this.$store.state.riverDetailState.gageMetricsData.data;
      return metrics;
    }
  },
  methods: {
    setTimeScale() {
      let start;
      switch (this.selectedSettings.timeScale) {
        case "year":
          this.gageHttpConfig.resolution = 60 * 60 * 730;
          this.gageHttpConfig.timeScale = "year";
          start = moment()
            .subtract(1, "years")
            .unix();
          break;
        case "month":
          this.gageHttpConfig.resolution = 60 * 60 * 24;
          start = moment()
            .subtract(1, "month")
            .unix();
          break;

        case "week":
          this.gageHttpConfig.resolution = 60 * 60 * 12;
          this.gageHttpConfig.timeStart = moment()
            .subtract(1, "weeks")
            .unix();
          break;
        case "day":
        default:
          this.gageHttpConfig.resolution = 1;
          start = moment()
            .subtract(1, "days")
            .unix();
          break;
      }
      this.gageHttpConfig.timeStart = Math.floor(start);
      this.gageHttpConfig.timeEnd = Math.floor(moment().unix());
      return start;
    },
    fetchMetrics() {
      if (!this.storePath.gageMetricsData.data) {
        // this should only run once if the active gage has not changed
        this.$store.dispatch(metricsActions.FETCH_GAGE_METRICS);
      }
    },
    async fetchReadings() {
      await this.setTimeScale();
      this.$store.dispatch(
        readingsActions.FETCH_GAGE_READINGS_DATA,
        this.gageHttpConfig
      );
    }
  },
  created() {
    if (this.gauges.length > 1) {
      this.gageLabel = "Reach Gages";
    } else {
      this.gageLabel = "Reach Gage";
    }
    this.gageHttpConfig.gauge_id = this.gauges[0].gauge_id;
    this.gageHttpConfig.metric_id = this.gauges[0].gauge_metric;
    this.fetchMetrics();
  },
  beforeMount() {
    this.fetchReadings();
  }
};
</script>
<style lang="scss" scoped>
.bx--form-item {
  // global scss styles and scoped styles are behaving strangely...
  margin-bottom: 0.5rem;
}
</style>
