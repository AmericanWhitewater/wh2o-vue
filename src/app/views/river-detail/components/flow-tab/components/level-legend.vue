<!--
takes a range[] (see getEmptyRange for model)
-->
<template functional>
  <div class="level-legend">
    <h6 class="mb-spacing-sm">Level Legend</h6>
    <ul>
      <li
        v-for="(item, index) in $options.legendItems"
        :key="index"
        class="bx--type-caption"
      >
        <svg
          :class="item.color_class"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <g fill="">
            <rect width="16" height="16" rx="1" ry="1" fill="" />
          </g>
        </svg>
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "level-legend",
  props:{
    ranges: {type: Array, required:false, default:()=>[]}
  },
  computed:{
    function rangetoclass(range){
      switch(range[0])
      {
        case 'R':
          switch(range[1])
        {
          case '0':
          case '1':
          case '2':
            return ('low-runnable')
          case '3':
            case '4':
              case '5':
                return('runnable')
          case '6':
            case '7':
              case '8':
                return('high-runnable')


        }
          return 'runnable';
        case 'H':
          return 'above-recommended'
        case 'L':
          return 'below-recommended'

      }
    }
    const x=>({class:rangetoclass(x.range_min),value:x.min,range:x});


    const x = [
        ...this.ranges.map(x=>,...)

  },
  legendItems: [
    {
      label: "Above Recommended",
      color_class: "above-recommended",
    },
    {
      label: "High Runnable",
      color_class: "high-runnable",
    },
    {
      label: "Runnable",
      color_class: "runnable",
    },
    {
      label: "Low Runnable",
      color_class: "low-runnable",
    },
    {
      label: "Below Recommended",
      color_class: "below-recommended",
    },
  ],
};
</script>
<style lang="scss" scoped>
.level-legend {

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
}
</style>
