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
        <em>{{  entry.value }} {{ correlationMetrics[correlationDetails.metric].unit }}</em>
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
import { reachApiHelper } from '@/app/global/mixins';

export default {
  name: 'level-legend',
  mixins: [reachApiHelper],
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
      return [{
        value: this.correlationDetails.endHighRunnable?.toNumber(),
        colorClass: 'above-recommended',
        gtOrLtSymbol: "&gt;",
        label: "Above Recommended",
        adjustedComment: this.correlationDetails.aboveRecommendedRangeComment,
        adjustedGrade: null
      }, {
        value: this.correlationDetails.beginHighRunnable?.toNumber(),
        colorClass: 'high-runnable',
        gtOrLtSymbol: "&gt;",
        label: "High Runnable",
        adjustedComment: this.correlationDetails.highRunnableRangeComment,
        adjustedGrade: this.correlationDetails.highRunnableAdjustedGrade,
      }, {
        value: this.correlationDetails.beginMediumRunnable?.toNumber(),
        colorClass: 'medium-runnable',
        gtOrLtSymbol: "&gt;",
        label: "Medium Runnable",
        adjustedComment: this.correlationDetails.mediumRunnableRangeComment,
        adjustedGrade: null
      }, {
        value: this.correlationDetails.beginLowRunnable?.toNumber(),
        colorClass: 'low-runnable',
        gtOrLtSymbol: "&gt;",
        label: "Low Recommended",
        adjustedComment: this.correlationDetails.lowRunnableRangeComment,
        adjustedGrade: this.correlationDetails.lowRunnableAdjustedGrade,
      }, {
        value: this.correlationDetails.beginLowRunnable?.toNumber(),
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

    @each $class, $color in $flow-map {
      .#{$class} {
        fill: $color;
      }
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
