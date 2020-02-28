<template>
  <section class="mt-3">
    <hr>
    <h2>Readings</h2>
    <template v-if="!loading">
      <cv-data-table
        :columns="columns"
        :auto-width="false"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(r, rowIndex) in data.slice(0, 10)"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>{{ r.reading }}</cv-data-table-cell>
            <cv-data-table-cell>{{ formatDate(r.updated) }}</cv-data-table-cell>
            <template slot="expandedContent" />
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </template>
    <template v-else>
      <loading-block />
    </template>
  </section>
</template>
<script>
import Moment from 'moment'
import { mapState } from 'vuex'
import { LoadingBlock } from '@/app/global/components'
export default {
  name: 'GageReadings',
  components: {
    LoadingBlock
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
