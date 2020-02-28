<template>
  <section class="mt-3">
    <hr>
    <h2 class="mb-spacing-md">
      Readings
    </h2>

    <cv-data-table
      v-if="!loading && data"
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
    <loading-block v-if="loading" />
    <error-block v-if="!loading && error" />
  </section>
</template>
<script>
import Moment from 'moment'
import { mapState } from 'vuex'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'
export default {
  name: 'GageReadings',
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
