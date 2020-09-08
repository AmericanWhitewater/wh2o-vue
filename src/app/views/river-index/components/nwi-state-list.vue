<template>
  <div id="nwi-state-list">
    <hr>
    <h2 class="mb-spacing-sm">
      US States
    </h2>
    <div
      id="river-summary-table"
      class="bx--data-table-container"
    >
      <table class="bx--data-table bx--data-table--zebra">
        <thead>
          <tr>
            <th><span class="bx--table-header-label">State</span></th>
            <th><span class="bx--table-header-label">No. of Rivers</span></th>
            <th><span class="bx--table-header-label">No. of Gauges</span></th>
            <th><span class="bx--table-header-label">&nbsp;</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="st in states"
            :key="st.gmi"
          >
            <td>{{ st.name }}</td>
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { riverIndexActions } from '../shared/state'
export default {
  name: 'nwi-state-list',
  components: {},
  computed: {
    ...mapState({
      loading: state => state.riverIndexData.loading,
      error: state => state.riverIndexState.riverIndexData.error,
      states: state => state.riverIndexState.riverIndexData.stateList
    })
  },
  methods: {},
  created () {
    this.$store.dispatch(riverIndexActions.FETCH_STATES)
  }
}
</script>
