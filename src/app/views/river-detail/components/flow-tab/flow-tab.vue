<template>
  <div class="flow-tab">
    <layout
        name="layout-full-width"
        class="mb-lg"
    >
      <template #main>
        <template v-if="gaugesLoading">
          <utility-block
              class="mb-lg"
              state="loading"
              text="loading gauges..."
          />
        </template>
        <template v-else-if="gaugeCorrelations && gaugeCorrelations.length">
          <div class="mb-lg">
            <hr>
            <h2 class="mb-spacing-md">
              Gauge Summary
            </h2>
            <div v-if="editMode">
              <cv-button
                  class="mb-spacing-md"
                  size="small"
                  @click.exact="$router.replace(`/river-detail/${$route.params.id}/edit-flows`)"
              >Edit Gauges</cv-button>
            </div>

            <div v-for="(gauge,index) in gaugeCorrelations" :key="`corr-${index}`">
              <h4 v-if="gauge.isPrimary">Primary Reporting</h4>
              <div :class="[{'selected':activeGaugeIndex===index},getClass(gauge)]" class="gauge-grid" @click.stop='setActive(index)'>
                <div class="gauge-name">{{ gauge.gaugeInfo.name }}</div>
                <div class='gauge-reading-header header'>Reading</div>
                <div class="gauge-range-header header">Range</div>
                <div class="gauge-class-header header">
                  <!-- need this header to space the two rows properly, but only want to show it if data is actually there -->
                  <template v-if="adjustedReachDifficulty(gauge)">
                    Difficulty at this level
                  </template>
                </div>
                <div v-if="gauge.status" :class="`gauge-reading background`">
                  {{ gauge.status.latestReading.value }} {{ correlationMetrics[gauge.status.metric].unit }}
                  @ {{ formatDate(new Date(gauge.status.latestReading.dateTime)) }}
                </div>
                <div v-if="gauge.correlationDetails" class="gauge-range">
                  {{ gauge.correlationDetails.beginLowRunnable }} - {{ gauge.correlationDetails.endHighRunnable }}
                  {{ correlationMetrics[gauge.correlationDetails.metric].unit }}
                </div>
                <div v-if="adjustedReachDifficulty(gauge)" class="gauge-class">
                  <cv-tag kind="cool-gray" :label="adjustedReachDifficulty(gauge)" />
                </div>
                <div v-if="activeGaugeIndex === index" class="gauge-chart-container background">
                  <layout
                      name="layout-two-thirds"
                      class="mb-lg background"
                  >
                    <template #main>
                      <template v-if="gauge.loading">
                        <utility-block
                            class="mb-lg"
                            state="content"
                            title="loading..."
                            text="loading gauge readings..."
                        />
                      </template>
                      <template v-else-if="gauge.readings && gauge.readings.length">
                        <div
                            v-if="viewMode === 'chart'"
                            style="max-width: 100%; "
                            class="mb-spacing-sm"
                        >
                          <div>
                            <flow-chart
                                :gauge-correlation="gauge"
                                :readings="gauge.readings"
                                :timeScale="gauge.historyTimeScale"
                                class="mb-md"
                                :metric="correlationMetrics[gauge.requestedMetric]"
                                :current="gauge.status.latestReading.value"

                            />
                            <flow-stats
                                :readings="gauge.readings"
                                :loading="gauge.loading"
                                :metric="correlationMetrics[gauge.requestedMetric]"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <gauge-readings :readings="gauge.readings" :metric="correlationMetrics[gauge.requestedMetric]" />
                        </div>
                      </template>
                      <template v-else>
                        <utility-block
                            class="mb-lg"
                            state="content"
                            title="No results"
                            text="no gauge readings for your chosen parameters, please try again"
                        />
                      </template>
                    </template>

                    <template #sidebar>
                      <template v-if="gaugesLoading">
                        <cv-skeleton-text headline/>
                      </template>
                      <template v-else>
                        <div v-if="gauge.gaugeInfo.externalSourceLinks" class="gauge-links">
                          <h6 class="mb-spacing-sm">View at source:</h6>
                          <cv-link v-if="gauge.gaugeInfo.externalSourceLinks.sourceLink" 
                            :href="gauge.gaugeInfo.externalSourceLinks.sourceLink.url"
                            target="_blank">
                            <cv-button
                              class="mb-spacing-sm"
                              kind="tertiary"
                              size="small"
                              >{{ gauge.gaugeInfo.externalSourceLinks.sourceLink.text }}
                            </cv-button>
                          </cv-link>
                          <cv-link v-if="gauge.gaugeInfo.externalSourceLinks.secondaryLink"
                            :href="gauge.gaugeInfo.externalSourceLinks.secondaryLink.url"
                            target="_blank">
                            <cv-button
                              class="mb-spacing-sm"
                              kind="tertiary"
                              size="small"
                              >{{ gauge.gaugeInfo.externalSourceLinks.secondaryLink.text }}
                            </cv-button>
                          </cv-link>
                        </div>
                        <level-legend
                            v-if="correlationMatchesMetric(gauge)"
                            :gaugeCorrelation="gauge"
                        />

                        <div class="gauge-chart-controls">
                          <cv-dropdown
                            v-model="gauge.historyTimeScale"
                            label="Data Timespan"
                            class="mb-spacing-md"
                            @change="getReadings(gauge)"
                          >
                            <cv-dropdown-item value="24h">
                              Day
                            </cv-dropdown-item>
                            <cv-dropdown-item value="week">
                              Week
                            </cv-dropdown-item> <!-- TODO: request API respond to "month"? -->
                            <cv-dropdown-item value="year">
                              Year
                            </cv-dropdown-item>
                          </cv-dropdown>

                          <cv-dropdown
                            v-model="gauge.requestedMetric"
                            label="Data Metric"
                            class="mb-spacing-md"
                            @change="getReadings(gauge)">
                            <cv-dropdown-item v-for="metric, key in correlationMetrics" :key="`metric-${key}`" :value="key">
                              {{ metric.name }}
                            </cv-dropdown-item>
                          </cv-dropdown>

                          <cv-radio-button
                              v-model="viewMode"
                              name="chart"
                              label="Chart"
                              value="chart"
                          />
                          <cv-radio-button
                              v-model="viewMode"
                              name="table"
                              label="Table"
                              value="table"
                          />
                        </div>

                      </template>
                    </template>
                  </layout>
                </div>
              </div>
            </div>
          </div>

        </template>
        <template v-else>
          <div>
            <cv-button v-if="editMode"
              class="cv-button mb-spacing-md bx--btn bx--btn--tertiary bx--btn--sm"
              target="_blank"
              @click.exact="$router.replace(`/river-detail/${$route.params.id}/edit-flows`)"
            >Edit Gauges</cv-button>
          </div>

          <utility-block
              state="content"
              title="No Gauges"
              text="this reach doesn't have any associated gauges"
          />
        </template>
      </template>
    </layout>


    <layout v-if="releaseView === 1" name="layout-full-width">
      <template #main>
        <releases-table @calendarView="calendarView"/>
      </template>
    </layout>
    <layout v-if="releaseView === 2" name="layout-full-width">
      <template #main>
        <releases-calendar @tableView="tableView"/>
      </template>
    </layout>
  </div>
