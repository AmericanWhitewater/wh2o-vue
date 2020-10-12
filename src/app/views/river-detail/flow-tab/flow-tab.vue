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
          <GageChartControls
            @viewModeChange="viewMode = $event"
            @gage-change="setActiveGageId"
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
            class="mb-spacing-md"
            kind="tertiary"
            size="small"
            @click.exact="goToLink(formatLinkUrl(`/content/gauge/detail-new/${activeGage.gauge.id}`))"
            @keydown.enter="goToLink(formatLinkUrl(`/content/gauge/detail-new/${activeGage.gauge.id}`))"
          >
            Gage Detail
          </cv-button>
          <level-legend />
          <a
            v-if="editMode"
            :href="formatLinkUrl(`/content/StreamTeam/edit-correlations/?reach_id=${$route.params.id}`)"
            target="_blank"
          >Edit Flows</a>
        </template>
        <template v-else>
          error
        </template>
      </template>
    </layout>
  </div>
</template>

<script>
import { FlowChart, GageReadings, GageChartControls, LevelLegend, FlowStats } from './components'
import { GageChartConfig } from './utils/gage-chart-config'
import { Layout } from '@/app/global/layout'
import { mapState } from 'vuex'
import { reachGagesActions } from '../shared/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { checkWindow } from '@/app/global/mixins'
import { globalAppActions } from '@/app/global/state'

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
    LevelLegend,
    FlowStats
  },
  mixins: [GageChartConfig, checkWindow],
  data: () => ({
    activeGageId: '',
    selectedTimespan: 'h:mm a',
    viewMode: 'chart'
  }),
  computed: {
    ...mapState({
      readings: state => state.riverDetailState.gageReadingsData.data,
      loading: state => state.riverDetailState.gageReadingsData.loading,
      error: state => state.riverDetailState.gageReadingsData.error,
      gages: state => state.riverDetailState.reachGagesData.data,
      gagesLoading: state => state.riverDetailState.reachGagesData.loading,
      gagesError: state => state.riverDetailState.reachGagesData.error,
      editMode: state => state.appGlobalState.appGlobalData.editMode,
      riverData: state => state.riverDetailState.riverDetailData.data
    }),
    chartSize () {
      if (this.windowWidth > this.$options.breakpoints.md) {
        return null
      } else {
        return 'position:relative;width:' + this.$options.breakpoints.sm * 2 + 'px'
      }
    },
    activeGage () {
      return this.gages.find(g => g.gauge.id === this.activeGageId)
    }
  },
  watch: {
    error (val) {
      if (val) {
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Failed to load readings',
          kind: 'error'
        })
      }
    },
    gagesError (val) {
      if (val) {
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Failed to load readings',
          kind: 'error'
        })
      }
    }
  },
  methods: {
    setActiveGageId (id) {
      this.activeGageId = id
    }
  },
  created () {
    this.$store.dispatch(reachGagesActions.FETCH_GAGES, this.$route.params.id)
  }
}
</script>
