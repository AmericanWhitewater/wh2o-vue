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
        <label v-else for="metric">Flow Metric: {{ correlationDetails ? correlationMetrics[correlationDetails.metric].name : "none set" }}</label>

        <div>
          <label for="isPrimary">Primary Gauge</label>
          <input v-model="isPrimary" type="checkbox" :disabled="!editing" >
        </div>
      </div>
      <div>
        <template v-if="editing">
          <cv-button
            :disabled="saving"
            kind="primary"
            size="small"
            @click.exact="saveCorrelation()"
            @keydown.enter="saveCorrelation()"
          >
            Save
          </cv-button>
          <cv-button
            kind="danger"
            size="small"
            @click="cancelCorrelationEdit()"
            @keydown.enter="cancelCorrelationEdit()">
            Cancel
          </cv-button>
          <cv-inline-loading
            v-if="saving"
            loading-text="Saving..."
            state="loading"
          />
        </template>
        <template v-else>
          <cv-button
            kind="secondary"
            size="small"
            @click.exact="editing = true"
            @keydown.enter="editing = true">
            Edit
          </cv-button>
          <cv-button
            id="delete-button"
            kind="danger"
            size="small"
            @click="triggerCorrelationDelete()"
            @keydown.enter="triggerCorrelationDelete()">
            Remove
          </cv-button>
        </template>
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
            <div :class="['range-details', editing ? 'editing' : '']">
              <h6>{{ range.label }}&nbsp;</h6>
              <p class="description">{{ range.description }}</p>
            </div>
            <div v-if="range.inflectionPointField" class="inflection-point">
              <label :for="range.inflectionPointField">{{ range.inflectionPointFieldLabel }}:</label>
              <template v-if="editing">
                <input v-model.number="localCorrelationDetails[range.inflectionPointField]" type="text" class="bx--text-input">
                <span>{{ correlationMetrics[localCorrelationDetails.metric].name }}</span>
              </template>
              <template v-else>
                <span>{{ correlationDetails[range.inflectionPointField] }} </span>
                <span>{{ correlationMetrics[correlationDetails.metric].name }}</span>
              </template>
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
                <label v-if="correlationDetails[range.adjustedDifficultyField]" class="bx--label">
                  Adjusts to:
                  <cv-tag v-if="correlationDetails[range.adjustedDifficultyField]" :label="apiGradeEnum[correlationDetails[range.adjustedDifficultyField]]" />
                </label>
                
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
        metric: 'cfs', // default value
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
      saving: false,
      errors: [],
      editing: false,
      ranges: [
        {
          rangeClass: "above-recommended",
          label: "Above Recommended",
          fromField: "endHighRunnable",
          inflectionPointField: "endHighRunnable",
          inflectionPointFieldLabel: "Upper limit of high runnable",
          rangeCommentField: "aboveRecommendedRangeComment",
          adjustedDifficultyField: null,
          description: "The river in this range is unacceptably high for a majority of paddlers, even those seeking a high water experience, and is above the recommended flow. Rivers that are too high may possess compounding risk factors, washed-out features that are no longer enjoyable, pollution and debris, or other factors that make them unappealing in this range for most paddlers."
        },
        {
          rangeClass: "high-runnable",
          label: "High Runnable",
          fromField: "beginHighRunnable",
          toField: "endHighRunnable",
          inflectionPointField: "beginHighRunnable",
          inflectionPointFieldLabel: "Upper limit of medium runnable",
          rangeCommentField: "highRunnableRangeComment",
          adjustedDifficultyField: "highRunnableAdjustedDifficulty",
          description: "The river in this range will typically offer paddlers a high challenge trip associated with more powerful, fast, and complex currents, relatively large waves and holes, and fewer eddies. Most paddlers seeking a high challenge, high water experience will enjoy the river in this range and would return in this range."
        },
        {
          rangeClass: "medium-runnable",
          label: "Medium Runnable",
          fromField: "beginMediumRunnable",
          endField: "beginHighRunnable",
          inflectionPointField: "beginMediumRunnable",
          inflectionPointFieldLabel: "Upper limit of low runnable",
          rangeCommentField: "mediumRunnableRangeComment",
          adjustedDifficultyField: null,
          description: "The river in this range offers paddlers a standard paddling experience, generally encompassing the optimal flow range for most paddlers and an experience true to the listed difficulty of the run. In this range the river will generally offer eddies and relatively moderate sized waves and holes, without the rock hits of low water or high velocities of high water."
        },
        {
          rangeClass: "low-runnable",
          label: "Low Runnable",
          fromField: "beginLowRunnable",
          toField: "beginMediumRunnable",
          inflectionPointField: "beginLowRunnable",
          inflectionPointFieldLabel: "Lower limit of runnable",
          rangeCommentField: "lowRunnableRangeComment",
          adjustedDifficultyField: "lowRunnableAdjustedDifficulty",
          description: "The river in this range offers a relatively technical paddling experience in which whitewater features like waves and holes are generally less powerful, avoiding rocks is more challenging, water velocities are lower, and the river may be shallow at times. Most paddlers seeking a technical experience will enjoy the river in this range and would return in this range."
        },
        {
          rangeClass: "below-recommended",
          label: "Below Recommended",
          toField: "beginLowRunnable",
          inflectionPointField: null,
          inflectionPointFieldLabel: null,
          rangeCommentField: "belowRecommendedRangeComment",
          adjustedDifficultyField: null,
          description: "The river in this range is below the recommended flow, indicating that even a majority of paddlers seeking a technical low-water paddling trip would not enjoy the river, would have difficulty navigating the river, and would be unlikely to return at this flow. Flows in this category are below the minimum acceptable flow for most people."
        },
      ]
  }),
  computed: {
    correlationDetails() {
      return this.correlation?.correlationDetails;
    },
    processedGaugeCorrelation() {
      const processedDetails = Object.assign({}, this.localCorrelationDetails);
      // send nulls instead of empty strings
      Object.keys(this.localCorrelationDetails).forEach(field => {
        if (typeof(processedDetails[field]) === "string") {
          processedDetails[field] = processedDetails[field].length ? processedDetails[field] : null;
        }
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
      if (!this.validateForm()) {
        return;
      }
      // TODO: implement some kind of real error handling strategy in these calls
      // TODO: make backend accept null values for unset vars, or refactor to not send them
      this.saving = true;
      try {
        const updatedCorr = await gaugeClient.upsertGaugeCorrelationToReach.mutate(this.processedGaugeCorrelation);
        this.$emit('saved', updatedCorr);
        this.editing = false;
      } catch (error) {
        // TODO: log this somehow, or get better errors returned from backend?
        this.errors = [error];
      }
      this.saving = false;
    },
    validateForm() {
      this.errors = [];
      // validate presence of inflection points
      this.ranges.forEach(range => {
        // skip for range that does not have inflection point
        if (!range.inflectionPointField) {
          return;
        }

        const inflectionPoint = this.localCorrelationDetails[range.inflectionPointField];
        if (!inflectionPoint) {
          this.errors.push(`${range.inflectionPointFieldLabel} must be set`)
        } else if (isNaN(inflectionPoint)) {
          this.errors.push(`${range.inflectionPointFieldLabel} must be a number`)
        }
      });

      // confirm that the inflection points are in correct relation with each other
      if (this.localCorrelationDetails.endHighRunnable <= this.localCorrelationDetails.beginHighRunnable) {
        this.errors.push('Upper limit of high runnable must be greater than Upper limit of medium runnable');
      }
      if (this.localCorrelationDetails.beginHighRunnable <= this.localCorrelationDetails.beginMediumRunnable) {
        this.errors.push('Upper limit of medium runnable must be greater than Upper limit of low runnable');
      }
      if (this.localCorrelationDetails.beginMediumRunnable <= this.localCorrelationDetails.beginLowRunnable) {
        this.errors.push('Upper limit of low runnable must be greater than Lower limit of runnable');
      }

      if (this.errors.length) {
        return false;
      }

      return true;
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
        float: right;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-end;
        text-align: right;
        height: 100%;

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

      .range-details {

        .description {
          display: none; // hide on small screens
        }
        float: left;
        margin-left: -3rem;
        max-width: 600px;
        padding: 1rem 0;

        h6 {
          display: inline-block;
        }

        p {
          font-size: 12px;
          line-height: 1rem;
          font-style: italic;
        }

        &.editing {
          width: calc(100% - 350px);
          
          p {
            font-size: 11px;
          }
        }

        @include carbon--breakpoint("md") {
          .description {
            display: inline;
          }
          height: 100%;
          width: calc(100% - 160px);
        }

        @include carbon--breakpoint("lg") {
          &.editing {
            p {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>