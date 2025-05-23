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
              <cv-link @click.exact="$router.replace(`/river-detail/${$route.params.id}/flow`)">
                {{ $titleCase(gaugeCorrelation.gaugeInfo.name) }}
              </cv-link>
            </td>
          </tr>
          <tr v-if="gaugeCorrelation.correlationDetails && gaugeCorrelation.correlationDetails.data">
            <td>Flow Range</td>
            <td class="flow-range">
              {{ gaugeCorrelation.correlationDetails.data.beginLowRunnable }} - {{ gaugeCorrelation.correlationDetails.data.endHighRunnable }}
              {{ correlationMetrics[gaugeCorrelation.correlationDetails.data.metric].unit }}
            </td>
          </tr>
          <tr v-if="gaugeCorrelation && getLatestReading(gaugeCorrelation)">
            <td>
              Flow Rate
              as of {{ displayLatestReadingTime }}
            </td>
            <td class="river-flow-rate">
              {{ getLatestReading(gaugeCorrelation).value }} {{ correlationMetrics[getCorrelationMetric(gaugeCorrelation)].unit }}
              <cv-tag
                  v-if="adjustedReachDifficulty(gaugeCorrelation)"
                  kind="cool-gray"
                  :label="adjustedReachDifficulty(gaugeCorrelation)"
              />
              <cv-tag
                  v-if="gaugeCorrelation.status && gaugeCorrelation.status.status"
                  :class="gaugeCorrelation.status.status"
                  :label="gaugeCorrelation.status.status.replace('-', ' ').replace('migration', '')"
              /> <!-- TODO: reference to "migration" above handles existing legacy migration-runnable data -->
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
import { BetaBoxEditModal } from './components'
import { EditBlockOverlay } from '@/app/global/components'
import { reachApiHelper } from '@/app/global/mixins'

export default {
  name: 'beta-box',
  components: {
    BetaBoxEditModal,
    EditBlockOverlay
  },
  mixins: [reachApiHelper],
  props: {
    reachDetail: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    editModalVisible: false,
    formData: {},
  }),
  computed: {
    ...mapState({
      loading: state => state.RiverDetail.loading,
      river: state => state.RiverDetail.data,
      editMode: state => state.Global.editMode,
    }),
    gaugeCorrelation () {
      if (this.reachDetail?.detail?.correlations) {
        return this.reachDetail.detail.correlations.find(x => x.isPrimary);
      }
      return null;
    },
    displayLatestReadingTime() {
      const readingTime = new Date(this.getLatestReading(this.gaugeCorrelation).dateTime);
      return this.timeSince(readingTime);
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

  @each $class, $color in $flow-map {
    .bx--tag.#{$class} {
      background-color: $color;
    }
  }
}
</style>
