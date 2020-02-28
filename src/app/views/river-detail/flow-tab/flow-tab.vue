<template>
  <div class="flow-tab">
    <layout
      name="layout-two-thirds"
      class="mb-lg"
    >
      <template #main>
        <template v-if="loading">
          <loading-block />
        </template>
        <template v-if="!loading && error">
          <error-block />
        </template>
        <template v-if="!loading && chartData">
          <gage-chart
            :chart-data="chartData"
            :height="chartHeight"
          />
        </template>
      </template>
      <template #sidebar>
        <GageChartControls />
      </template>
    </layout>
    <layout name="layout-two-thirds">
      <template #main>
        <GageReadings />
      </template>
    </layout>
  </div>
</template>

<script>
import moment from 'moment'
import { GageChart, GageReadings, GageChartControls } from './components'
import { GageChartConfig } from './utils/gage-chart-config'
import { Layout } from '@/app/global/layout'
import { gageHttpConfig } from '../shared/mixins'
import { mapState } from 'vuex'
import { readingsActions } from '../shared/state'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'
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
  mixins: [GageChartConfig, gageHttpConfig],
  data: () => ({
    selectedTimespan: 'h:mm a'
  }),

  computed: {
    ...mapState({
      readings: state => state.riverDetailState.gageReadingsData.data,
      loading: state => state.riverDetailState.gageReadingsData.loading,
      error: state => state.riverDetailState.gageReadingsData.error
    }),

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
    selectedTimespan () {
      this.fetchReadings()
    }
  },
  methods: {
    fetchReadings () {
      this.$store.dispatch(readingsActions.FETCH_GAGE_READINGS_DATA)
    }
  },
  created () {
    this.chartConfig.scales.xAxes[0].time.unit = this.selectedTimespan
    this.fetchReadings()
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
// temp
h2 {
  margin-bottom: 1.5rem;
}
</style>
