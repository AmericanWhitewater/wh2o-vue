<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <div v-if="state" id="rivers-by-state">
          <h2 class="mb-spacing-sm">
            {{ state.name }}
          </h2>

          <table class="bx--data-table bx--data-table--zebra">
            <thead>
              <tr class="bx--table-header-label">
                <th>
                  <strong>Name</strong>
                  <br>Section
                </th>
                <th>Latest Flow</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reach in reaches" :key="reach.id">
                <td>
                  <router-link :to="`/river-detail/${reach.id}/main`">
                    <strong>
                      {{ [reach.river, renderCombinedDifficultyGradeSchema(reach.difficulty)].join(" - ") }}
                    </strong>
                    <br>
                    {{ reach.section }}
                    <span v-if="reach.altname">({{ reach.altname }})</span>
                  </router-link>
                </td>
                <td>
                  <span v-if="reach.loading">loading...</span>
                  <span v-else-if="reach.correlation && reach.correlation.status">
                    {{ correlation.status.latestReading.value }} {{ correlation.status.metric }}
                  </span>
                  <span v-else>n/a</span>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { reachClient } from '@/app/services'
import { reachApiHelper } from '@/app/global/mixins';

export default {
  name: 'rivers-by-state',
  mixins: [reachApiHelper],
  data: () => ({
    loading: true,
    allReachStubs: [],
    reaches: []
  }),
  computed: {
    ...mapState({
      states: state => state.RiverIndex.usStates.concat(state.RiverIndex.intlStates)
    }),
    stateCode() {
      return this.$route.params.state;
    },
    state() {
      return this.states.find(x => x.shortkey === this.stateCode);
    },
  },
  watch: {
    async allReachStubs(newStubs) {
      // TODO: need to run the below code *after* state and states are populated
      if (this.states) {
        this.reaches = newStubs.filter(x => x.states.includes(this.state.gmi)).sort((a,b) => {
          if (a.river > b.river) {
            return 1;
          } else if (a.river < b.river) {
            return -1;
          } else {
            if (a.section >= b.section) {
              return 1;
            } else {
              return -1;
            }
          }
        });
        this.reaches.forEach(async r => {
          this.$set(r.loading, true);
          this.$set(r.correlation, await reachClient.primaryGaugeStub.query({ reachID: `${r.id}` }));
          r.loading = false;
        })
      }
    }
  },
  async created () {
    this.loading = true;
    // TODO: can we reduce/remove reliance on laravel state list?
    this.$store.dispatch('RiverIndex/fetchStates');
    // TODO: replace this with state specific query
    this.allReachStubs = await reachClient.allReachStubs.query();
    this.loading = false;
  }
}
</script>
