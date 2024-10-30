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
        <em>
          {{ 
            `${!entry.to ? "&gt;" : ''}${entry.from ? entry.from : "&lt;" }` +
            `${(entry.to && entry.from) ? '-' : '' }` + (entry.to || '') +
            correlationMetrics[correlationDetails.metric].unit
          }}
        </em>
        {{ entry.label }}
        <div class="range-description">
          <span v-if="entry.adjustedComment" class="mr-spacing-sm" v-text="entry.adjustedComment" />
          <cv-tag
            v-if="entry.adjustedDifficulty"
            kind="cool-gray"
            :label="apiGradeEnum[entry.adjustedDifficulty]"
          />
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
      return this.gaugeCorrelation?.correlationDetails;
    },
    legendEntries() {
      if (!this.correlationDetails) {
        return [];
      }
      let entries = [{
        from: this.correlationDetails.endHighRunnable?.toNumber(),
        to: undefined,
        colorClass: 'above-recommended',
        label: "Above Recommended",
        adjustedComment: this.correlationDetails.aboveRecommendedRangeComment,
        adjustedDifficulty: null
      }];

      if (!this.correlationDetails.beginMediumRunnable && !this.correlationDetails.beginHighRunnable) {
        // per our migration plan some reaches will only have beginLowRunnable and endHighRunnable defined, not all five
        // handle this situation by establishing a "runnable" state rather than low/med/high
        entries.push({
          from: this.correlationDetails.beginLowRunnable?.toNumber(),
          to: this.correlationDetails.endHighRunnable?.toNumber(),
          colorClass: 'medium-runnable',
          label: "Runnable",
          adjustedComment: null,
          adjustedDifficulty: null
        });
      } else {
        entries.push({
          from: this.correlationDetails.beginHighRunnable?.toNumber(),
          to: this.correlationDetails.endHighRunnable?.toNumber(),
          colorClass: 'high-runnable',
          label: "High Runnable",
          adjustedComment: this.correlationDetails.highRunnableRangeComment,
          adjustedDifficulty: this.correlationDetails.highRunnableAdjustedDifficulty,
        }, {
          from: this.correlationDetails.beginMediumRunnable?.toNumber(),
          to: this.correlationDetails.beginHighRunnable?.toNumber(),
          colorClass: 'medium-runnable',
          label: "Medium Runnable",
          adjustedComment: this.correlationDetails.mediumRunnableRangeComment,
          adjustedDifficulty: null
        }, {
          from: this.correlationDetails.beginLowRunnable?.toNumber(),
          to: this.correlationDetails.beginMediumRunnable?.toNumber(),
          colorClass: 'low-runnable',
          label: "Low Runnable",
          adjustedComment: this.correlationDetails.lowRunnableRangeComment,
          adjustedDifficulty: this.correlationDetails.lowRunnableAdjustedDifficulty,
        });
      }
      entries.push({
        from: undefined,
        to: this.correlationDetails.beginLowRunnable?.toNumber(),
        colorClass: 'below-recommended',
        label: "Below Recommended",
        adjustedComment: this.correlationDetails.belowRecommendedRangeComment,
      });
      return entries;
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
