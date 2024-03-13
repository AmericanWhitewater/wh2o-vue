<template>
  <div class="bx--tile">
    <div class="header-row">
      <div>
        <h3>Gauge: {{ correlation.gaugeInfo.name }} ({{ correlation.gaugeInfo.gaugeSource }}-{{  correlation.gaugeInfo.gaugeSourceIdentifier }})</h3>
        <cv-select
          v-if="editing"
          v-model="localCorrelationDetails.flowMetric"
          inline
          label="Flow Metric"
        >
          <cv-select-option
            v-for="(m, index) in metricOptions"
            :key="index"
            :value="m.label.toLowerCase()"
            >{{ m.label }}
          </cv-select-option>
        </cv-select>
        <label v-else for="flowMetric">Flow Metric: {{ correlationDetails.data.flowMetric }}</label>
      </div>
      <div>
        <cv-button
          v-if="editing"
          kind="primary"
          size="small"
          @click.exact="saveCorrelation()"
          @keydown.enter="saveCorrelation()">
          Save
        </cv-button>
        <cv-button
          v-else
          kind="secondary"
          size="small"
          @click.exact="editing = true"
          @keydown.enter="editing = true">
          Edit
        </cv-button>
        <cv-button
          v-if="editing"
          kind="danger"
          size="small"
          @click="cancelCorrelationEdit()"
          @keydown.enter="cancelCorrelationEdit()">
          Cancel
        </cv-button>
        <cv-button
          v-else
          id="delete-button"
          kind="danger"
          size="small"
          @click="triggerCorrelationDelete()"
          @keydown.enter="triggerCorrelationDelete()">
          Remove
        </cv-button>
      </div>
    </div>
    <div>
      <h4>Boating flow ranges</h4>
      <p v-if="!correlationDetails || !correlationDetails.data">
        No ranges defined.
      </p>
      <p v-else-if="errors">
        <ul class="error-list">
          <li v-for="(e, i) in errors" :key="`error-${i}`" v-text="e" />
        </ul>
      </p>
      <div v-else>
        <div class="ranges">
          <div v-for="(range, i) in ranges" :key="`range-${i}`" :class="`range-indicator ${range.rangeClass}`">
            <div v-if="range.inflectionPointField" class="inflection-point">
              <label :for="range.inflectionPointField">{{ range.inflectionPointFieldLabel }}:</label>
              <span v-if="!editing">{{ correlationDetails.value[range.inflectionPointField] }}</span>
              <input v-else v-model="$data.localCorrelationDetails[range.inflectionPointField]" type="text" class="bx--text-input">
              <span>{{ editing ? localCorrelationDetails.flowMetric : correlationDetails.value.flowMetric }}</span>
            </div>
            <div class="range-fields">
              <div v-if="editing">
                <label :for="range.rangeCommentField" class="bx--label">Range comment:</label>
                <input
                  v-model="$data.localCorrelationDetails[range.rangeCommentField]"
                  class="bx--text-input range-comment">
                <template v-if="range.adjustedGradeField">
                  <label :for="range.adjustedGradeField" class="bx--label">Change difficulty with flow:</label>
                  <input
                    v-model="$data.localCorrelationDetails[range.adjustedGradeField]"
                    class="bx--text-input range-adjusted-grade">
                </template>
              </div>
              <div v-else>
                <label :for="range.rangeCommentField" class="bx--label">{{ $data.localCorrelationDetails[range.rangeCommentField] }}</label>
              </div>
            </div>
            <div class="band-label">
              {{ range.label }}
              <span v-if="$data.localCorrelationDetails[range.adjustedGradeField] && !editing" class="grade-adjustment">
                ({{ correlationDetails.value[range.adjustedGradeField] }})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirm-delete-modal ref="confirmDeleteModal" />
  </div>
</template>

<script>
import { trpcClient } from '@/app/services';
import { ConfirmDeleteModal } from '@/app/global/components';
import { gaugeHelpers } from '@/app/global/mixins'

