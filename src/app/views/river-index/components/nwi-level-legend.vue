<template>
  <div class="level-legend" :style="`top: ${top}px;`">
    <div class="legend-label"><h6>Level Legend</h6></div>
    <div class="below-recommended"><h6>Below Recommended</h6></div>
    <div class="low-runnable"><h6>Low Runnable</h6></div>
    <div class="medium-runnable"><h6>Medium Runnable</h6></div>
    <div class="high-runnable"><h6>High Runnable</h6></div>
    <div class="above-recommended"><h6>Above Recommended</h6></div>
  </div>
</template>

<script>
export default {
  name: 'nwi-level-legend',
  props: {
    top: {
      type: Number,
      required: false,
      default: 0
    }
  }
}
</script>

<style lang="scss">
.level-legend {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 3rem; // same as .bx--data-table tr
  position: sticky;
  top: 0px;
  z-index: 1;

  div {
    align-content: center;
    text-align: center;
    background: $ui-03;

    h6 {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    width: 20%; // small screens
    &.legend-label {
      display: none;
    }

    // normal screens
    @include carbon--breakpoint("md") {
      width: 16.67%;
      &.legend-label {
        display: block;
      }
    }

    @each $class, $color in $flow-map {
      &.#{$class} {
        background: $color;
      }
    }
  }
}
</style>