<template>
  <div class="flow-stats bx--row mb-spacing-md">
    <div class="bx--col">
      <h6 class="mb-spacing-2xs">
        Avg
      </h6>
      <h3 v-if="!loading">
        {{ avg || "n/a" }}
      </h3>
      <cv-skeleton-text
        v-if="loading"
        headline
      />
    </div>
    <div class="bx--col">
      <h6 class="mb-spacing-2xs">
        High
      </h6>
      <h3 v-if="!loading">
        {{ max || "n/a" }}
      </h3>
      <cv-skeleton-text
        v-if="loading"
        headline
      />
    </div>
    <div class="bx--col">
      <h6 class="mb-spacing-2xs">
        Low
      </h6>
      <h3 v-if="!loading">
        {{ min || "n/a" }}
      </h3>
      <cv-skeleton-text
        v-if="loading"
        headline
      />
    </div>
  </div>
</template>
<script>
import { formatStats } from './format-stats'
export default {
  name: 'flow-stats',
  setup (props) {
    const { min, avg, max } = formatStats(props.readings)

    return { min, avg, max }
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    readings: {
      type: Array,
      required: true,
      default: () => []
    }
  }

}
</script>
