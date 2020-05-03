<template>
  <div class="flow-tab">
    <layout
      name="layout-two-thirds"
      class="mb-lg"
    >
      <template #main>
        <template v-if="loading && !gages">
          <utility-block
            height="500"
            state="loading"
            text="loading gages..."
          />
        </template>
        <template v-else-if="gages">
          <template v-if="gages && gages.length > 0">
            <template v-if="loading">
              <utility-block
                class="mb-md"
                height="600"
                state="loading"
                text="loading readings..."
              />
            </template>
            <template v-else-if="readings">
              <template v-if="viewMode === 'chart'">
                <template v-if="readings.length > 0">
                  <div style="max-width:100%;overflow-x:scroll">
                    <div :style="chartSize">
                      <FlowChart
                        class="mb-lg"
                        :gages="gages"
                        :readings="readings"
                      />
                      <LevelLegend />
                    </div>
                  </div>
                </template>
                <template v-else>
                  <utility-block
                    class="mb-md"
                    height="500"
                    state="content"
                    title="No Results"
                    text="please try again"
                  />
                </template>
              </template>
              <template v-else>
                <GageReadings />
              </template>
            </template>
            <template v-else />
          </template>
          <template v-else>
            <utility-block
              class="mb-md"
              height="500"
              title="No Gages"
              state="content"
              text="this reach doesn't have any associated gages"
            />
          </template>
        </template>
        <template v-else>
          <utility-block
            class="mb-md"
            height="500"
            state="error"
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
                {{ flowStats ? flowStats.avg : "n/a" }}
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
                {{ flowStats ? flowStats.max : "n/a" }}
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
                {{ flowStats ? flowStats.min : "n/a" }}
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
            @gage-change="setActiveGageId"
          />
        </template>
        <template v-else>
          <hr>
          <p class="mb-spacing-md">
            If you know this reach has a gage, you can search from our list of
            preregistered gages or add a new gage to the database. You can also
            create a virtual gage.
          </p>
          <cv-button size="small">
            Add Gage
          </cv-button>
        </template>
      </template>
    </layout>
    <layout
      name="layout-two-thirds"
      class="mb-lg"
    >
      <template #main>
        <div class="mb-lg">
          <hr>
          <h2 class="mb-spacing-md">
            Flow Range Description
          </h2>
          <div
            v-if="activeGage && activeGage.range_comment"
            class="gage-description"
            v-html="activeGage.range_comment"
          />
          <div
            v-else
            class="gage-description"
          >
            This gage does not have a description for the current flow range.
          </div>
        </div>
        <div class="mb-lg">
          <hr>
          <h2 class="mb-spacing-md">
            Gage Description
          </h2>
          <div
            v-if="activeGage && activeGage.gauge_comment"
            class="gage-description"
            v-html="activeGage.gauge_comment"
          />
          <div
            v-else
            class="gage-description"
          >
            This gage does not have a description.
          </div>
        </div>
      </template>
    </layout>
  </div>
</template>

<script>
import { FlowChart, GageReadings, GageChartControls, LevelLegend } from './components'
import { GageChartConfig } from './utils/gage-chart-config'
import { Layout } from '@/app/global/layout'
import { mapState } from 'vuex'
import { readingsActions, reachGagesActions } from '../shared/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { checkWindow } from '@/app/global/mixins'

/**
 * @todo this component is getting pretty wild. consider composition API.
 *
 */
export default {
  name: 'flow-tab',
  components: {
    FlowChart,
    GageChartControls,
    GageReadings,
    Layout,
    UtilityBlock,
    LevelLegend
  },
  mixins: [GageChartConfig, checkWindow],
  data: () => ({
    activeGageId: '',
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
      gages: state => state.riverDetailState.reachGagesData.data,
      gagesLoading: state => state.riverDetailState.reachGagesData.loading,
      gagesError: state => state.riverDetailState.reachGagesData.error
    }),
    riverId () {
      return this.$route.params.id
    },
    flowStats () {
      if (this.readings && this.readings.length > 0) {
        const readings = []
        let readingsSum = 0

        for (let i = 0; i < this.readings.length; i++) {
          readings.push(parseInt(this.readings[i].reading, 10))
          readingsSum = readingsSum + parseInt(this.readings[i].reading, 10)
        }

        return {
          min: Math.min(...readings),
          max: Math.max(...readings),
          avg: Math.floor(readingsSum / this.readings.length)
        }
      }
      return null
    },
    chartSize () {
      if (this.windowWidth > this.$options.breakpoints.md) {
        return null
      } else {
        return 'position:relative;width:' + this.$options.breakpoints.sm * 2 + 'px'
      }
    },
    activeGage () {
      return this.gages?.find(g => g.gauge.id === this.activeGageId)
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
    setActiveGageId (id) {
      this.activeGageId = id
    },
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
  },
  created () {
    this.$store.dispatch(reachGagesActions.FETCH_GAGES, this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.flow-tab {
  padding-top: $spacing-xl;

  canvas {
    height: 350px;
    width: 100%;
    background-color: $ui-03;
  }
  .gage-description {
    @include carbon--type-style('body-long-02')
  }
}
</style>
