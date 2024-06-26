<template>
  <div class="beta-box mb-md">
    <div class="bx--data-table-container">
      <table class="bx--data-table bx--data-table--zebra">
        <tr>
          <td>Difficulty</td>
          <td class="river-class">
            <template v-if="!loading">
              {{ river && river.class ? river.class : 'n/a' }}
            </template>
            <template v-else>
              <cv-skeleton-text/>
            </template>
          </td>
        </tr>
        <tr>
          <td>Length</td>
          <td class="river-length">
            <template v-if="loading">
              <cv-skeleton-text/>
            </template>
            <template v-else>
              {{ river && river.length ? river.length + ' mi' : 'n/a' }}
            </template>
          </td>
        </tr>
        <tr>
          <td>Avg Gradient</td>
          <td class="river-avggradient">
            <template v-if="!loading">
              {{
                river && river.avggradient ? river.avggradient + ' fpm' : 'n/a'
              }}
            </template>
            <template v-else>
              <cv-skeleton-text/>
            </template>
          </td>
        </tr>
        <tr v-if="river && (river.permitinfo || river.permiturl)">
          <td>Permit</td>
          <td class="river-avggradient">
            <template v-if="!loading">
              <a :href="river.permiturl">{{ river.permitinfo || river.permiturl }}</a>
            </template>
            <template v-else>
              <cv-skeleton-text/>
            </template>
          </td>
        </tr>
        <tr>
          <td>Gage</td>
          <template v-if="!loading">
            <td
                v-if="gages && gages.length && reachGage && reachGage.gauge"
                class="river-gages"
            >
              <a class="bx--link" :href="formatLinkUrl(`content/gauge/detail-new/${reachGage.gauge.id || ''}`)">{{
                  reachGage.gauge && reachGage.gauge.name
                      ? $titleCase(reachGage.gauge.name)
                      : 'n/a'
                }}</a>
            </td>
            <td
                v-else
                class="river-gages"
            >
              n/a
            </td>
          </template>
          <template v-else>
            <td class="river-gages">
              <cv-skeleton-text/>
            </td>
          </template>
        </tr>
        <tr>
          <td>Flow Range</td>
          <template v-if="!loading">
            <td
                v-if="reachGage"
                class="flow-range"
            >
              {{ formatFlowRange(reachGage.rmin, reachGage.rmax, reachGage.gauge_metric) }}
            </td>
            <td
                v-else
                class="flow-range"
            >
              n/a
            </td>
          </template>
          <template v-else>
            <td class="flow-range">
              <cv-skeleton-text/>
            </td>
          </template>
        </tr>
        <tr>
          <td>
            Flow Rate
            <template v-if="reachGage">
              as of {{ formatTime(reachGage.updated * 1000) }}
            </template>
          </td>
          <template v-if="!loading">
            <td
                v-if="reachGage"
                class="river-flow-rate"
            >
              {{ readingIsEstimated ? '~' : '' }}
              {{ formatReading(reachGage.gauge_reading, reachGage.gauge_metric) }}
              {{ formatMetric(reachGage.gauge_metric) }}
              <cv-tag
                  v-if="reachGage.adjusted_reach_class"
                  kind="cool-gray"
                  :label="reachGage.adjusted_reach_class"
              />
              <cv-tag
                  v-if="reachGage && reachGage.rc"
                  kind="gray"
                  :class="formatFlowTag(reachGage).class"
                  :label="formatFlowTag(reachGage).label"
              />
            </td>
            <td
                v-else
                class="river-flow-rate"
            >
              n/a
            </td>
          </template>
          <template v-else>
            <td class="river-flow-rate">
              <cv-skeleton-text/>
            </td>
          </template>
        </tr>
        <!-- "Next/Last" Release + date if the release exists -->
        <tr v-if="releaseDate ">
          <td>{{ getReleaseFieldLabel(releaseDate.event_date) }}</td>
          <td>
            <router-link :to="`/river-detail/${reachId}/flow`">
              {{ releaseDate.event_date.toDateString() }}
            </router-link>
          </td>
        </tr>
        <tr>
          <td>Reach Info Last Updated</td>
          <td class="river-last-edited">
            <template v-if="!loading">
              {{
                river && river.edited ? formatDate(river.edited, 'LL') : 'n/a'
              }}
            </template>
            <template v-else>
              <cv-skeleton-text/>
            </template>
          </td>
        </tr>
      </table>
    </div>
    <edit-block-overlay
      title="Edit Beta Box"
      @click="editModalVisible = true"
    />
    <beta-box-edit-modal
        v-if="editMode && !loading"
        :key="editBetaBoxKey"
        :visible="editModalVisible"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { humanReadable } from '@/app/global/services/human-readable'
