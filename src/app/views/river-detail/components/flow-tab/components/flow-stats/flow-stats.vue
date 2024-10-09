<template>
  <div class="flow-stats bx--row mb-spacing-md">
    <div class="bx--col">
      <h6 class="mb-spacing-2xs">
        Current
      </h6>
      <h3 v-if="!loading && stats">
        {{ stats.current || 'n/a' }}
      </h3>
      <cv-skeleton-text
          v-if="loading"
          headline
      />
    </div>
    <div class="bx--col">
      <h6 class="mb-spacing-2xs">
        Average
      </h6>
      <h3 v-if="!loading && stats">
        {{ stats.avg || 'n/a' }}
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
      <h3 v-if="!loading && stats">
        {{ stats.max || 'n/a' }}
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
      <h3 v-if="!loading && stats">
        {{ stats.min || 'n/a' }}
      </h3>
      <cv-skeleton-text
          v-if="loading"
          headline
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'flow-stats',
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    readings: {
      type: Array,
      required: true,
      default: () => []
    },
    metric: {
      type: Object,
      required: true
    },
  },
  computed: {
    stats () {
      if (this.readings.length) {
        const data = this.readings.map(r => r.value.toNumber())

        const readingsSum = data.reduce((a, reading) =>
            Number(a) + Number(reading), 0
        )

        return {
          current: this.formatWithMetric(data.at(-1)),
          min: this.formatWithMetric(Math.min(...data)),
          max: this.formatWithMetric(Math.max(...data)),
          avg: this.formatWithMetric((readingsSum / data.length).toFixed(0))
        }
      }
      return null
    }
  },
  methods: {
    formatWithMetric(value) {
      return `${value} ${this.metric.unit}`
    }
  }
}
</script>
