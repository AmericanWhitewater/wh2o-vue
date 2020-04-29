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
              <cv-skeleton-text />
            </template>
          </td>
        </tr>
        <tr>
          <td>Length</td>
          <td class="river-length">
            <template v-if="loading">
              <cv-skeleton-text />
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
              {{ river && river.avggradient ? river.avggradient + ' fpm' : 'n/a' }}
            </template>
            <template v-else>
              <cv-skeleton-text />
            </template>
          </td>
        </tr>
        <tr>
          <td>Gage</td>
          <template v-if="!loading">
            <td
              v-if="gages && gages.length"
              class="river-gages"
            >
              {{ gages[0].gauge && gages[0].gauge.name ? $titleCase(gages[0].gauge.name) : 'n/a' }}
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
              <cv-skeleton-text />
            </td>
          </template>
        </tr>
        <tr>
          <td>Flow Range</td>
          <template v-if="!loading">
            <td
              v-if="gages && gages.length"
              class="flow-range"
            >
              {{ formatFlowRange(gages[0].rmin, gages[0].rmax) }}
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
              <cv-skeleton-text />
            </td>
          </template>
        </tr>
        <tr>
          <td>
            Flow Rate
            <template v-if="gages && gages.length">
              as of {{ formatTime(gages[0].epoch) }}
            </template>
          </td>
          <template v-if="!loading">
            <td
              v-if="gages && gages.length"
              class="river-flow-rate"
            >
              {{ gages[0].last_gauge_reading }}
              {{ formatMetric(gages[0].gauge_metric) }}
              <cv-tag
                v-if="gages[0].adjusted_reach_class"
                kind="cool-gray"
                :label="gages[0].adjusted_reach_class"
              />
              <cv-tag
                v-if="formatTag(gages[0])"
                :kind="formatTag(gages[0]).kind"
                :label="formatTag(gages[0]).label"
              />
              <template v-if="gages[0].gauge_perfect">
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
              <cv-skeleton-text />
            </td>
          </template>
        </tr>
        <tr>
          <td>Reach Info Last Updated</td>
          <td class="river-last-edited">
            <template v-if="!loading">
              {{ river && river.edited ? formatDate(river.edited, 'LL') : 'n/a' }}
            </template>
            <template v-else>
              <cv-skeleton-text />
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
    <BetaBoxEditModal :visible="editModalVisible" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { humanReadable } from '@/app/global/services/human-readable'
import { BetaBoxEditModal } from './components'
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
      loading: state => state.riverDetailState.riverDetailData.loading,
      river: state => state.riverDetailState.riverDetailData.data,
      editMode: state => state.appGlobalState.appGlobalData.editMode,
      gages: state => state.riverDetailState.reachGagesData.data,
      metrics: state => state.riverDetailState.gageMetricsData.data
    })
  },
  methods: {
    formatTime (input) {
      return humanReadable(input)
    },
    formatFlowRange (min, max) {
      if (min && max) {
        return `${min} – ${max} ${this.formatMetric(this.gages[0].gauge_metric)}`
      }
      return 'n/a'
    },
    formatMetric (metricId) {
      if (this.metrics) {
        return this.metrics.find(m => m.id === metricId.toString())?.unit
      }
      return 'n/a'
    },
    formatTag (gage) {
      if (gage.rmin && gage.rmax && gage.last_gauge_reading) {
        if (gage.last_gauge_reading < gage.rmin) {
          return ({
            kind: 'red',
            label: 'Below Recommended'
          })
        } else if (gage.last_gauge_reading > gage.rmax) {
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
<style lang="scss" scoped>
.beta-box {
  max-width: 100%;
  overflow-x: scroll;
  position: relative;
  overflow: hidden;
  .edit-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: rgba($ui-02, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
td {
  vertical-align: middle;
  background-color: transparent;
}
tr {
  @include ease;
  &:hover,
  &:focus {
    background-color: $ui-02;
  }
}
</style>
