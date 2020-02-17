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
            <cv-data-table-cell>{{ r.updated }}</cv-data-table-cell>
            <template slot="expandedContent" />
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </template>
    <template v-else>
      loading...
    </template>
  </section>
</template>
<script>
export default {
  name: 'GageReadings',
  data: () => ({
    columns: ['Reading', 'Updated']
  }),
  computed: {
    data () {
      return this.$store.state.riverDetailState.gageReadingsData.data
    },
    loading () {
      return this.$store.state.riverDetailState.gageReadingsData.loading
    }
  },
  created () {},
  methods: {}
}
</script>
