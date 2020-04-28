<template>
  <div class="gage-chart-controls">
    <template v-if="metrics">
      <cv-dropdown
        v-if="gages"
        v-model="formData.gauge_id"
        :placeholder="$titleCase(formData.gauge_name)"
        :label="gages.length === 1 ? 'Gage' : 'Gages'"
        class="mb-spacing-md"
        :disabled="gages.length === 1"
        @change="fetchReadings"
      >
        <cv-dropdown-item
          v-for="(g, index) in gages"
          :key="index"
          :value="g.gauge.id"
        >
          {{ $titleCase(g.gauge.name) }}
        </cv-dropdown-item>
      </cv-dropdown>

      <cv-dropdown
        v-model="formData.timeScale"
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

      <cv-dropdown
        v-if="availableMetrics"
        v-model="formData.metric_id"
        label="Metric"
        :disabled="availableMetrics.length === 1"
        class="mb-spacing-md"
        @change="fetchReadings"
      >
        <cv-dropdown-item
          v-for="(g, index) in availableMetrics"
          :key="index"
          :value="g.id"
        >
          {{ g.label }}
        </cv-dropdown-item>
      </cv-dropdown>
      <cv-toolbar>
        <cv-overflow-menu class="bx--toolbar-action">
          <template slot="trigger">
            <Settings32 class="bx--overflow-menu__icon bx--toolbar-settings-icon" />
          </template>
          <cv-toolbar-title title="View Mode" />
          <cv-toolbar-option>
            <cv-radio-button
              v-model="viewMode"
              name="chart"
              label="Chart"
              value="chart"
            />
          </cv-toolbar-option>
          <cv-toolbar-option>
            <cv-radio-button
              v-model="viewMode"
              name="table"
              label="Table"
              value="table"
            />
          </cv-toolbar-option>
        </cv-overflow-menu>
      </cv-toolbar>
    </template>
  </div>
</template>
<script>
import moment from 'moment'
import { metricsActions, readingsActions } from '../../shared/state'
import { mapState } from 'vuex'
/**
 * @todo create globally availble Title Case filter. Will help with better
 * blog post titles and gage name typesetting
 *
 */
export default {
  name: 'gage-chart-controls',
  data: () => ({
    /**
     * toggles the flow chart view or table view
     * @values chart, table
     * @todo need to make UI elements for this more noticable
     *
     */
    viewMode: 'chart',
    /**
     * Values needed to make flow reading request
     *
     */
    formData: {
      gauge_id: '',
      gauge_name: '',
      metric_id: '2',
      timeStart: null,
      timeEnd: null,
      resolution: null,
      timeScale: 'day'
    }
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.gageReadingsData.loading,
      error: state => state.riverDetailState.gageReadingsData.error,
      data: state => state.riverDetailState.gageReadingsData.data,
      metrics: state => state.riverDetailState.gageMetricsData.data,
      river: state => state.riverDetailState.riverDetailData.data,
      gages: state => state.riverDetailState.reachGagesData.data
    }),
    /**
     * @description look through the readings response to find
     * the metrics/units we have available, then show them as options
     * in metrics dropdown
     *
     * ie. only cfs, or ft, or both or any
     *
     */
    availableMetrics () {
      if (this.metrics && this.data) {
        const data = []
        for (let i = 0; i < this.data.length; i++) {
          if (!data.includes(this.data[i].metric)) {
            const input = {}
            input.id = this.data[i].metric.toString()
            /**
             * @todo get unit title/label in api response
             *
             */
            input.label = this.data[i].metric === 2 ? 'cfs' : 'n/a'
            if (!data.find(m => m.id === input.id)) {
              data.push(input)
            }
          }
        }
        return data
      }
      return null
    }
  },
  watch: {
    /**
     * @event viewModeChange tells $parent that the user has changed view mode
     * @values chart, table
     *
     */
    viewMode (mode) {
      this.$emit('viewModeChange', mode)
    }
  },
  methods: {
    /**
     * @returns {number} the starting point for the chart xaxis formatted by moment
     * @event timescaleChange sends date format required by chartjs and moment so flow chart knows to rerender
     * @todo Unsure about how/why resolution calculated this way.
     *
     */
    setTimeScale () {
      let start
      switch (this.formData.timeScale) {
        case 'year':
          this.$emit('timescaleChange', 'MMM YYYY')
          this.formData.resolution = 60 * 60 * 730
          this.formData.timeScale = 'year'
          start = moment()
            .subtract(1, 'year')
            .unix()
          break
        case 'month':
          this.$emit('timescaleChange', 'll')
          this.formData.resolution = 60 * 60 * 24
          this.formData.timeScale = 'month'
          start = moment()
            .subtract(1, 'month')
            .unix()
          break

        case 'week':
          this.$emit('timescaleChange', 'll')
          this.formData.resolution = 60 * 60 * 12
          this.formData.timeScale = 'week'
          start = moment()
            .subtract(1, 'week')
            .unix()
          break
        case 'day':
          this.$emit('timescaleChange', 'h:mm a')
          this.formData.timeScale = 'day'
          this.formData.resolution = 1
          start = moment()
            .subtract(1, 'day')
            .unix()
          break
        default:
          this.formData.timeScale = 'day'
          this.formData.resolution = 1
          start = moment()
            .subtract(1, 'day')
            .unix()
          break
      }
      this.formData.timeStart = Math.floor(start)
      this.formData.timeEnd = Math.floor(moment(new Date()).unix())
    },
    fetchMetrics () {
      this.$store.dispatch(metricsActions.FETCH_GAGE_METRICS, this.$route.params.id)
    },
    async fetchReadings () {
      await this.setTimeScale()
      this.$store.dispatch(
        readingsActions.FETCH_GAGE_READINGS_DATA,
        this.formData
      )
    }
  },
  created () {
    /**
     * @temp load first gage id from reach gages list to get flow readings
     * @todo if the reach does not have any gages, display empty content block
     *
     */
    if (this.gages) {
      this.formData.gauge_id = this.gages[0].gauge.id
    }
    this.fetchMetrics()
  },
  beforeMount () {
    this.fetchReadings()
  }
}
</script>
