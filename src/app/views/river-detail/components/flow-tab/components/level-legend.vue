<!--
takes a range[] (see getEmptyRange for model)
-->
<template>
  <div>
    <div class="level-legend">
      <h6 class="mb-spacing-sm">Level Legend</h6>
      <ul v-if="ranges" class="level-legend-grid">

        <li v-for="(item ) in chart"

            :key="`${ item.level }${ item.range && item.range.min }${ item.range && item.range.max }${ item.color}`"
            class="label bx--type-caption"
        >
          <range-box :color-class="item.color"/>
          <span v-if="item.isGt">&gt;</span>
          <span v-if="item.isLt">&lt;</span>
          <em>{{ formatValue(item.level) }}</em>
          {{ item.legend }}
          <range-desc v-if="item.showRange" :range="item.range"/>
        </li>


      </ul>
      <span v-else>
        No runnable range defined on this gauge. Consider leaving a comment.
      </span>
    </div>

  </div>
</template>
<script>
import RangeBox from './range-box'
import RangeDesc from './range-desc'
import { formatReadingWithFormat } from '@/app/global/lib/gages'
import { difference, uniq } from 'lodash/array'
import { isEqual } from 'lodash'

export default {
  name: 'level-legend',
  components: {
    RangeBox,
    RangeDesc
  },
  props: {
    ranges: {
      type: Array,
      required: false,
      default: () => []
    },
    metric: {
      type: Object,
      required: true
    },
    gauge: {
      type: Object,
      required: true
    }
  },
  computed: {

    chart: function () {
      const rv = []
      //top down
      if (!this.missingVals.hasMax) {
        rv.push({
          legend: this.findLegendItem('above-recommended').label,
          color: 'above-recommended',
          range: null,
          level: this.missingVals.maxAmount,
          showRange: false,
          exclude: false,
          isGt: true,
          isLt: false
        })
      }

      if (this.filteredRanges.filter(x => x.range_min.match(/R/)).length === 1) {
        rv.push({
          legend: this.findLegendItem('runnable').label,
          color: 'runnable',
          range: this.filteredRanges.filter(x => x.range_min.match(/R/))[0],
          level: null,
          showRange: true,
          exclude: false,
          isGt: false,
          isLt: false
        })
      }
        for (let i = 0; i < this.enumeratedRanges.length; i++) {
          const item = this.enumeratedRanges[i]
          const rec = {
            legend: this.findLegendItem(item.class).label,
            color: item.class,
            range: item.range,
            level: item.val,
            showRange: false,
            exclude: false,
            isGt: i == 0 || (item.range && item.val == item.range.min),
            isLt: i == this.enumeratedRanges.length - 1 || (item.range && item.val == item.range.max),

          }

          if (rec.isGt && rec.isLt) {
            rec.exclude = true
          } else {

            // don't show range comments if the last value showed them.
            if (item.range && (!this.enumeratedRanges[i - 1] ||
                !isEqual(item?.range, this.enumeratedRanges[i - 1]?.range))) {
              rec.showRange = !!item.range

            }
            //this.enumeratedRanges[i + 1] && console.log(this.formatValue(item.val), this.formatValue(this.enumeratedRanges[i + 1].val))
            // don't show line if range top of last was the same as range bottom of this
            if (item.val && (!this.enumeratedRanges[i + 1] || this.formatValue(item.val) === this.formatValue(this.enumeratedRanges[i + 1].val))) {

              rec.exclude = true

            }

          }

          rv.push(rec)
        }


      if (!this.missingVals.hasMin) {
        rv.push({
          legend: this.findLegendItem('below-recommended').label,
          color: 'below-recommended',
          range: null,
          level: this.missingVals.minAmount,
          showRange: false,
          exclude: false,
          isGt: false,
          isLt: true
        })
      }
      return rv.filter(x => !x.exclude)

    },

    /**
     * Returns a min/max report to buffer the legend we produce.
     * @return {{minAmount: number, hasMin: boolean, maxAmount: number, hasMax: boolean}}
     */
    missingVals: function () {
      const rv = {
        hasMin: true,
        minAmount: 0,
        hasMax: true,
        maxAmount: 0
      }
      if (this.enumeratedRanges?.length) {
        const legend = this.legendItems.map(x => x.color_class)
        const rangesRepresented = uniq([...this.enumeratedRanges.map(x => x.min_class), ...this.enumeratedRanges.map(x => x.max_class)])
        const rangesMissing = difference(legend, rangesRepresented)
        if (rangesMissing.indexOf('below-recommended') >= 0) {
          rv.hasMin = false
          rv.minAmount = this.enumeratedRanges[this.enumeratedRanges.length - 1].val
        }
        if (rangesMissing.indexOf('above-recommended') >= 0) {
          rv.hasMax = false
          rv.maxAmount = this.enumeratedRanges[0].val
        }

      }
      return (rv)

    },
    filteredRanges: function () {
      return (this.ranges.filter(x => x.gauge_metric == this.metric.id && x.gauge_id == this.gauge.id))
    },
    enumeratedRanges: function () {
      function rangetoclass (range) {
        switch (range[0]) {
          case 'R':
            switch (range[1]) {
              case '0':
              case '1':
              case '2':
                return ('low-runnable')
              case '3':
              case '4':
              case '5':
                return ('runnable')
              case '6':
              case '7':
              case '8':
                return ('high-runnable')

            }
            return 'runnable'
          case 'H':
            return 'above-recommended'
          case 'L':
            return 'below-recommended'

        }
      }

      const mins = x => ({
        val: x.min,
        class: rangetoclass(x.range_min),
        min_class: rangetoclass(x.range_min),
        max_class: rangetoclass(x.range_max),
        range: x
      })

      const maxs = x => ({
        val: x.max,
        class: rangetoclass(x.range_max),
        min_class: rangetoclass(x.range_min),
        max_class: rangetoclass(x.range_max),
        range: x
      })
      return [...this.filteredRanges.map(mins), ...this.filteredRanges.map(maxs)].sort((x, y) => y.val - x.val)
    },
    legendItems: () => [
      {
        label: 'Above Recommended',
        color_class: 'above-recommended',
      },
      {
        label: 'High Runnable',
        color_class: 'high-runnable',
      },
      {
        label: 'Runnable',
        color_class: 'runnable',
      },
      {
        label: 'Low Runnable',
        color_class: 'low-runnable',
      },
      {
        label: 'Below Recommended',
        color_class: 'below-recommended',
      },
    ],

  },
  methods: {
    formatValue (n) {

      if (isNaN(parseFloat(n))) {
        return ``

      }
      return `${formatReadingWithFormat(n, this.metric?.format ?? '%2.2')} ${this.metric?.unit ?? ''} `

    },
    findLegendItem: function (i) {
      return this.legendItems.find(x => x.color_class === i) ?? {
        color_class: '',
        label: ''
      }

    }

  }

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