</template>

<script>
import {
  FlowChart,
  FlowStats,
  GaugeReadings,
  LevelLegend,
  ReleasesCalendar,
  ReleasesTable
} from './components'
import { GageChartConfig } from './utils/gage-chart-config'
import { Layout } from '@/app/global/layout'
import { mapState } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { checkWindow, reachApiHelper } from '@/app/global/mixins'

import { gaugeClient } from '@/app/services'

const flowviewCalendar = 2
const flowviewTable = 1

export default {
  name: 'flow-tab',
  components: {
    FlowChart,
    GaugeReadings,
    Layout,
    UtilityBlock,
    LevelLegend,
    FlowStats,
    ReleasesTable,
    ReleasesCalendar
  },
  mixins: [GageChartConfig, checkWindow, reachApiHelper],
  props: {
    reachDetail: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    activeGaugeIndex: 0,
    selectedTimespan: 'h:mm a',
    viewMode: 'chart',
    releaseView: 1,
    gaugeCorrelations: [],
    gaugesLoading: false
  }),
  computed: {
    ...mapState({
      river: state => state.RiverDetail.data,
      editMode: state => state.Global.editMode,
    }),
    reachId () {
      return this.$route.params.id
    },
  }
  ,
  watch: {
    reachDetail: {
      immediate: true,
      async handler(reachDetail) {
        this.gaugesLoading = true;
        let correlations = [];
        if (reachDetail?.detail?.correlations) {
          correlations = reachDetail?.detail?.correlations.map(c => {
            return {
              ...c,
              requestedMetric: c.correlationDetails?.metric,
              historyTimeScale: 'week',
              readings: [],
              loading: true
            };
          }).sort((a,b) => b.isPrimary - a.isPrimary);
        }

        this.gaugeCorrelations = correlations;
        this.gaugesLoading = false;

        this.gaugeCorrelations.forEach(this.getReadings);
      }
    },
  },
  methods: {
    getClass (gauge) {
      const status = gauge.status?.status;
      if (status === "below-recommended") {
        return ('too-lo')
      } else if (status === "low-runnable") {
        return ('lo')
      } else if (status === "medium-runnable") {
        return ('med')
      } else if (status === "high-runnable") {
        return ('hi')
      } else if (status === "above-recommended") {
        return ('too-hi')
      }
    },
    correlationMatchesMetric(gauge) {
     return gauge && gauge.correlationDetails &&
        gauge.correlationDetails.metric === gauge.requestedMetric;
    },
    async getReadings(gauge) {
      gauge.loading = true;
      gauge.readings = await gaugeClient.gaugeReadingsHistory.query({
        desiredMetric: gauge.requestedMetric || this.correlationMetrics.cfs.key,
        timePeriod: gauge.historyTimeScale || '24h',
        gaugeSource: gauge.gaugeInfo.gaugeSource,
        gaugeSourceIdentifier: gauge.gaugeInfo.gaugeSourceIdentifier
      });
      gauge.loading = false;
    },
    setActive (index) {
      this.activeGaugeIndex = index;
    },
    calendarView () {
      this.releaseView = flowviewCalendar
    },
    tableView () {
      this.releaseView = flowviewTable
    }
  },
}
</script>

<style lang="scss">
.bx--radio-button-wrapper:not(:last-of-type) {
  // carbon defaults this to 1 rem, which causes
  // the radio buttons to be offset in our use
  margin-right: 0;
}

.gauge-grid {
  padding-left: .75em;
  padding-right: .75em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 1em;
  cursor: pointer;

  .gauge-name {
    font-size: x-large;
  }

  .gauge-name,
  .header {
    font-weight: bolder;
  }

  .gauge-name,
  .gauge-meta,
  .gauge-chart-container,
  .range-comment {
    grid-column: 1/4;
  }

  &.selected {
    border: darkgreen thin solid;
    margin-bottom: .5em;
    margin-top: .5em;
  }

  &.too-lo {
    border-left: $flow-low 1em solid;
  }

  &.too-hi {
    border-left: $flow-high 1em solid;
  }

  &.lo {
    border-left: $low-runnable 1em solid;
  }

  &.med {
    border-left: $med-runnable 1em solid;
  }

  &.hi {
    border-left: $high-runnable 1em solid;
  }
}
</style>
