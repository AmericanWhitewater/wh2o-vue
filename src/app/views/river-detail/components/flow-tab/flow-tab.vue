<template>
  <div class="flow-tab">
    <layout
        name="layout-full-width"
        class="mb-lg"
    >
      <template #main>
        <template v-if="gagesLoading">
          <utility-block
              class="mb-lg"
              state="loading"
              text="loading gages..."
          />
        </template>
        <template v-else-if="delays && delays.length">
          <div class="mb-lg">
            <hr>
            <h2 class="mb-spacing-md">
              Gage Summary
            </h2>
            <div v-if="editMode">
              <a
                  class="cv-button mb-spacing-md bx--btn bx--btn--tertiary bx--btn--sm"
                  :href="formatLinkUrl(`/content/StreamTeam/edit-correlations/?reach_id=${$route.params.id}`)"
                  target="_blank"
              >Edit Flows</a>
            </div>

            <div v-for="(delay,index) in delays" :key="`d${delay}`">
              <h4 v-if="index===0">Primary Reporting</h4>
              <h4 v-else>Backup #{{index}} if Primary doesn't update for {{ parseInt(delay / (60 * 60)).toFixed(1) }} hours </h4>
              <div v-for="gage in gagesWithGage.filter(x=>parseInt(x.delay_update)===parseInt(delay))"
                   :key="`${gage.gauge.id}-${gage.gauge_metric}`">
                <gage-summary
                    :selected="activeGage && activeMetric && activeGage.gauge && parseInt(activeGage.gauge.id)===parseInt(gage.gauge.id) "
                    :metrics="metrics" :gage="gage" @select="setActive(gage)">
                  <template #unselected>
                    <div v-if="gage.gauge_comment"><em>{{ gage.gauge_comment }}</em></div>
                  </template>

                  <layout
                      name="layout-two-thirds"
                      class="mb-lg"
                  >
                    <template #main>
                      <template v-if="loading">
                        <utility-block
                            class="mb-lg"
                            state="loading"
                            text="loading readings..."
                        />
                      </template>
                      <template v-else-if="readingsWithLast && readingsWithLast.length">
                        <div
                            v-if="viewMode === 'chart'"
                            style="max-width: 100%; "
                            class="mb-spacing-sm"
                        >
                          <div :style="chartSize">
                            <flow-chart
                                :gages="[gage]"
                                :readings="readingsWithLast"
                                :ranges="ranges"
                                class="mb-md"
                                :metric="activeMetric"
                                :metrics="metrics"
                                :current="lastReading || 0"

                            />
                            <flow-stats
                                :readings="readingsWithLast"
                                :loading="loading"
                                :current="lastReading || 0"
                                :metric="activeMetric"
                            />
                          </div>
                        </div>
                        <div v-else>
                          <gage-readings :metrics="metrics"/>
                        </div>
                      </template>
                      <template v-else>
                        <utility-block
                            class="mb-lg"
                            state="content"
                            title="No results"
                            text="no gage readings for your chosen parameters, please try again"
                        />
                      </template>

                    </template>
                    <template #sidebar>
                      <template v-if="gagesLoading">
                        <cv-skeleton-text headline/>
                      </template>
                      <template v-else-if="activeGage">
                        <h4
                            class="mb-spacing-sm"
                            v-text="$titleCase(activeGage.gauge.name)"
                        />
                        <div v-if="activeGage.gauge_comment"><em>{{ activeGage.gauge_comment }}</em></div>
                        <cv-button
                            class="mb-spacing-sm"
                            kind="tertiary"
                            size="small"
                            @click.exact="go(`/content/gauge/detail-new/${activeGage.gauge.id}`)"
                            @keydown.enter="go(`/content/gauge/detail-new/${activeGage.gauge.id}`)"
                        >
                          Gage Detail
                        </cv-button>
                        <level-legend
                            :gauge="activeGage.gauge"
                            :ranges="rangeForGageID(gage.gauge.id)"
                            :metric="activeMetric"
                        />
                        <gage-chart-controls
                            v-if="activeGage && activeGage.gauge && activeMetric"
                            :gauge-id="activeGage.gauge.id"
                            :metric-id="Number(activeMetric.id)"
                            :metrics="metrics"
                            :gages="[activeGage]"
                            @viewModeChange="viewMode = $event"
                            @gage-change="setActiveGageId"
                            @metric-change="setActiveMetricId"
                        />
                      </template>
                      <template v-else>
                        <cv-button
                            v-if="editMode"
                            @click.exact="handleOpenGageModal"
                        >
                          Add Gage
                        </cv-button>
                      </template>
                    </template>

                  </layout>
                </gage-summary>
              </div>

            </div>


          </div>

        </template>
        <template v-else>
          <div>
            <a v-if="editMode"
               class="cv-button mb-spacing-md bx--btn bx--btn--tertiary bx--btn--sm"
               :href="formatLinkUrl(`/content/StreamTeam/edit-correlations/?reach_id=${$route.params.id}`)"
               target="_blank"
            >Edit Flows</a>
          </div>

          <utility-block
              state="content"
              title="No Gages"
              text="this reach doesn't have any associated gages"
          />
        </template>
        <div class="mb-lg">
          <hr>
          <h2 class="mb-spacing-md">
            Gage Description
          </h2>
          <template v-if="!editMode">
            <div
                v-if="sanitizedDescription "
                class="gage-description"
                v-html="sanitizedDescription"
            />
            <div
                v-else
                class="gage-description"
            >
              This gage does not have a description.
            </div>
          </template>
          <template v-else>
            <content-editor
                :content="
            sanitizedDescription ? sanitizedDescription : 'start typing...'
          "
                show-control-bar
                @content:updated="handleUpdate"
                @editor:destroyed="handleEditorDestroy"
            />
            <cv-button
                class="mt-spacing-sm"
                @click.exact="submitForm"
                @keydown.enter="submitForm"
            >
              Submit
            </cv-button>
          </template>


        </div>


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
    <gage-link-modal ref="gageLinkModal"/>
  </div>
