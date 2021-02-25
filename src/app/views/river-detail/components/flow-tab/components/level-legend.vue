<!--
takes a range[] (see getEmptyRange for model)
-->
<template >
  <div>
  <div class="level-legend">
    <h6 class="mb-spacing-sm">Level Legend</h6>
    <ul>
      <li
          v-for="(item, index) in $options.legendItems"
          :key="index"
          class="bx--type-caption"
      >
        <range-box :color-class="item.color_class"/>
        {{ item.label }}
      </li>
    </ul>
  </div>
  <div>
    <ul>
      <li
          v-for="val in enumeratedRanges"
          :key="val.value"
      >
        <range-box :color-class="val.min_class"/>
        {{ val.range.min }}
        <range-box :color-class="val.max_class"/>
        {{ val.range.max}}
      </li>
    </ul>
  </div>
    </div>
</template>
<script>
import RangeBox from './range-box'


export default {
  name: 'level-legend',
  components: { RangeBox },
  props: {
    ranges: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {

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
        min_class: rangetoclass(x.range_min),
        max_class: rangetoclass(x.range_max),
        range: x
      })

      return [...this.ranges.map(mins)].sort((x, y) => x.value - y.value)
    }
  },
  legendItems: [
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
