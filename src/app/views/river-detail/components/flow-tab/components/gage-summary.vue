<template>
  <div class="border" @click.stop='select'>
    <div :class="[{'selected':selected},getClass(gage.rc) ]" class="gage-grid">
      <div class="gage-name">{{ gage.gauge.name }}</div>
      <div class="gage-comment">{{ gage.gauge.gauge_comment }}</div>
      <div class='gage-reading-header header'>Reading</div>
      <div class="gage-range-header header">Range</div>
      <div class="gage-class-header header">Difficulty</div>
      <div :class="`gage-reading background`">{{
          formatReading(gage.gauge_reading, gage.gauge_metric)
        }} {{ formatMetric(gage.gauge_metric) }} @ {{ formatEpoch(gage.epoch) }}
      </div>
      <div class="gage-range">{{ formatFlowRange(gage.rmin, gage.rmax, gage.gauge_metric) }}</div>
      <div class="gage-class"><span v-if="gage.adjusted_reach_class">Adjusted Class {{
          gage.adjusted_reach_class
        }}</span></div>
      <span class="gage-meta">
        <span v-if="!gage.exclude && gage.delay_update">When updated this gage will wait {{ parseFloat(gage.delay_update/(3600)).toFixed(1) }} hours prior to reporting on the summary page. </span>
        <span v-else-if="gage.exclude">When updated this gage will not report on the river summary page. </span>
        <span v-else>When updated this gage will immediately report on the summary page. </span>
        <span v-if="gage.time_adjustment >0">It takes {{ parseFloat(gage.time_adjustment/(3600)).toFixed(1) }} hours for water from this gauge to reach river. </span>
        <span v-if="gage.time_adjustment <0">Water reported on this gauge is {{ Math.abs(parseFloat(gage.time_adjustment/(3600))).toFixed(1) }} hours ahead of the river. </span>
      </span>

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
import { formatDate } from '@/app/global/mixins'

export default {
  name: 'gage-summary',
  mixins:{formatDate},
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
    formatEpoch: function(d){
      return this.formatDate(new Date(d*1000),'M/D H:mm a')
    },
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
  padding-left: .75em;
  padding-right: .75em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-bottom: 1em;
  cursor: pointer;

  div{
    padding-top: .3em;
    padding-bottom: .3em;
  }


  &.selected {
    border: darkgreen thin solid;
    margin-bottom: .5em;
    margin-top: .5em;
  }


  .gage-name {
    font-size: x-large;
  }

  .gage-name,
  .header {
    font-weight: bolder;
  }

  .gage-name,
  .gage-meta,
  .gage-comment,
  .range-comment {
    grid-column: 1/4;

  }

  &.too-lo, .too-lo {
    border-left: $flow-low 1em solid;

  }

  &.too-hi, .too-hi {
    border-left: $flow-high 1em solid;

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