</template>

<script>
import {
  FlowChart,
  FlowStats,
  GageChartControls,
  GageLinkModal,
  GageReadings,
  LevelLegend,
  ReleasesTable,
  ReleasesCalendar
} from './components'
import GageSummary from './components/gage-summary'
import { GageChartConfig } from './utils/gage-chart-config'
import { Layout } from '@/app/global/layout'
import { mapState } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { checkWindow } from '@/app/global/mixins'
import cloneDeep from 'lodash/cloneDeep.js'
import http from '@/app/http'
import ContentEditor from '@/app/global/components/content-editor/content-editor.vue'
import { getEmptyMetric, getEmptyReading } from '@/app/global/lib/gages'
import { uniq } from 'lodash/array'

const flowviewCalendar = 2; const flowviewTable = 1;

export default {
  name: 'flow-tab',
  components: {
    ContentEditor,
    GageLinkModal,
    FlowChart,
    GageChartControls,
    GageReadings,
    Layout,
    UtilityBlock,
    LevelLegend,
    FlowStats,
    ReleasesTable,
    ReleasesCalendar,
    GageSummary
  },
  mixins: [GageChartConfig, checkWindow],
  data: () => ({
    activeGageId: '',
    selectedTimespan: 'h:mm a',
    viewMode: 'chart',
    activeMetricId: '',
    refreshedDescription: '',
    updatedDescription: '',
    releaseView: 1
  }),
  computed: {
    ...mapState({
      river: state => state.RiverDetail.data,
      readings: state => state.GageReadings?.data,
      loading: state => state.GageReadings.loading,
      error: state => state.GageReadings.error,
      gages: state => state.RiverGages.data?.gauges ?? [],
      ranges: state => state.RiverGages.data?.ranges ?? [],
      gagesLoading: state => state.RiverGages.loading,
      gagesError: state => state.RiverGages.error,
      editMode: state => state.Global.editMode,
      metrics: state => state.RiverGages.data?.metrics ?? [],
    }),

    readingsWithLast () {
      const lastReadings = []
      //
      if (this.readings?.length
          && this.readings[0].gauge_id == this.activeGage?.gauge?.id
          && this.activeGage?.gauge_metric == this.activeMetric?.id) {

        const ag = this.activeGage
        lastReadings.push({
          ...getEmptyReading(),
          gauge_id: ag.gauge.id,
          metric: ag.gauge_metric,
          reading: ag.gauge_reading,
          updated: ag.epoch
        })
      }
      return ([...(this.readings?.length ? this.readings : []), ...lastReadings].filter(x => x.metric == this.activeMetric.id).sort((x, y) => x.updated - y.updated))

    },

    gagesWithGage () {
      return (this.gages?.filter(x => x.gauge) ?? []).sort((a, b) => {
        //sort by primary over secondary
            if (a.delay_update - b.delay_update) {
              return a.delay_update - b.delay_update
              // sort by updated last
            } else {
              return a.epoch - b.epoch;
            }
          }
        )

    },

    delays () {
      return (uniq(this.gagesWithGage.map(x => x.delay_update)))
    },

    chartSize () {
      if (this.windowWidth > this.$options.breakpoints.md) {
        return null
      } else {
        return 'position:relative;width:' + this.$options.breakpoints.sm * 2 + 'px'
      }
    },
    lastReading () {
      if (this.activeGage && Number(this.activeGage.gauge_metric) === Number(this.activeMetricId)) {
        return this.activeGage.gauge_reading
      }
      if (this.activeGage
          && Number(this.activeGage.gauge_metric) !== Number(this.activeMetricId)
          && this.readings.length > 0
      ) {
        // here we return the most recent "reading" from our new readings set
        // can't directly operate on this.readings because it will mutate the array
        const lastReading = cloneDeep(this.readingsWithLast).sort((a, b) => a - b)[0].reading
        return Number(lastReading)
      }

      return null
    },
    sanitizedDescription () {
      return this.$cleanContent(this.refreshedDescription || (this.river?.gaugeinfo ?? ''))
    },

    activeGage () {
      return this.gages ? this.gagesWithGage.find(g => g.gauge.id === this.activeGageId) : null
    },
    activeMetric () {
      if (this.metrics) {
        return this.metrics.find(m => m.id.toString() === this.activeMetricId.toString()) ?? getEmptyMetric()
      }
      return null
    }
  }
  ,
  watch: {
    error(val)
    {
      if (val) {
        this.$store.dispatch('Global/sendToast', {
          title: 'Failed to load readings',
          kind: 'error'
        })
      }
    }
    ,
    gagesWithGage(u)
    {
      if (u && u.length && !this.activeGage) {
        this.setActive(u[0])
      }
    },


    gagesError (val) {
      if (val) {
        this.$store.dispatch('Global/sendToast', {
          title: 'Failed to load readings',
          kind: 'error'
        })
      }
    }
  },
  methods: {
    handleUpdate (v) {
      this.updatedDescription = v
    },
    handleEditorDestroy () {
      this.updatedDescription = ''
    },
    rangeForGageID (id) {
      return (this.ranges.filter(x => parseInt(x.gauge_id) === parseInt(id)).sort(x => x.min - x.max))
    },
    submitForm () {
      if (this.updatedDescription && this.river.id) {
        this.updatePending = true

        http.post('/graphql', {
          query: `
          mutation  {
            reachUpdate(id: ${this.river.id}, reach:{ gaugeinfo: "${this.$cleanContent(this.updatedDescription)}"}) {
              gaugeinfo
            }
          }
        `
        }).then(r => {
          this.refreshedDescription = r.data.data.reachUpdate.gaugeinfo

          this.updatePending = false
          this.$store.dispatch('Global/sendToast', {
            title: 'Description Updated',
            kind: 'success',
            override: true,
            contrast: false,
            action: false,
            autoHide: true
          })
        }).catch(() => {
          this.updatePending = false
          this.error = true
          this.$store.dispatch('Global/sendToast', {
            title: 'Update Failed',
            kind: 'error',
            override: true,
            contrast: false,
            action: false,
            autoHide: true
          })
        })
      }
    },

    setActiveGageId (id) {
      this.activeGageId = id
    },

    setActive (gage) {
      this.setActiveGageId(gage.gauge.id)
      this.setActiveMetricId(gage.gauge_metric)
    },
    setActiveMetricId (id) {
      this.activeMetricId = id
    },
    handleOpenGageModal () {
      this.$refs.gageLinkModal.open()
    },
    calendarView () {
      this.releaseView = flowviewCalendar
    },
    tableView () {
      this.releaseView = flowviewTable
    }
  },
  created () {
    this.$store.dispatch('RiverGages/getProperty', this.$route.params.id)
  }
}
</script>
<style lang="scss">

</style>
