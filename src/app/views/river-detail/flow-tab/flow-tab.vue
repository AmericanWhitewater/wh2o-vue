<template>
  <div class="flow-tab">
    <template v-if="!gageDetailView">
      <div class="bx--row mb-md">
        <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-8">
          <h2
            class="mb-spacing-sm"
            @click="alert('router push to gage detail')"
          >
            Active Gage
          </h2>
        </div>
      </div>
      <div class="bx--row mb-md">
        <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-10">
          <template v-if="!readingsLoading">
            <gage-chart
              :chart-data="formattedData"
              :options="chartConfig"
              :height="chartHeight"
            />
          </template>
          <template v-else>
            <skeleton-block height="400" />
          </template>
        </div>
        <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-2 bx--offset-lg-1">
          <gage-chart-controls />
        </div>
      </div>
      <div class="bx--row mb-md">
        <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-8">
          <gage-readings />
        </div>
      </div>
    </template>
    <template v-else>
      <!-- gage detail router tbd -->
      <router-view />
    </template>
  </div>
</template>
<script>
import { EventBus } from '@/app/global/services/event-bus/event-bus'
import { SkeletonBlock } from '@/app/global/components'
import { GageReadings, GageChartControls, GageChart } from './components'
import { GageChartConfig } from './utils/gage-chart-config'
import { gageHttpConfig } from '../shared/mixins'

export default {
  name: 'FlowTab',
  components: {
    GageReadings,
    GageChartControls,
    GageChart,
    SkeletonBlock
  },
  mixins: [GageChartConfig, gageHttpConfig],
  data: () => ({
    gageDetailView: false,
    formattedData: {
      datasets: [
        {
          data: []
        }
      ],
      labels: []
    }
  }),
  computed: {
    storePath () {
      return this.$store.state.riverDetailState
    },
    initialLoading () {
      if (
        this.storePath.gageMetricsData.loading &&
        this.storePath.gageReadingsData.loading
      ) {
        return true
      }
      return false
    },
    readingsLoading () {
      return this.storePath.gageReadingsData.loading
    },
    routeId () {
      return this.$route.params.id
    },
    river () {
      return this.storePath.riverDetailData.data
    },
    gaugeSummary () {
      return this.river.guagesummary
    },
    readingsData () {
      return this.storePath.gageReadingsData.data
    },
    mappedReadings () {
      // NOTE: strip out just the gage reading
      let mappedReadings
      if (this.readingsData) {
        mappedReadings = this.readingsData.map(a => a.reading)
      }
      return mappedReadings
    },
    xAxisLabels () {
      // pull out the time the gauge was updated
      let gageUpdateTime
      if (this.readingsData) {
        gageUpdateTime = this.readingsData.map(a => a.updated)
      }
      return gageUpdateTime
    }
  },
  watch: {
    readingsData () {
      // if the readings change, reformat data for chart
      this.formatChartData()
    }
  },
  mounted () {
    EventBus.$on('gage-detail-toggle', payload => {
      this.gageDetailView = payload
    })
  },
  methods: {
    formatChartData () {
      // reset
      this.formattedData.labels = []
      this.formattedData.datasets[0].data = []
      // add new values
      this.formattedData.labels = this.formattedData.labels.concat(
        this.xAxisLabels
      )
      this.formattedData.datasets[0].data = this.formattedData.datasets[0].data.concat(
        this.mappedReadings
      )
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
// temp
h2 {
  margin-bottom: 1.5rem;
}
</style>
