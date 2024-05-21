<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <div v-if="state" id="rivers-by-state">
          <h2 class="mb-spacing-sm">
            {{ state.name }}
          </h2>

          <table class="bx--data-table">
            <thead>
              <tr class="bx--table-header-label">
                <th>
                  <strong>Name</strong>
                  <br>Section
                </th>
                <th>Latest Flow</th>
                <th>Updated As Of</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reach in reaches" :key="reach.id" :class="`${classForGaugeCorrelation(reach.correlation)} reach`">
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
                  <template v-if="reach.loading">
                    <cv-inline-loading
                      small
                      state="loading"
                      loading-text=""
                    />
                  </template>
                  <strong v-else-if="reach.correlation && reach.correlation.status">
                    {{ reach.correlation.status.latestReading.value }} {{ reach.correlation.status.metric }}
                  </strong>
                </td>
                <td>
                  <div v-if="reach.correlation && reach.correlation.status">
                    {{ displayGaugeCorrelationLatestReadingTime(reach.correlation) }} ago
                    <cv-tag v-if="reach.correlation.status.status === 'stale'" kind="stale" label="! data is stale" />
                  </div>
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
import { getStateList } from "@/app/services"
import { reachClient } from '@/app/services'
import { reachApiHelper } from '@/app/global/mixins';

export default {
  name: 'rivers-by-state',
  mixins: [reachApiHelper],
  data: () => ({
    loading: true,
    allReachStubs: [],
    reaches: [],
    states: []
  }),
  computed: {
    stateCode() {
      return this.$route.params.state;
    },
    state() {
      return this.states.find(x => x.shortkey === this.stateCode);
    },
  },
  watch: {
    async allReachStubs(newStubs) {
      let reaches;
      if (this.state) {
        reaches = newStubs.filter(x => x.states.includes(this.state.gmi)).sort((a,b) => {
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
        }).map(r => ({
          ...r,
          loading: true,
          correlation: null
        }));
        this.reaches = reaches;
        this.reaches.forEach(async r => {
          try {
            r.correlation = await reachClient.primaryGaugeStub.query({ reachID: `${r.id}` });
          } finally {
            r.loading = false;
          }
        });

      }
    }
  },
  async created () {
    this.loading = true;
    // TODO: can we reduce/remove reliance on laravel state list?
    const stateResults = await getStateList();
    this.states = stateResults.data.data.states.data;
    // TODO: replace this with state specific query
    this.allReachStubs = await reachClient.allReachStubs.query();
    this.loading = false;
  }
}
</script>
<style lang="scss">
@each $class, $color in $flow-map {
  tr.reach.#{$class} td {
    background-color: $color;
  }
}
.bx--tag--stale {
  background-color: #dfe3e6;

  :hover > & {
    background-color: $stale;
  }
}
</style>