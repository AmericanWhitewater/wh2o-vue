
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
            <th><span class="bx--table-header-label">No. of Gauges</span></th>
            <th><span class="bx--table-header-label" /></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="st in states"
            :key="st.gmi"
          >
            <td><a :href="summaryLink(st.shortkey)">{{ st.name }}</a></td>
            <td><a :href="summaryLink(st.shortkey)">{{ st.num_rivers }}</a></td>
            <td><a :href="gaugesLink(st.shortkey)">{{ st.num_gauges }}</a></td>
            <td>
              <!--                        <div class="">-->
              <!--                            <button type="button" class="bx&#45;&#45;btn&#45;&#45;primary" aria-haspopup="true"-->
              <!--                                    aria-expanded="false" @click="toggleOptionDropdown(st.shortkey)">-->
              <!--                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"-->
              <!--                                     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16"-->
              <!--                                     xml:space="preserve" width="16" height="16">-->
              <!--                                    <g class="nc-icon-wrapper" fill="#ffffff">-->
              <!--                                    <circle data-color="color-2" fill="#ffffff" cx="8" cy="8" r="2"></circle>-->
              <!--                                        <circle fill="#ffffff" cx="2" cy="8" r="2"></circle>-->
              <!--                                        <circle fill="#ffffff" cx="14" cy="8" r="2"></circle>-->
              <!--                                    </g>-->
              <!--                                </svg>-->
              <!--                            </button>-->
              <!--                            <div class="bx&#45;&#45;dropdown__wrapper" :ref="`stateOptions-${st.shortkey}`">-->
              <!--                                <ul class="bx&#45;&#45;dropdown-list">-->
              <!--                                    <li class="bx&#45;&#45;dropdown-item">-->
              <!--                                        <a href="/content/River/show-edits/state/%2A/">Last 100 Edits</a>-->
              <!--                                    </li>-->
              <!--                                    <li class="bx&#45;&#45;dropdown-item">-->
              <!--                                        <a href="/content/Report/list-recent/region/all/">Last 100 Reports</a>-->
              <!--                                    </li>-->
              <!--                                    <li class="bx&#45;&#45;dropdown-item">-->
              <!--                                        <a href="/content/River/search-form/">Search for River...</a>-->
              <!--                                    </li>-->
              <!--                                    <li class="bx&#45;&#45;dropdown-item">-->
              <!--                                        <a href="/content/River/list-personal/">Your River Network Rivers</a>-->
              <!--                                    </li>-->
              <!--                                    <li class="bx&#45;&#45;dropdown-item">-->
              <!--                                        <a href="/content/StreamTeam/my-streams/">Your StreamTeam Rivers</a>-->
              <!--                                    </li>-->
              <!--                                    <li class="bx&#45;&#45;dropdown-item">-->
              <!--                                        <a :href="`/content/River/state-summary/?state=${st.shortkey}`">summary</a>-->
              <!--                                    </li>-->
              <!--                                    <li class="bx&#45;&#45;dropdown-item">-->
              <!--                                        <a :href="`/content/River/drain-summary/?state=${st.shortkey}`">drainage summary</a>-->
              <!--                                    </li>-->
              <!--                                    <li class="bx&#45;&#45;dropdown-item">-->
              <!--                                        <a :href="`/content/Gauge2/view/?state=${st.shortkey}`">gauges</a>-->
              <!--                                    </li>-->
              <!--                                    <li class="bx&#45;&#45;dropdown-item">-->
              <!--                                        <a :href="`/content/Report/list-recent/?region=${st.shortkey}`">reports</a>-->
              <!--                                    </li>-->
              <!--                                    <li class="bx&#45;&#45;dropdown-item">-->
              <!--                                        <a :href="`/content/River/show-edits/?state=${st.shortkey}`">edits</a>-->
              <!--                                    </li>-->
              <!--                                </ul>-->
              <!--                            </div>-->
              <!--                        </div>-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { baseUrl } from '@/environment'

export default {
  name: 'nwi-state-list',
  components: {},
  computed: {
    ...mapState({
      loading: state => state.RiverIndex.loading,
      error: state => state.RiverIndex.error,
      states: state => state.RiverIndex.stateList
    })

  },
  methods: {
    summaryLink (code) {
      return `${baseUrl}content/River/state-summary/?state=${code}`
    },
    gaugesLink (code) {
      return `${baseUrl}content/Gauge2/view/?state=${code}`
    },
    toggleOptionDropdown (state) {

    }
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
