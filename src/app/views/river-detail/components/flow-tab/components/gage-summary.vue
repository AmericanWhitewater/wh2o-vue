<template>
  <div class="border" @click.stop='select'>
    <div :class="[{'selected':selected},getClass(gage.rc) ]" class="gage-grid">
      <div class="gage-name">{{ gage.gauge.name }}</div>
      <div class="gage-comment">{{ gage.gauge.gauge_comment }}</div>
      <div class='gage-reading-header header'>Reading</div>
      <div class="gage-range-header header">Range</div>
      <div class="gage-class-header header">Adjusted Difficulty</div>
      <div :class="`gage-reading background`">{{
          formatReading(gage.gauge_reading, gage.gauge_metric)
        }} {{ formatMetric(gage.gauge_metric) }} @ {{ formatTime(gage.epoch) }}
      </div>
      <div class="gage-range">{{ formatFlowRange(gage.rmin, gage.rmax, gage.gauge_metric) }}</div>
      <div class="gage-class"><span v-if="gage.adjusted_reach_class">Adjusted Class {{
          gage.adjusted_reach_class
        }}</span></div>
      <div class="range-comment background"><span
          v-if="gage.range_comment">{{ gage.range_comment }}</span>
      </div>
      <div class="gage-comment background">
        <template v-if="selected">
          <slot/>
        </template>
        <template v-if="!selected">
          <slot name="unselected"/>
        </template>
      </div>

    </div>
  </div>

</template>

<script>
import * as gage_functions from './utils/'

export default {
  name: 'gage-summary',
  props: {
    gage: {
      type: Object,
      required: true
    }, //of gauge from reach
    metrics: {
      type: Array,
      required: true
    }, //of metrics
    selected: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({}),
  methods: {
    ...gage_functions,
    select () {
      if(!this.selected)
      {
        this.$emit('select', this.gage)

      }

    },
    getClass (rc) {
      if (rc < 0.0) {
        return ('too-lo')
      }
      if (rc <= 0.33) {
        return ('lo')
      }
      if (rc <= 0.66) {
        return ('med')
      }
      if (rc <= 1) {
        return ('hi')
      }
      if (rc > 1) {
        return ('too-hi')
      }
    }
  }
}
</script>

<style scoped lang="scss">


.gage-grid {

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 1em;
  cursor: pointer;


  &.selected {
    border: darkgreen thin solid;
    margin-bottom: .5em;
    margin-top: .5em;
  }


  .gage-name {
    font-size: larger;
  }

  .gage-name,
  .header {
    font-weight: bolder;
  }

  .gage-name,
  .gage-comment,
  .range-comment {
    grid-column: 1/4;

  }

  &.too-lo, .too-lo {
    border-left: $flow-low 1em solid;

  }

  &.too-hi, .too-hi {
    border-left: $high-runnable 1em solid;

  }

  &.lo, .lo {
    border-left: $low-runnable 1em solid;
  }

  &.med, .med {
    border-left: $med-runnable 1em solid;

  }

  &.hi, .hi {
    border-left: $high-runnable 1em solid;
  }

}
</style>
