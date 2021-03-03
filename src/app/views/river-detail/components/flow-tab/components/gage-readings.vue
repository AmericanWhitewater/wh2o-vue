<template>
  <section class="mt-3 mb-lg">
    <div
        v-if="!loading && data"
        class="bx--data-table-container "

    >
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
            v-for="(r, rowIndex) in readings"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
        >
          <td v-text="`${ formatReading(r.reading) } ${metric.unit}`"/>
          <td>{{ formatDate(r.updated) }}</td>
          <td><span v-if="r.data" >{{ r.data}}</span></td>
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
import { formatReadingWithFormat, getEmptyMetric } from '@/app/global/lib/gages'
import { cloneDeep } from '@apollo/client/utilities'

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
      return this.metrics?.find(m => m.id === this.data[0].metric.toString()) ?? getEmptyMetric()
    },
    readings(){
      return cloneDeep(this.data ?? []).sort((a,b)=>b.updated-a.updated)
    }

  },
  methods: {
    formatReading (n) {

      return formatReadingWithFormat(n, this.metric.format)
    },
    formatDate (date) {
      return Moment.unix(date).format('llll')
    }
  },
  created () {
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
