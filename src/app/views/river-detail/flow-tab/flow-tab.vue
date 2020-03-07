<template>
  <div class="flow-tab">
    <layout
      name="layout-two-thirds"
      class="mb-lg"
    >
      <template #main>
        <template v-if="mockGages && mockGages.length > 0">
          <template v-if="loading">
            <loading-block />
          </template>
          <template v-if="!loading && error">
            <error-block />
          </template>
          <template v-if="!loading && chartData">
            <template v-if="viewMode === 'chart'">
              <template v-if="readings.length > 0">
                <gage-chart
                  :chart-data="chartData"
                  :height="chartHeight"
                  :options="chartConfig"
                />
              </template>
              <template v-else>
                <error-block
                  hide-icon
                  title="No Results"
                  text="please try again"
                />
              </template>
            </template>
            <template v-else>
              <GageReadings />
            </template>
          </template>
        </template>
        <template v-else>
          <error-block
            hide-icon
            title="No Gages"
            text="This river doesn't have any associated gages"
          />
        </template>
      </template>
      <template #sidebar>
        <template v-if="mockGages && mockGages.length > 0">
          <GageChartControls
            @viewModeChange="viewMode = $event"
            @timescaleChange="setTimescale"
          />
        </template>
        <template v-else>
          <hr>
          <h2 class="mb-spacing-md">
            Add Gage
          </h2>
          <p class="mb-spacing-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <cv-button
            disabled
            size="small"
          >
            Action
          </cv-button>
        </template>
      </template>
    </layout>
  </div>
</template>

<script>
import moment from 'moment'
import { GageChart, GageReadings, GageChartControls } from './components'
import { GageChartConfig } from './utils/gage-chart-config'
import { Layout } from '@/app/global/layout'
import { mapState } from 'vuex'
import { readingsActions } from '../shared/state'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'

/**
 * @todo this component is getting pretty wild. consider composition API.
 *
 */
export default {
  name: 'FlowTab',
  components: {
    ErrorBlock,
    GageChart,
    GageChartControls,
    GageReadings,
    Layout,
    LoadingBlock
  },
  mixins: [GageChartConfig],
  data: () => ({
    /**
     * @temp use these until we get a list of gages from graphql
     * @todo create getter for gages?
     *
     */
    mockGages: [
      {
        gauge_name: 'POTOMAC RIVER NEAR WASH, DC LITTLE FALLS PUMP STA USA-MRY',
        gauge_id: '569'
      },
      {
        gauge_name: 'S F SOUTH BRANCH POTOMAC RIVER NR MOOREFIELD, WV USA-WVR',
        gauge_id: '550'
      },
      {
        gauge_name: 'GAULEY RIVER NEAR CRAIGSVILLE, WV USA-WVR',
        gauge_id: '1433'
      }
    ],
    /**
     * default timespan to day format
     */
    selectedTimespan: 'h:mm a',
    /**
     * default view = chart
     */
    viewMode: 'chart'
  }),
  computed: {
    ...mapState({
      readings: state => state.riverDetailState.gageReadingsData.data,
      loading: state => state.riverDetailState.gageReadingsData.loading,
      error: state => state.riverDetailState.gageReadingsData.error
    }),
    /**
     * vue-chartjs requires data to be formatted this way
     * @reference https://vue-chartjs.org/guide/#example
     *
     */
    chartData () {
      const data = this.readings
      if (data) {
        const formattedData = {
          labels: [],
          datasets: [{
            label: 'label',
            data: []
          }]
        }
        for (let i = 0; i < data.length; i++) {
          formattedData.datasets[0].data.push(data[i].reading)
          formattedData.labels.push(moment(data[i].updated).format(this.selectedTimespan))
        }
        return formattedData
      }
      return null
    }
  },
  watch: {
    /**
     * @description If the user changes selected timespan, refresh chart data
     *
     */
    selectedTimespan () {
      this.fetchReadings()
    }
  },
  methods: {
    fetchReadings () {
      this.$store.dispatch(readingsActions.FETCH_GAGE_READINGS_DATA)
    },
    /**
     * Sets the timescale for the chart x-axis. Called on GageChartControls $emit('timescaleChange', format).
     * @param {string} format receives date format required by chartjs and moment so flow chart knows to rerender
     *
     */
    setTimescale (format) {
      if (format && this.chartConfig.scales.xAxes[0].time) {
        this.selectedTimespan = format
        this.chartConfig.scales.xAxes[0].time.unit = format
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flow-tab {
  padding-top: $spacing-xl;
  h2 {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  canvas {
    height: 350px;
    width: 100%;
    background-color: $ui-03;
  }
}
</style>
