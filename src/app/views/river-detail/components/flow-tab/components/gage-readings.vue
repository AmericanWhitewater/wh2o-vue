<template>
  <section class="mt-3 mb-lg">
    <div
      v-if="!loading && data"
      class="bx--data-table-container"
    >
      <table class="bx--data-table">
        <thead>
          <tr>
            <th>
              Flow Rate
            </th>
            <th>
              Date / Time
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(r, rowIndex) in data.slice(0, 10)"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <td v-text="`${Math.floor(r.reading)} [${metric}]`" />
            <td>{{ formatDate(r.updated) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <utility-block
      v-if="loading"
      state="loading"
    />
    <utility-block
      v-if="!loading && error"
      state="error"
    />
  </section>
</template>
<script>
import Moment from 'moment'
import { mapState } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
export default {
  name: 'gage-readings',
  components: {
    UtilityBlock
  },
  data: () => ({
    columns: ['Reading', 'Updated']
  }),
  computed: {
    ...mapState({
      data: state => state.GageReadings.data,
      loading: state => state.GageReadings.loading,
      error: state => state.GageReadings.error,
      metrics: state => state.GageMetrics.data
    }),
    metric () {
      return this?.metrics.find(m => m.id === this.data[0].metric.toString()).unit
    }
  },
  methods: {

    formatDate (date) {
      return Moment.unix(date).format('llll')
    }
  },
  created () {}
}
</script>
