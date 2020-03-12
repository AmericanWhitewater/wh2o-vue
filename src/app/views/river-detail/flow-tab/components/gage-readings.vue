<template>
  <section class="mt-3">
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
            <td v-text="`${Math.floor(r.reading)} [${r.metric}]`" />
            <td>{{ formatDate(r.updated) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <loading-block v-if="loading" />
    <error-block v-if="!loading && error" />
  </section>
</template>
<script>
import Moment from 'moment'
import { mapState } from 'vuex'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'
export default {
  name: 'gage-readings',
  components: {
    LoadingBlock,
    ErrorBlock
  },
  data: () => ({
    columns: ['Reading', 'Updated']
  }),
  computed: {
    ...mapState({
      data: state => state.riverDetailState.gageReadingsData.data,
      loading: state => state.riverDetailState.gageReadingsData.loading,
      error: state => state.riverDetailState.gageReadingsData.error
    })
  },
  methods: {
    formatDate (date) {
      return Moment(date).format('llll')
    }
  },
  created () {}
}
</script>
