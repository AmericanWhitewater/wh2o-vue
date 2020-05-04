<template functional>
  <div class="level-legend">
    <h6 class="mb-spacing-sm">
      Level Legend
    </h6>
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
            <rect
              width="16"
              height="16"
              rx="1"
              ry="1"
              fill=""
            />
          </g>
        </svg>
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'level-legend',
  legendItems: [
    {
      label: 'Above Recommended',
      color_class: 'above-recommended'
    },
    {
      label: 'High Runnable',
      color_class: 'high-runnable'
    },
    {
      label: 'Runnable',
      color_class: 'runnable'
    },
    {
      label: 'Low Runnable',
      color_class: 'low-runnable'

    },
    {
      label: 'Below Recommended',
      color_class: 'below-recommended'
    }
  ]
}
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
        fill: lighten($flow-medium, 15%);
      }
      .runnable {
        fill: $flow-medium;
      }
      .low-runnable {
        fill: darken($flow-medium, 15%);
      }
      .below-recommended {
        fill: $flow-low;
      }
      svg {
        vertical-align: top;
        margin-right: 8px;
      }

      &:nth-child(5) {
        margin-bottom: $spacing-md;
      }
    }
  }
}
</style>
