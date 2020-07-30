<template>
  <div class="flow-color-block">
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
  </div>
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
