<template>
  <span class>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <title v-text="status" />
      <g :class="status">
        <circle cx="8" cy="8" r="8" :class="status" />
      </g>
    </svg>
  </span>
</template>
<script>
export default {
  name: "flow-color-block",
  mixins: [],
  props: {
    reading: {
      type: String,
      required: true
    },
    min: {
      type: String,
      required: true
    },
    max: {
      type: String,
      required: true
    }
  },
  computed: {
    status() {
      if (this.reading >= this.min && this.reading <= this.max) {
        return "recommended";
      }
      if (this.reading < this.min) {
        return "low";
      }
      return "high";
    }
  }
};
</script>
<style lang="scss" scoped>
span {
  display: inline-block;
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
