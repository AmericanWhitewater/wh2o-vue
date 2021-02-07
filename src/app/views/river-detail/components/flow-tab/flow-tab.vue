<template>
  <div class="flow-tab">
    <layout
        name="layout-two-thirds"
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
        <template v-else-if="gages && gages.length">
          <template v-if="loading">
            <utility-block
                class="mb-lg"
                state="loading"
                text="loading readings..."
            />
          </template>
          <template v-else-if="readings && readings.length">
            <div
                v-if="viewMode === 'chart'"
                style="max-width: 100%; overflow-x: scroll;"
                class="mb-spacing-sm"
            >
              <div :style="chartSize">
                <flow-chart
                    :gages="gages"
                    :readings="readings"
                    class="mb-md"
                />
                <flow-stats
                    :readings="readings"
                    :loading="loading"
                    :current="lastReading || 0"
                    :metric-format="activeMetricFormat"
                />
              </div>
            </div>
            <div v-else>
              <gage-readings/>
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
          <gage-chart-controls
              @viewModeChange="viewMode = $event"
              @gage-change="setActiveGageId"
              @metric-change="setActiveMetricId"
          />
          <div class="mb-lg">
            <hr>
            <h2 class="mb-spacing-md">
              Gage Summary
            </h2>

            <div v-for="gage in gagesWithGage" :key="gage.gauge.id" class='gage-grid'>
              <div class="gage-name">{{ gage.gauge.name }}</div>
              <div class="gage-comment">{{ gage.gauge.gauge_comment }}</div>
              <div class='gage-reading-header header'>Reading</div>
              <div class="gage-range-header header">Range</div>
              <div class="gage-class-header header">Adjusted Difficulty</div>
              <div :class="`gage-reading ${getClass(gage.rc)}`">{{
                  formatReading(gage.gauge_reading, gage.gauge_metric)
                }} {{ formatMetric(gage.gauge_metric) }} @ {{ formatTime(gage.epoch) }}
              </div>
              <div class="gage-range">{{ formatFlowRange(gage.rmin, gage.rmax, gage.gauge_metric) }}</div>
              <div class="gage-class"><span v-if="gage.adjusted_reach_class">Adjusted Class {{
                  gage.adjusted_reach_class
                }}</span></div>
              <div :class="`range-comment ${getClass(gage.rc,gage.gauge_metric)}`"><span
                  v-if="gage.range_comment">{{ gage.range_comment }}</span>
              </div>
            </div>


          </div>
        </template>
        <template v-else>
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
      <template #sidebar>
        <template v-if="gagesLoading">
          <cv-skeleton-text headline/>
        </template>
        <template v-else-if="activeGage">
          <h4
              class="mb-spacing-sm"
              v-text="$titleCase(activeGage.gauge.name)"
          />
          <cv-button
              class="mb-spacing-sm"
              kind="tertiary"
              size="small"
              @click.exact="go(`/content/gauge/detail-new/${activeGage.gauge.id}`)"
              @keydown.enter="go(`/content/gauge/detail-new/${activeGage.gauge.id}`)"
          >
            Gage Detail
          </cv-button>
          <div>
            <a v-if="editMode"
               class="cv-button mb-spacing-md bx--btn bx--btn--tertiary bx--btn--sm"
               :href="formatLinkUrl(`/content/StreamTeam/edit-correlations/?reach_id=${$route.params.id}`)"
               target="_blank"
            >Edit Flows</a>
          </div>
          <level-legend/>
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
    <layout name="layout-full-width">
      <template #main>
        <releases-table/>
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
  ReleasesTable
} from './components'
import { GageChartConfig } from './utils/gage-chart-config'
import { Layout } from '@/app/global/layout'
import { mapState } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { checkWindow } from '@/app/global/mixins'
import cloneDeep from 'lodash/cloneDeep.js'
import { formatReading } from '@/app/global/lib/gages'
import { humanReadable } from '@/app/global/services'
import http from '@/app/http'
import ContentEditor from '@/app/global/components/content-editor/content-editor.vue'

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
    ReleasesTable
  },
  mixins: [GageChartConfig, checkWindow],
  data: () => ({
    activeGageId: '',
    selectedTimespan: 'h:mm a',
    viewMode: 'chart',
    activeMetricId: '',
    refreshedDescription: '',
    updatedDescription: '',
  }),
  computed: {
    ...mapState({
      river: state => state.RiverDetail.data,
      readings: state => state.GageReadings.data,
      loading: state => state.GageReadings.loading,
      error: state => state.GageReadings.error,
      gages: state => state.RiverGages.data,
      gagesLoading: state => state.RiverGages.loading,
      gagesError: state => state.RiverGages.error,
      editMode: state => state.Global.editMode,
      metrics: state => state.GageMetrics.data,

    }),

    gagesWithGage () {
      return this.gages?.filter(x => x.gauge) ?? []
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
        const lastReading = cloneDeep(this.readings).sort((a, b) => a - b)[0].reading
        return Number(lastReading)
      }

      return null
    },
    sanitizedDescription () {
      return this.$cleanContent(this.refreshedDescription || (this.river.gaugeinfo ?? ''))
    },

    activeGage () {
      return this.gages ? this.gages.find(g => g.gauge.id === this.activeGageId) : null
    },
    activeMetricFormat () {
      if (this.metrics) {
        return this.metrics.find(m => m.id.toString() === this.activeMetricId.toString())?.format
      }
      return null
    }
  },
  watch: {
    error (val) {
      if (val) {
        this.$store.dispatch('Global/sendToast', {
          title: 'Failed to load readings',
          kind: 'error'
        })
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

    formatTime (epoch) {
      return humanReadable((new Date().valueOf()) - (epoch * 1000))
    },
    formatFlowRange (min, max, metricID) {
      if (min && max) {
        return `${this.formatReading(min, metricID)} – ${this.formatReading(max, metricID)} ${this.formatMetric(metricID)}`
      }
      return 'n/a'
    },
    formatMetric (metricId) {
      if (this.metrics) {
        return this.getMetric(metricId)?.unit || 'n/a'
      }
      return 'n/a'
    },
    setActiveGageId (id) {
      this.activeGageId = id
    },
    formatReading (reading, metricID) {
      return formatReading(reading, this.getMetric(metricID)?.format || '')
    },
    getMetric (metricID) {
      if (metricID && this.metrics?.length) {
        return this.metrics.find(m => m.id === metricID.toString())
      }
      return null
    },

    getClass (rc) {
      if (rc < 0.0) {
        return ('too-lo')
      }
      if (rc <= 0.33) {
        return ('lo')
      }
      if (rc <= 0.66) {
        return
        ('med')
      }
      if (rc <= 1) {
        return ('hi')
      }
      if (rc > 1) {
        return ('too-hi')
      }
    },
    setActiveMetricId (id) {
      this.activeMetricId = id
    },
    handleOpenGageModal () {
      this.$refs.gageLinkModal.open()
    }
  },
  created () {
    this.$store.dispatch('RiverGages/getProperty', this.$route.params.id)
  }
}
</script>
<style lang="scss">
.gage-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 1em;

  .gage-name {
    font-size: larger;
  }

  .gage-name,
  .header {
    font-weight: bolder;
  }

  .gage-name,
  .gage-comment,
  .range-comment {
    grid-column: 1/4;

  }

  .too-lo {
    background: $flow-low;

  }

  .too-hi {
    background: $flow-high;

  }

  .lo {
    background: darken($flow-medium, 15%);
  }

  .med {
    background: $flow-medium;

  }

  .hi {
    background: lighten($flow-medium, 15%);
  }

}
</style>
