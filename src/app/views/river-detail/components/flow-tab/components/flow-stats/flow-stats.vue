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
import { formatReadingWithFormat, getEmptyMetric } from '@/app/global/lib/gages'

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
      required: false,
      default: () => getEmptyMetric()
    },
    current: {
      type: Number,
      required: false
    }
  },
  computed: {
    unit () {
      return this.metric.unit
    },

    stats () {
      if (this.readings.length) {

        const data = this.readings.map(r => r.reading)
        const readingsSum = data.reduce((a, reading) =>
            Number(a) + Number(reading), 0
        )

        return {
          current: this.format(this.current || this.readings[this.readings.length-1].reading),
          min: this.format(Math.min(...data, this.current)),
          max: this.format(Math.max(...data, this.current)),
          avg: this.format((readingsSum / data.length))
        }
      }
      return null
    }
  },
  methods: {
    format (reading) {
      return `${formatReadingWithFormat(reading, this.metric.format)} ${this.unit}`
    }
  }
}
</script>
