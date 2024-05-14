
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
          >
            <td><a :href="`/river-index/state/${st.shortkey}`">{{ st.name }}</a></td>
            <td><a :href="`/river-index/state/${st.shortkey}`">{{ st.num_rivers }}</a></td>
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
          >
            <td><a :href="`/river-index/state/${st.shortkey}`">{{ st.name }}</a></td>
            <td><a :href="`/river-index/state/${st.shortkey}`">{{ st.num_rivers }}</a></td>
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
<style type="text/scss">
    .nwi-state-list {
        overflow-y: hidden;
    }
</style>
