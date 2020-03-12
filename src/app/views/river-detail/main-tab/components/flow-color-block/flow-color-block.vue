<template>
  <cv-tooltip :tip="status">
    <span :class="status">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <title v-text="status" />
        <g :class="status">
          <circle
            cx="8"
            cy="8"
            r="8"
            :class="status"
          />
        </g>
      </svg>
    </span>
  </cv-tooltip>
</template>
<script>
export default {
  name: 'flow-color-block',
  mixins: [],
  props: {
    status: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
span {
  display: inline-block;
  width:2rem;
  height:2rem;
  margin-right: $spacing-xs;
  &.recommended {
    background-color: $flow-medium;
    box-shadow: 0px 0px 2px 1px $flow-medium;
  }
  &.low {
     background-color: $flow-low;
    box-shadow: 0px 0px 2px 1px $flow-low;
  }
  &.high {
     background-color: $flow-high;
    box-shadow: 0px 0px 2px 1px $flow-high;
  }
  svg {
    display: block;
  }
}
g,
circle {
  &.recommended {
    fill: $flow-medium;
  }
  &.low {
    fill: $flow-low;
  }
  &.high {
    fill: $flow-high;
  }
}
</style>
