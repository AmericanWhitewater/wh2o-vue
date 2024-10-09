
<template>
  <div id="nwi-state-list">
    <hr>
    <h2 class="mb-spacing-sm">
      US States
    </h2>
    <div
      id="river-summary-table"
      class="nwi-state-list"
    >
      <table class="bx--data-table bx--data-table--zebra">
        <thead>
          <tr>
            <th><span class="bx--table-header-label">State</span></th>
            <th><span class="bx--table-header-label">No. of Rivers</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="st in usStates"
            :key="st.gmi"
            class="state-row"
            @click.exact="$router.push(`/river-index/state/${st.gmi}`)"
          >
            <td>{{ st.name }}</td>
            <td>{{ st.num_rivers }}</td>
          </tr>
        </tbody>
      </table>
      <h2 class="mb-spacing-sm">
        International Regions
      </h2>
      <table class="bx--data-table bx--data-table--zebra">
        <thead>
          <tr>
            <th><span class="bx--table-header-label">Region</span></th>
            <th><span class="bx--table-header-label">No. of Rivers</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="st in intlStates"
            :key="st.gmi"
            class="state-row"
            @click.exact="$router.push(`/river-index/state/${st.gmi}`)"
          >
            <td>{{ st.name }}</td>
            <td>{{ st.num_rivers }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'nwi-state-list',
  computed: {
    ...mapState({
      loading: state => state.RiverIndex.loading,
      error: state => state.RiverIndex.error,
      usStates: state => state.RiverIndex.usStates,
      intlStates: state => state.RiverIndex.intlStates
    }),
  },
  created () {
    this.$store.dispatch('RiverIndex/fetchStates')
  }
}
</script>
<style lang="scss">
  .nwi-state-list {
      overflow-y: hidden;
  }
  tr.state-row {
    cursor: pointer;
  }
</style>
