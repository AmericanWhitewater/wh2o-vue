<template>
  <div class="beta-box mb-md">
    <template v-if="loading">
      <utility-block blank />
    </template>
    <template v-else-if="river">
      <div class="bx--data-table-container">
        <table
          v-if="!loading"
          class="bx--data-table bx--data-table--zebra"
        >
          <tr>
            <td>Difficulty</td>
            <td v-text="river.class" />
          </tr>
          <tr>
            <td>Length</td>
            <td v-text="river.length" />
          </tr>
          <tr>
            <td>Avg Gradient</td>
            <td v-text="river.avggradient" />
          </tr>
          <tr>
            <td>Gage</td>
            <td v-if="!gages">
              n/a
            </td>
            <td v-if="gages && gages.length">
              {{ $titleCase(gages[0].gauge.name) }}
            </td>
          </tr>
          <tr>
            <td>Flow Range</td>
            <td v-if="gages && gages.length">
              {{ formatFlowRange(gages[0].rmin, gages[0].rmax) }}
            </td>
            <td v-else>
              n/a
            </td>
          </tr>
          <tr>
            <td>
              Flow Rate
              <template v-if="gages && gages.length">
                as of {{ formatTime(gages[0].last_gauge_updated) }}
              </template>
            </td>

            <td v-if="gages && gages.length">
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
            </td>
            <td v-else>
              n/a
            </td>
          </tr>
          <tr>
            <td>Reach Info Last Updated</td>
            <td v-text="formatDate(river.edited)" />
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
    </template>
    <template v-else>
      <utility-block blank />
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Moment from 'moment'
import { humanReadable } from '@/app/global/services/human-readable'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { BetaBoxEditModal } from './components'
/**
 * @todo if reach has multiple gages, add dropdown to
 * gage tr, v-model+watch+fetch.gageActions.FETCH_GAGE_DATA and make other table values reactive
 *
 */
export default {
  name: 'beta-box',
  filters: {
    capitalize (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  components: {
    UtilityBlock,
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
      error: state => state.riverDetailState.riverDetailData.error,
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
        return `${min} – ${max}`
      }
      return 'n/a'
    },
    formatMetric (metricId) {
      if (this.metrics) {
        return this.metrics.find(m => m.id === metricId.toString())?.unit
      }
      return null
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
    },
    formatDate (input) {
      return Moment(input, 'MMM Do YY').format('ll')
    },
    setInitialFormData () {
      this.formData.class = this.river.class
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
