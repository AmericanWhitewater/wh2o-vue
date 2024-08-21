<template>
  <div class="bx--tile correlation-details mb-spacing-lg">
    <div class="mb-xs">
      <h3>{{ correlation.gaugeInfo.name }} ({{ correlation.gaugeInfo.gaugeSource }}-{{  correlation.gaugeInfo.gaugeSourceIdentifier }})</h3>
    </div>
    <div class="gauge-subheader">
      <div>
        <cv-select
          v-if="editing"
          v-model="localCorrelationDetails.metric"
          inline
          label="Flow Metric"
        >
          <cv-select-option
            v-for="metric in correlationMetrics"
            :key="metric.key"
            :value="metric.key"
            >{{ metric.name }}
          </cv-select-option>
        </cv-select>
        <label v-else for="metric">Flow Metric: {{ correlationDetails ? correlationDetails.metric : "none set" }}</label>

        <div>
          <label for="isPrimary">Primary Gauge</label>
          <input v-model="isPrimary" type="checkbox" :disabled="!editing" >
        </div>
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
      <div v-if="correlation.migrationErrorExplanation" class="migration-errors">
        <p>
          <em>
            We recently made major updates to our technical gauge infrastructure. We weren't able to migrate
            all of the old data to the new system; these errors represent issues found during the migration process
            and can be fixed by editing the range here with the new system.
          </em>
        </p>
        <p>{{ correlation.migrationErrorExplanation }}</p>
      </div>
      <div v-if="errors.length" class="errors">
        <h6>Please fix the errors below</h6>
        <ul class="error-list">
          <li v-for="(e, i) in errors" :key="`error-${i}`" v-text="e" />
        </ul>
      </div>
      <p>
        <em>
          Note: all range values are now required.
        </em>
      </p>
      <p v-if="!correlationDetails && !editing">
        No ranges defined.
      </p>
      <div v-else>
        <div class="ranges">
          <div v-for="(range, i) in ranges" :key="`range-${i}`" :class="`range-indicator ${range.rangeClass}`">
            <div v-if="range.inflectionPointField" class="inflection-point">
              <label :for="range.inflectionPointField">{{ range.inflectionPointFieldLabel }}:</label>
              <span v-if="!editing">{{ correlationDetails[range.inflectionPointField] }}</span>
              <input v-else v-model.number="localCorrelationDetails[range.inflectionPointField]" type="text" class="bx--text-input">
              <span>{{ editing ? localCorrelationDetails.metric : correlationDetails.metric }}</span>
            </div>
            <div class="band-label">
              {{ range.label }}
              <cv-tag v-if="correlationDetails[range.adjustedDifficultyField] && !editing" :label="apiGradeEnum[correlationDetails[range.adjustedDifficultyField]]" />
            </div>
            <div class="range-fields">
              <template v-if="editing">
                <cv-text-input v-model="localCorrelationDetails[range.rangeCommentField]" label="Range comment" class="range-comment" inline />
                <template v-if="range.adjustedDifficultyField">
                  <cv-select
                    v-model="localCorrelationDetails[range.adjustedDifficultyField]"
                    label="Change difficulty with flow"
                    class="range-adjusted-difficulty"
                    inline
                  >
                    <cv-select-option value="">
                      N/A
                    </cv-select-option>
                    <cv-select-option
                      v-for="k,v in apiGradeEnum"
                      :key="v"
                      :value="v"
                    >
                      {{ k }}
                    </cv-select-option>
                  </cv-select>
                </template>
              </template>
              <template v-else>
                <label v-if="correlationDetails[range.rangeCommentField]" :for="range.rangeCommentField" class="bx--label">
                  {{ correlationDetails[range.rangeCommentField] }}
                </label>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirm-delete-modal ref="confirmDeleteModal" />
  </div>
</template>

<script>
import { gaugeClient } from '@/app/services';
import { ConfirmDeleteModal } from '@/app/global/components';
import { reachApiHelper } from '@/app/global/mixins'