export default {
  name: 'correlation-details',
  components: {
    ConfirmDeleteModal
  },
  mixins: [gaugeHelpers],
  props: {
    correlation: {
      type: Object
    },
  },
  data: () => ({
      // vue 2 doesn't detect when new props are added to an object,
      // so we need to enumerate all props for the watcher to work properly
      localCorrelationDetails: {
        aboveRecommendedRangeComment: null,
        flowMetric: null,
        beginLowRunnable: null,
        beginMediumRunnable: null,
        beginHighRunnable: null,
        endHighRunnable: null,
        lowRunnableRangeComment: null,
        mediumRunnableRangeComment: null,
        highRunnableRangeComment: null,
        lowRunnableAdjustedGrade: null,
        highRunnableAdjustedGrade: null,
        belowRecommendedRangeComment: null
      },
      errors: [],
      editing: false,
      ranges: [
        {
          rangeClass: "above-recommended",
          label: "above recommended",
          inflectionPointField: "endHighRunnable",
          inflectionPointFieldLabel: "Upper limit of high runnable",
          rangeCommentField: "aboveRecommendedRangeComment",
          adjustedGradeField: null
        },
        {
          rangeClass: "high-runnable",
          label: "high runnable",
          inflectionPointField: "beginHighRunnable",
          inflectionPointFieldLabel: "Upper limit of medium runnable",
          rangeCommentField: "highRunnableRangeComment",
          adjustedGradeField: "highRunnableAdjustedGrade"
        },
        {
          rangeClass: "medium-runnable",
          label: "medium runnable",
          inflectionPointField: "beginMediumRunnable",
          inflectionPointFieldLabel: "Upper limit of low runnable",
          rangeCommentField: "mediumRunnableRangeComment",
          adjustedGradeField: null
        },
        {
          rangeClass: "low-runnable",
          label: "low runnable",
          inflectionPointField: "beginLowRunnable",
          inflectionPointFieldLabel: "Lower limit of runnable",
          rangeCommentField: "lowRunnableRangeComment",
          adjustedGradeField: "lowRunnableAdjustedGrade"
        },
        {
          rangeClass: "below-recommended",
          label: "below recommended",
          inflectionPointField: null,
          inflectionPointFieldLabel: null,
          rangeCommentField: "belowRecommendedRangeComment",
          adjustedGradeField: null
        },
      ]
  }),
  computed: {
    correlationDetails() {
      return this.correlation?.correlationDetails;
    },
    gaugeCorrelationInfo() {
      return {
        reachID: this.correlation?.reachID,
        gaugeSource: this.correlation?.gaugeSource,
        gaugeSourceIdentifier: this.correltaion?.gaugeSourceIdentifier,
        correlationDetails: this.localCorrelationDetails
      }
    }
  },
  watch: {
    correlation: {
      immediate: true,
      handler() {
        this.resetCorrelationDetailsEdits();
      }
    },
  },
  methods: {
    async saveCorrelation() {
      const updatedCorr = await trpcClient.upsertGaugeCorrelationToReach.mutate(this.gaugeCorrelationInfo);
      // TODO: actually handle whatever a save error looks like
      if (updatedCorr.errors) {
        this.errors = [...updatedCorr.errors];
      } else {
        this.$emit('saved', updatedCorr);
        this.editing = false;
      }
    },
    async triggerCorrelationDelete() {
      const ok = await this.$refs.confirmDeleteModal.show({
        title: "Delete Gauge Correlation",
        message: "This will delete the correlation between this reach and this gauge. Are you sure?",
      });

      if (ok) {
        await trpcClient.deleteGaugeCorrelationFromReach.mutate({
          reachID: this.reachId,
          gaugeSource: this.gaugeInfo.gaugeSource,
          gaugeSourceIdentifier: this.gaugeInfo.gaugeSourceIdentifier
        });

        // update gauges displaying on upstream component
        this.$emit('deleted', this.correlation);
      }
    },
    cancelCorrelationEdit() {
      this.resetCorrelationDetailsEdits();
      this.editing = false;
    },
    resetCorrelationDetailsEdits() {
      if (this.correlationDetails && this.correlationDetails.data) {
        Object.assign(this.localCorrelationDetails, this.correlationDetails.data);
        this.errors = [...this.correlationDetails.errors];
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ranges {
  align-items: center;
  flex-direction: column;
  display: flex;
  justify-content: space-between;

  .range-indicator {
    border-left: solid 3rem;
    width: 100%;
    position: relative;
    @include carbon--breakpoint("lg") {
      height: 4rem;
    }
    // smaller screens
    height: 10rem;

    &.below-recommended {
      border-color: $flow-low;
      background: transparentize($flow-low, 0.4);
    }
    &.low-runnable {
      border-color: $low-runnable;
      background: transparentize($low-runnable, 0.4);
    }
    &.medium-runnable {
      border-color: $med-runnable;
      background: transparentize($med-runnable, 0.4);
    }
    &.high-runnable {
      border-color: $high-runnable;
      background: transparentize($high-runnable, 0.4);
    }
    &.above-recommended {
      border-color: $flow-high;
      background: transparentize($flow-high, 0.4);
    }


    .band-label {
      position: absolute;
      top: 0;
      right: 0;
      padding: 2px;
      color: white;
    }

    .range-fields {
      float: right;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-end;
      text-align: right;
      height: 100%;

      @include carbon--breakpoint("lg") {
        padding-bottom:0;
      }
      // smaller screens
      padding-bottom:1rem;

      input.range-comment {
        width: 16rem;
      }

      input.range-adjusted-grade {
        margin-left: 5px;
        width: 4rem;
      }
    }

    .inflection-point {
      position: absolute;
      bottom: -1rem;
      left: -3rem;
      background: transparentize(#f4f7fb, 0.4);
      display: block;
      padding: 5px;
      z-index: 1000;

      label {
        margin-right: 0.5rem;
      }

      input {
        text-align: center;
        background: white;
        color: black;
        width: 6rem;
        height: 1rem;
        line-height: 1rem;
      }
    }
  }

}
</style>