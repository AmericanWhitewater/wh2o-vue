<template>
  <div class="flow-tab">
    <layout
      name="layout-two-thirds"
      class="mb-lg"
    >
      <template #main>
        <template v-if="gages && gages.length > 0">
          <template v-if="loading">
            <loading-block />
          </template>
          <template v-if="!loading && error">
            <error-block />
          </template>
          <template v-if="!loading && chartData">
            <template v-if="viewMode === 'chart'">
              <template v-if="readings.length > 0">
                <div style="max-width:100%;overflow-x:scroll">
                  <div :style="chartSize">
                    <gage-chart
                      :chart-data="chartData"
                      :height="chartHeight"
                      :options="chartConfig"
                    />
                  </div>
                </div>
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
        <template v-if="gages && gages.length > 0">
          <div class="flow-stats bx--row mb-spacing-md">
            <div class="bx--col">
              <h6 class="mb-spacing-2xs">
                Avg
              </h6>
              <h3 v-if="!loading">
                {{ flowStats ? flowStats.avg : 'n/a' }}
              </h3>
              <cv-skeleton-text
                v-if="loading"
                headline
              />
            </div>
            <div class="bx--col">
              <h6 class="mb-spacing-2xs">
                High
              </h6>
              <h3 v-if="!loading">
                {{ flowStats ? flowStats.max : 'n/a' }}
              </h3>
              <cv-skeleton-text
                v-if="loading"
                headline
              />
            </div>
            <div class="bx--col">
              <h6 class="mb-spacing-2xs">
                Low
              </h6>
              <h3 v-if="!loading">
                {{ flowStats ? flowStats.min : 'n/a' }}
              </h3>
              <cv-skeleton-text
                v-if="loading"
                headline
              />
            </div>
          </div>
          <GageChartControls
            @viewModeChange="viewMode = $event"
            @timescaleChange="setTimescale"
          />
        </template>
        <template v-else>
          <hr>
          <p class="mb-spacing-md">
            If you know this reach has a gage, you can search from our list of preregistered gages or add a new gage to the database. You can also create a virtual gage, { some copy on what that means }...
          </p>
          <cv-button
            :disabled="!user"
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
import { checkWindow } from '@/app/global/mixins'

/**
 * @todo this component is getting pretty wild. consider composition API.
 *
 */
export default {
  name: 'flow-tab',
  components: {
    ErrorBlock,
    GageChart,
    GageChartControls,
    GageReadings,
    Layout,
    LoadingBlock
  },
  mixins: [GageChartConfig, checkWindow],
  data: () => ({
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
      user: state => state.userState.userData.data,
      readings: state => state.riverDetailState.gageReadingsData.data,
      loading: state => state.riverDetailState.gageReadingsData.loading,
      error: state => state.riverDetailState.gageReadingsData.error,
      gages: state => state.riverDetailState.reachGagesData.data
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
          formattedData.datasets[0].data.push(Math.floor(data[i].reading))
          formattedData.labels.push(moment(data[i].updated).format(this.selectedTimespan))
        }
        return formattedData
      }
      return null
    },
    /**
     * @todo calculate trending +/-
     */
    flowStats () {
      if (this.readings && this.readings.length > 0) {
        const readings = []
        let readingsSum = 0

        for (let i = 0; i < this.readings.length; i++) {
          readings.push(parseInt(this.readings[i].reading, 10))
          readingsSum = readingsSum + parseInt(this.readings[i].reading, 10)
        }

        return ({
          min: Math.min(...readings),
          max: Math.max(...readings),
          avg: Math.floor(readingsSum / this.readings.length)
        })
      }
      return null
    },
    chartSize () {
      if (this.windowWidth > this.breakpoints.md) {
        return null
      } else {
        return 'position:relative;width:' + (this.breakpoints.sm * 2) + 'px'
      }
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
