<template>
  <section class="mt-3 mb-lg">
    <div class="bx--data-table-container">
      <table class="bx--data-table no-x-overflow scrollable">
        <thead>
        <tr>
          <th>
            Flow Rate
          </th>
          <th>
            Date / Time
          </th>
          <th>
            Data
          </th>
        </tr>
        </thead>
        <tbody class="gage-data-table">
        <tr
            v-for="(r, index) in reversedReadings"
            :key="`${index}`"
            :value="`${index}`"
        >
          <td v-text="`${r.value} ${metric.unit}`"/>
          <td>{{ formatDate(r) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script>
import moment from 'moment'

export default {
  name: 'gauge-readings',
  props: {
    readings: {
      type: Array,
      required: true
    },
    metric: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    columns: ['Reading', 'Updated'],
    reversedReadings: null
  }),
  methods: {
    formatReading (reading) {
      return `${reading.value} ${this.metric.unit}`
    },
    formatDate (reading) {
      return moment(reading.dateTime).format('MM/DD hh:mm a')
    }
  },
  created () {
    this.reversedReadings = this.readings.slice().reverse();
  }
}
</script>
<style scoped lang="scss">

.no-x-overflow
{
  overflow-x: hidden;
}

.scrollable {

  tbody{
    display: block;
    height: 30rem;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }

  thead tr{
    display: block;
  }
}

</style>
