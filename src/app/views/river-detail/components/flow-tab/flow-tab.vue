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
                />
              </div>
            </div>
            <div v-else>
              <gage-readings />
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
        <template v-else>
          <utility-block
            state="content"
            title="No Gages"
            text="this reach doesn't have any associated gages"
          />
        </template>
      </template>
      <template #sidebar>
        <template v-if="gagesLoading">
          <cv-skeleton-text headline />
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
            @click.exact="$router.push(`/gage-detail/${activeGage.gauge.id}`)"
            @keydown.enter="$router.push(`/gage-detail/${activeGage.gauge.id}`)"
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
          <level-legend />
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
        <releases-table />
      </template>
    </layout>
    <gage-link-modal ref="gageLinkModal" />
  </div>
</template>

<script>
import { FlowChart, GageReadings, GageChartControls, LevelLegend, FlowStats, GageLinkModal, ReleasesTable} from './components'
import { GageChartConfig } from './utils/gage-chart-config'
import { Layout } from '@/app/global/layout'
import { mapState } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { checkWindow } from '@/app/global/mixins'

export default {
  name: 'flow-tab',
  components: {
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
    activeMetricId: ''
  }),
  computed: {
    ...mapState({
      readings: state => state.GageReadings.data,
      loading: state => state.GageReadings.loading,
      error: state => state.GageReadings.error,
      gages: state => state.RiverGages.data,
      gagesLoading: state => state.RiverGages.loading,
      gagesError: state => state.RiverGages.error,
      editMode: state => state.Global.editMode
    }),
    chartSize () {
      if (this.windowWidth > this.$options.breakpoints.md) {
        return null
      } else {
        return 'position:relative;width:' + this.$options.breakpoints.sm * 2 + 'px'
      }
    },
    lastReading() {
      if (this.activeGage && Number(this.activeGage.gauge_metric) === Number(this.activeMetricId)) {
        return this.activeGage.gauge_reading
      }
      if (this.activeGage
              && Number(this.activeGage.gauge_metric) !== Number(this.activeMetricId)
              && this.readings.length > 0
      ) {
        // here we return the most recent "reading" from our new readings set
        return Number(this.readings.sort((a,b) => a-b)[0].reading);
      }

      return null
    },
    activeGage () {
      return this.gages ? this.gages.find(g => g.gauge.id === this.activeGageId) : null
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
    setActiveGageId (id) {
      this.activeGageId = id
    },
    setActiveMetricId(id) {
      this.activeMetricId = id;
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