import { BetaBoxEditModal } from './components'
import { formatReadingWithFormat } from '@/app/global/lib/gages'
import { EditBlockOverlay } from '@/app/global/components'

/**
 * @todo if reach has multiple gages, add dropdown to
 * gage tr, v-model+watch+fetch.gageActions.FETCH_GAGE_DATA and make other table values reactive
 *
 */
export default {
  name: 'beta-box',
  components: {
    BetaBoxEditModal,
    EditBlockOverlay
  },
  data: () => ({
    editModalVisible: false,
    formData: {}
  }),
  computed: {
    ...mapState({
      loading: state => state.RiverDetail.loading,
      river: state => state.RiverDetail.data,
      editMode: state => state.Global.editMode,
      gages: state => state.RiverGages.data?.gauges ?? [],
      metrics: state => state.RiverGages.data?.metrics ?? []
    }),
    readingIsEstimated () {
      return this.river?.readingsummary?.gauge_estimated
    },
    /**
     * Event date or null
     */
    releaseDate () {
      return this.$store.getters['RiverEvents/nextOrClosestReleaseDate']
    },

    editBetaBoxKey () {
      return `editBetaBox${this.reachId}`
    },
    reachId () {
      return this.$route.params.id
    },
    gagesWithGage () {
      return (this.gages?.filter(x => x.gauge && !x.excluded) ?? []).sort((a, b) => {
            //sort by primary over secondary
            if (a.delay_update - b.delay_update) {
              return a.delay_update - b.delay_update
              // sort by updated last
            } else {
              return a.epoch - b.epoch
            }
          }
      )

    },

    reachGage () {
      if (this.river && this.river.readingsummary) {
        return this.gagesWithGage.find(g => g.gauge.id.toString() === this.river.readingsummary.gauge_id.toString())
      }
      return this.gagesWithGage[0]
    }
  },
  methods: {
    /**
     *
     * @param releaseDate - Date
     * @return "Latest" or "Next"
     */
    getReleaseFieldLabel (releaseDate) {
      if (!releaseDate) return ''

      const today = new Date()
      today.setHours(0, 0, 0, 0)
      today.setDate(today.getDate() + 1)

      if (releaseDate < today) {
        return 'Latest Release'
      }

      return 'Next Release'
    },
    formatTime (input) {

      if (isNaN(input)) {
        return ('')
      }
      return humanReadable(input)
    },
    formatFlowRange (min, max, metricID) {
      if (min && max) {
        return `${this.formatReading(min, metricID)} – ${this.formatReading(max, metricID)} ${this.formatMetric(metricID)}`
      }
      return 'n/a'
    },
    getMetric (metricID) {
      if (metricID && this.metrics?.length) {
        return this.metrics.find(m => m.id === metricID.toString())
      }
      return null
    },
    formatMetric (metricId) {
      if (this.metrics) {
        return this.getMetric(metricId)?.unit || 'n/a'
      }
      return 'n/a'
    },
    formatReading (reading, metricID) {
      return formatReadingWithFormat(reading, this.getMetric(metricID)?.format || '')
    },
    formatFlowTag (gauge) {
      if (gauge && gauge.rc) {
        if (gauge.rc < 0) {
          return ({
            class: 'below-recommended',
            label: 'Below Recommended'
          });
        } else if (gauge.rc < 0.33) {
          return ({
            class: 'low-runnable',
            label: 'Low Runnable'
          });
        } else if (gauge.rc < 0.66) {
          return ({
            class: 'med-runnable',
            label: 'Medium Runnable'
          });
        } else if (gauge.rc < 1) {
          return ({
            class: 'high-runnable',
            label: 'High Runnable'
          });
        } else {
          return ({
            class: 'above-recommended',
            label: 'Above Recommended'
          })
        }
      }
      return {};
    }
  }
}
</script>
<style lang="scss">
.beta-box {
  max-width: 100%;
  position: relative;

  td {
    background-color: transparent;
    vertical-align: middle;
  }

  tr {

    @include ease;

    &:hover,
    &:focus {
      background-color: $ui-02;
    }
  }

  .bx--tag {
    &.below-recommended {
      background-color: $flow-low;
    }
    &.low-runnable {
      background-color: $low-runnable;
    }
    &.med-runnable {
      background-color: $med-runnable;
    }
    &.high-runnable {
      background-color: $high-runnable;
    }
    &.above-recommended {
      background-color: $flow-high;
    }
  }
}
</style>