export default {
  name: 'correlation-details',
  components: {
    ConfirmDeleteModal
  },
  mixins: [reachApiHelper],
  props: {
    correlation: {
      type: Object
    },
  },
  data: () => ({
      // vue 2 doesn't detect when new props are added to an object,
      // so we need to enumerate all props for the watcher to work properly
      localCorrelationDetails: {
        metric: null,
        belowRecommendedRangeComment: null,
        lowRunnableRangeComment: null,
        mediumRunnableRangeComment: null,
        highRunnableRangeComment: null,
        aboveRecommendedRangeComment: null,
        lowRunnableAdjustedDifficulty: null,
        highRunnableAdjustedDifficulty: null,
        beginLowRunnable: null,
        beginMediumRunnable: null,
        beginHighRunnable: null,
        endHighRunnable: null,
      },
      isPrimary: undefined,
      errors: [],
      editing: false,
      ranges: [
        {
          rangeClass: "above-recommended",
          label: "above recommended",
          inflectionPointField: "endHighRunnable",
          inflectionPointFieldLabel: "Upper limit of high runnable",
          rangeCommentField: "aboveRecommendedRangeComment",
          adjustedDifficultyField: null
        },
        {
          rangeClass: "high-runnable",
          label: "high runnable",
          inflectionPointField: "beginHighRunnable",
          inflectionPointFieldLabel: "Upper limit of medium runnable",
          rangeCommentField: "highRunnableRangeComment",
          adjustedDifficultyField: "highRunnableAdjustedDifficulty"
        },
        {
          rangeClass: "medium-runnable",
          label: "medium runnable",
          inflectionPointField: "beginMediumRunnable",
          inflectionPointFieldLabel: "Upper limit of low runnable",
          rangeCommentField: "mediumRunnableRangeComment",
          adjustedDifficultyField: null
        },
        {
          rangeClass: "low-runnable",
          label: "low runnable",
          inflectionPointField: "beginLowRunnable",
          inflectionPointFieldLabel: "Lower limit of runnable",
          rangeCommentField: "lowRunnableRangeComment",
          adjustedDifficultyField: "lowRunnableAdjustedDifficulty"
        },
        {
          rangeClass: "below-recommended",
          label: "below recommended",
          inflectionPointField: null,
          inflectionPointFieldLabel: null,
          rangeCommentField: "belowRecommendedRangeComment",
          adjustedDifficultyField: null
        },
      ]
  }),
  computed: {
    correlationDetails() {
      return this.correlation?.correlationDetails;
    },
    processedGaugeCorrelation() {
      const processedDetails = Object.assign({}, this.localCorrelationDetails);
      ["lowRunnableAdjustedDifficulty", "highRunnableAdjustedDifficulty"].forEach(field => {
        processedDetails[field] = processedDetails[field].length ? processedDetails[field] : null;
      });

      return {
        reachID: this.reachId,
        gaugeSource: this.correlation?.gaugeInfo.gaugeSource,
        gaugeSourceIdentifier: this.correlation?.gaugeInfo.gaugeSourceIdentifier,
        forcePrimary: this.isPrimary ? 'force-primary' : null,
        correlationDetails: processedDetails
      }
    },
    reachId() {
      return this.$route.params.id;
    },
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
      // TODO: implement some kind of real error handling strategy in these calls
      // TODO: make backend accept null values for unset vars, or refactor to not send them
      // TODO: investigate why we are getting "USGS" as gauge source when the backend validates it as "usgs"
      try {
        const updatedCorr = await gaugeClient.upsertGaugeCorrelationToReach.mutate(this.processedGaugeCorrelation);
        this.$emit('saved', updatedCorr);
        this.editing = false;
      } catch (error) {
        // TODO: log this somehow, or get better errors returned from backend?
        this.errors = [error];
      }
    },
    async triggerCorrelationDelete() {
      const ok = await this.$refs.confirmDeleteModal.show({
        title: "Delete Gauge Correlation",
        message: "This will delete the correlation between this reach and this gauge. Are you sure?",
      });

      if (ok) {
        await gaugeClient.deleteGaugeCorrelationFromReach.mutate({
          reachID: this.reachId,
          gaugeSource: this.correlation.gaugeInfo.gaugeSource,
          gaugeSourceIdentifier: this.correlation.gaugeInfo.gaugeSourceIdentifier
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
      if (this.correlationDetails) {
        Object.assign(this.localCorrelationDetails, this.correlationDetails);
        ['beginLowRunnable', 'beginMediumRunnable', 'beginHighRunnable', 'endHighRunnable'].forEach(k => {
          // API gives us decimal.js objects, but gets upset if we return them...
          if (this.localCorrelationDetails[k] && typeof(this.localCorrelationDetails[k]) === 'object') {
            this.localCorrelationDetails[k] = this.localCorrelationDetails[k].toNumber();
          }
        });
        this.isPrimary = this.correlation.isPrimary;
        // TODO: handle save errors
        // this.errors = [...this.correlationDetails.errors];
      }
    }
  }
}
</script>
<style lang="scss">
.correlation-details {
    f4f7fb
  .gauge-subheader {
    // carbon sets this transparent, but since it's on a grey background we to set it white
    .cv-select .bx--select-input__wrapper select {
      background-color: white;
    }

    display: flex;
    justify-content: space-between;
  }

  .migration-errors {
    padding: 1rem;
    margin: 1rem;
    background: #fdd13a; // matches carbon warning color
  }

  .errors {
    padding: 1rem;
    margin: 1rem;
    background: rgba(255,0,0,0.25);

    h6 {
      min-width: 30%;
    }

    em {
      font-size: 0.75rem;
    }

    ul {
      margin-left: 2rem;
      list-style-type: disc;
    }
  }

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
        height: 7.5rem;
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
        margin-top:23px;
        float: right;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-end;
        text-align: right;
        height: calc(100% - 23px);

        .bx--form-item.bx--text-input-wrapper {
          flex-direction: row;
          align-items: center;

          .bx--text-input__field-wrapper {
            min-width: 15rem;
          }

          .bx--label {
            text-align: left;
            margin: 0 0.5rem 0 0;
            white-space: nowrap;
          }
        }

        input.range-comment {          
          width: 16rem;
        }

        // carbon sets this transparent, but since it's on a colored background we to set it grey
        // to match the (carbon) text inputs next to it
        .cv-select .bx--select-input__wrapper select {
          background-color: #f4f7fb;
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
}
</style>