<template>
  <div class="gage-chart-controls">
    <hr>
    <h2 class="mb-spacing-md">
      active gage
    </h2>
    <cv-dropdown
      v-model="selectedSettings.gage_name"
      :label="gageLabel"
      :disabled="oneGauge"
      class="mb-spacing-md"
      @change="fetchReadings"
    >
      <cv-dropdown-item
        v-for="(g, index) in gauges"
        :key="index"
        :value="g.gauge_id.toString()"
      >
        {{ g.gauge_name }}
      </cv-dropdown-item>
    </cv-dropdown>
    <cv-dropdown
      v-model="gageHttpConfig.metric_id"
      label="Metric"
      class="mb-spacing-md"
      @change="fetchReadings"
    >
      <cv-dropdown-item
        v-for="(g, index) in metrics"
        :key="index"
        :value="g.id.toString()"
      >
        {{ g.unit }}
      </cv-dropdown-item>
    </cv-dropdown>
    <cv-dropdown
      v-model="selectedSettings.timeScale"
      label="Timespan"
      :disabled="loading"
      class="mb-spacing-md"
      @change="fetchReadings"
    >
      <cv-dropdown-item value="day">
        Day
      </cv-dropdown-item>
      <cv-dropdown-item value="week">
        Week
      </cv-dropdown-item>
      <cv-dropdown-item value="month">
        Month
      </cv-dropdown-item>
      <cv-dropdown-item value="year">
        Year
      </cv-dropdown-item>
    </cv-dropdown>
  </div>
</template>
<script>
import moment from 'moment'
import { metricsActions, readingsActions } from '../../shared/state'
import { mapState } from 'vuex'

export default {
  name: 'GageChartControls',
  data: () => ({
    gageLabel: '',
    selectedSettings: {
      label: 'Reach Gages',
      gage_name: '',
      timeScale: 'day'
    },
    gageHttpConfig: {
      gauge_id: null,
      metric_id: '2',
      timeStart: null,
      timeEnd: null,
      resolution: null
    }
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.gageReadingsData.loading,
      error: state => state.riverDetailState.gageReadingsData.error,
      data: state => state.riverDetailState.gageReadingsData.data,
      metrics: state => state.riverDetailState.gageMetricsData.data,
      river: state => state.riverDetailState.riverDetailData.data
    })
  },
  watch: {
    gageHttpConfig () {
      this.fetchReadings()
    }
  },
  methods: {
    setTimeScale () {
      let start
      switch (this.selectedSettings.timeScale) {
        case 'year':
          this.$emit('timescaleChange', 'MMM YYYY')
          this.gageHttpConfig.resolution = 60 * 60 * 730
          this.gageHttpConfig.timeScale = 'year'
          start = moment()
            .subtract(1, 'years')
            .unix()
          break
        case 'month':
          this.$emit('timescaleChange', 'll')
          this.gageHttpConfig.resolution = 60 * 60 * 24
          start = moment()
            .subtract(1, 'month')
            .unix()
          break

        case 'week':
          this.$emit('timescaleChange', 'll')
          this.gageHttpConfig.resolution = 60 * 60 * 12
          this.gageHttpConfig.timeStart = moment()
            .subtract(1, 'weeks')
            .unix()
          break
        case 'day':
          this.$emit('timescaleChange', 'h:mm a')
          this.gageHttpConfig.resolution = 1
          start = moment()
            .subtract(1, 'days')
            .unix()
          break
        default:
          this.gageHttpConfig.resolution = 1
          start = moment()
            .subtract(1, 'days')
            .unix()
          break
      }
      this.gageHttpConfig.timeStart = Math.floor(start)
      this.gageHttpConfig.timeEnd = Math.floor(moment().unix())
      return start
    },
    fetchMetrics () {
      this.$store.dispatch(metricsActions.FETCH_GAGE_METRICS)
    },
    async fetchReadings () {
      await this.setTimeScale()
      this.$store.dispatch(
        readingsActions.FETCH_GAGE_READINGS_DATA,
        this.gageHttpConfig
      )
    }
  },
  created () {
    this.fetchMetrics()
  },
  beforeMount () {
    this.fetchReadings()
  }
}
</script>
