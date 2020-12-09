<template>
  <div class="flow-stats bx--row mb-spacing-md">
    <div class="bx--col">
      <h6 class="mb-spacing-2xs">
        Current
      </h6>
      <h3 v-if="!loading && current">
        {{ current.toFixed(metricFormatVal) || "n/a" }}
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
        {{ stats.avg || "n/a" }}
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
        {{ stats.max || "n/a" }}
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
        {{ stats.min || "n/a" }}
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
    current: {
      type: Number,
      required: false,
      default: 0
    },
    metricFormat: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    metricFormatVal() {
       if (this.metricFormat)
         return Number(this.metricFormat.match(/(?<=\.)(\d+)/g)[0] ?? 2)
      return 2;
    },
    stats () {
      if (this.readings.length) {
        let readingsSum = 0
        const data = this.readings.map(r => r.reading )
        data.forEach((reading) => {
          readingsSum = readingsSum + Number(reading)
        })
        return {
          min: Math.min(...data).toFixed(this.metricFormatVal),
          max: Math.max(...data).toFixed(this.metricFormatVal),
          avg: (readingsSum / data.length).toFixed(this.metricFormatVal)
        }
      }
      return null
    }
  }
}
</script>
