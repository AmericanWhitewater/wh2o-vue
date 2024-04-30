<template>
  <div class="level-legend">
    <h6 class="mb-spacing-sm">Level Legend</h6>
    <ul class="level-legend-grid">
      <li v-for="(entry,i) in legendEntries" :key="`legend-${i}`" class="label bx--type-caption">
        <svg
            :class="entry.colorClass"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
        >
          <g fill="">
            <rect width="16" height="16" rx="1" ry="1" fill=""/>
          </g>
        </svg>

        <span v-html="entry.gtOrLtSymbol" />
        <em>{{  entry.value }} {{ correlationDetails.flowMetric }}</em>
        {{ entry.label }}
        <div class="range-description">
          <span v-if="entry.adjustedComment" v-text="entry.adjustedComment" />
          <span v-if="entry.adjustedGrade" v-text="entry.adjustedGrade" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'level-legend',
  props: {
    gaugeCorrelation: {
      type: Object,
      required: true
    }
  },
  computed: {
    correlationDetails() {
      return this.gaugeCorrelation?.correlationDetails?.data;
    },
    legendEntries() {
      if (!this.correlationDetails) {
        return [];
      }
      return [{ // TODO: sort out how to deal with Decimal.Js object
        value: this.correlationDetails.endHighRunnable?.toFixed(2),
        colorClass: 'above-recommended',
        gtOrLtSymbol: "&gt;",
        label: "Above Recommended",
        adjustedComment: this.correlationDetails.aboveRecommendedRangeComment,
        adjustedGrade: null
      }, {
        value: this.correlationDetails.beginHighRunnable?.toFixed(2),
        colorClass: 'high-runnable',
        gtOrLtSymbol: "&gt;",
        label: "High Runnable",
        adjustedComment: this.correlationDetails.highRunnableRangeComment,
        adjustedGrade: this.correlationDetails.highRunnableAdjustedGrade,
      }, {
        value: this.correlationDetails.beginMediumRunnable?.toFixed(2),
        colorClass: 'runnable',
        gtOrLtSymbol: "&gt;",
        label: "Medium Runnable",
        adjustedComment: this.correlationDetails.mediumRunnableRangeComment,
        adjustedGrade: null
      }, {
        value: this.correlationDetails.beginLowRunnable?.toFixed(2),
        colorClass: 'low-runnable',
        gtOrLtSymbol: "&gt;",
        label: "Low Recommended",
        adjustedComment: this.correlationDetails.lowRunnableRangeComment,
        adjustedGrade: this.correlationDetails.lowRunnableAdjustedGrade,
      }, {
        value: this.correlationDetails.beginLowRunnable?.toFixed(2),
        colorClass: 'below-recommended',
        gtOrLtSymbol: "&lt;",
        label: "Below Recommended",
        adjustedComment: this.correlationDetails.belowRecommendedRangeComment,
      }].filter(x => x.value);
    },
  },
}
</script>
<style lang="scss" scoped>

ul {
  li {
    margin-bottom: $spacing-xs;

    .above-recommended {
      fill: $flow-high;
    }

    .high-runnable {
      fill: $high-runnable;
    }

    .runnable {
      fill: $med-runnable;
    }

    .low-runnable {
      fill: $low-runnable;
    }

    .below-recommended {
      fill: $flow-low;
    }

    svg {
      margin-right: 8px;
      vertical-align: top;
    }

    &:nth-child(5) {
      margin-bottom: $spacing-md;
    }
  }
}
</style>
