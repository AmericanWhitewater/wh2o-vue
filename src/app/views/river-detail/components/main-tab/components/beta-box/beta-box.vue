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
        <tr>
          <td>Gage</td>
          <template v-if="!loading">
            <td
                v-if="gages && gages.length && reachGage && reachGage.gauge"
                class="river-gages"
            >
              <a :href="formatLinkUrl(`content/gauge/detail-new/${reachGage.gauge.id || ''}`)">{{
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
                v-if="reachGage "
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
              {{ formatReading(reachGage.gauge_reading, reachGage.gauge_metric) }}
              {{ formatMetric(reachGage.gauge_metric) }}
              <cv-tag
                  v-if="reachGage.adjusted_reach_class"
                  kind="cool-gray"
                  :label="reachGage.adjusted_reach_class"
              />
              <cv-tag
                  v-if="formatTag(reachGage)"
                  :kind="formatTag(reachGage).kind"
                  :label="formatTag(reachGage).label"
              />
              <template v-if="reachGage.gauge_perfect">
                👍
              </template>
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
              {{ formatDate(releaseDate.event_date, 'LL') }}
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
    <div
        v-if="editMode"
        class="edit-overlay"
        @click="editModalVisible = true"
    >
      <h3>Edit Beta Box</h3>
    </div>
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

/**
 * @todo if reach has multiple gages, add dropdown to
 * gage tr, v-model+watch+fetch.gageActions.FETCH_GAGE_DATA and make other table values reactive
 *
 */
export default {
  name: 'beta-box',
  components: {
    BetaBoxEditModal
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
    reachGage () {

      if (this.river && this.river.readingsummary && this.gages) {
        return this.gages.find(g => g.gauge.id.toString() === this.river.readingsummary.gauge_id.toString())
      }
      return this.gages[0]
    }
  },
  methods: {
    /**
     *
     * @param releaseDate - string e.g. "2007-01-01T11:33:00+0"
     * @return "Latest" or "Next"
     */
    getReleaseFieldLabel (releaseDate) {
      if (!releaseDate) return ''

      const today = new Date()
      const eventDate = new Date(releaseDate)

      if (eventDate.setHours(0, 0, 0, 0).valueOf() <= today.setHours(0, 0, 0, 0).valueOf()) {
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
    formatTag (gage) {
      if (gage && gage.rmin && gage.rmax && gage.gauge_reading) {
        if (gage.gauge_reading < gage.rmin) {
          return ({
            kind: 'red',
            label: 'Below Recommended'
          })
        } else if (gage.gauge_reading > gage.rmax) {
          return ({
            kind: 'blue',
            label: 'Above Recommended'
          })
        } else {
          return ({
            kind: 'green',
            label: 'Runnable'
          })
        }
      }
      return null
    }
  }
}
</script>
