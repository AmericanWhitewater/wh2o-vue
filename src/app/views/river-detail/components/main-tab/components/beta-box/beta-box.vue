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
        <template v-if="loading">
          <tr>
            <td class="river-gages">
              <cv-skeleton-text/>
            </td>
          </tr>
        </template>
        <template v-else-if="gaugeCorrelation && gaugeCorrelation.gaugeInfo">
          <tr>
            <td>Gauge</td>
            <td class="river-gages">
              <!-- TODO: re-add link to gauge detail page once it exists -->
              <a class="bx--link">{{ $titleCase(gaugeCorrelation.gaugeInfo.name) }}</a>
            </td>
          </tr>
          <tr v-if="gaugeCorrelation.correlationDetails && gaugeCorrelation.correlationDetails.data">
            <td>Flow Range</td>
            <td class="flow-range">
              {{ gaugeCorrelation.correlationDetails.data.beginLowRunnable }} - {{ gaugeCorrelation.correlationDetails.data.endHighRunnable }}
              {{ gaugeCorrelation.correlationDetails.data.flowMetric }}
            </td>
          </tr>
          <tr v-if="gaugeCorrelation.status">
            <td>
              Flow Rate
              as of {{ formatDateTime(gaugeCorrelation.status.latestReading.dateTime) }}
            </td>
            <td class="river-flow-rate">
              {{ gaugeCorrelation.status.latestReading.value }} {{ gaugeCorrelation.status.metric }}
              <cv-tag
                  v-if="adjustedReachGrade"
                  kind="cool-gray"
                  :label="adjustedReachGrade"
              />
              <cv-tag
                  :kind="statusTagColor(gaugeCorrelation.status.status)"
                  :label="gaugeCorrelation.status.status.replace('-', ' ')"
              />
            </td>
          </tr>
        </template>
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
import { EditBlockOverlay } from '@/app/global/components'
import { reachClient } from '@/app/services'

export default {
  name: 'beta-box',
  components: {
    BetaBoxEditModal,
    EditBlockOverlay
  },
  data: () => ({
    editModalVisible: false,
    formData: {},
    reachDetail: null,
  }),
  computed: {
    ...mapState({
      loading: state => state.RiverDetail.loading,
      river: state => state.RiverDetail.data,
      editMode: state => state.Global.editMode,
    }),
    // TODO: decide how to handle secondary gauges. do we fall back if primary isn't reporting?
    gaugeCorrelation () {
      if (this.reachDetail?.detail?.correlations) {
        return this.reachDetail.detail.correlations.find(x => x.isPrimary);
      }
      return null;
    },
    adjustedReachGrade () {
      if (this.gaugeCorrelation && this.gaugeCorrelation.status && this.gaugeCorrelation.correlationDetails) {
        const adjustedGradeKey = this.gaugeCorrelation.status.status.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return this.gaugeCorrelation.correlationDetails.data[`${adjustedGradeKey}AdjustedGrade`];
      }
      return null;
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
  },
  watch: {
    reachId: {
      immediate: true,
      async handler(reachId) {
        // retrieves gauge correlation information from new modernized gauge API
        this.reachDetail = await reachClient.reachDetail.query({ reachID: reachId });
      }
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
    formatDateTime (input) {
      const now = new Date();
      const readingTime = new Date(input);
      return humanReadable(now.getTime() - readingTime.getTime())
    },
    statusTagColor(status) {
      if (status === 'below-recommended') {
        return 'red';
      } else if (status === 'above-recommended') {
        return 'blue';
      } else {
        return 'green';
      }
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
}
</style>