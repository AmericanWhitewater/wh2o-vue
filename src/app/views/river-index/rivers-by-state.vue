<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col">
        <div id="rivers-by-state">
          <h2 v-if="state" class="mb-spacing-sm">
            {{ state.name }} River List
          </h2>

          <!-- 51px is the header height. TODO: will need to change when modular header comes in -->
          <nwi-level-legend :top=51 />

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
              <tr v-for="reach in reaches" :key="reach.id" :class="`${cssClassForGaugeCorrelation(reach.correlation)} reach`" @click="$router.push(`/river-detail/${reach.id}/main`)">
                <td>
                  <strong>
                    {{ [reach.river, reach.class].join(" - ") }}
                  </strong>
                  <br>
                  {{ reach.section }}
                  <span v-if="reach.altname">({{ reach.altname }})</span>
                </td>
                <td class="reach-flow">
                  <strong v-if="reach.correlation">
                    {{ reach.correlation.latestReading.value }} {{ correlationMetrics[reach.correlation.metric].unit }}
                  </strong>
                </td>
                <td>
                  <div v-if="reach.correlation">
                    {{ displayGaugeCorrelationLatestReadingTime(reach.correlation) }} ago
                    <cv-tag v-if="reach.correlation.status === 'stale'" class="stale" label="! data is stale" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <template v-if="loading">
            <utility-block state="loading" hide-text />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStateList } from "@/app/services"
import { reachClient } from '@/app/services'
import { reachApiHelper } from '@/app/global/mixins';
import { NwiLevelLegend } from './components';
import UtilityBlock from "@/app/global/components/utility-block/utility-block.vue";

export default {
  name: 'rivers-by-state',
  components: { NwiLevelLegend, UtilityBlock },
  mixins: [reachApiHelper],
  data: () => ({
    loading: true,
    reaches: [],
    states: []
  }),
  computed: {
    stateCode() {
      return this.$route.params.state;
    },
    state() {
      return this.states.find(x => x.gmi === this.stateCode);
    },
  },
  async created () {
    this.loading = true;
    // TODO: can we reduce/remove reliance on laravel state list?
    // still needed to display name of state (not just AW state code which is in URL)
    const stateResults = await getStateList();
    this.states = stateResults.data.data.states.data;

    // map here just makes the template code more straightforward so we're not doing `reach.reach.name`
    const reachSummary = await reachClient.stateView.query({ state: this.stateCode });
    this.reaches = reachSummary.map(r => ({
        ...r.reach,
        correlation: r.correlation
      })
    ).sort((a, b) => {
      if (a.river > b.river) {
        return 1;
      } else if (b.river > a.river) {
        return -1;
      } else {
        if (a.section > b.section) {
          return 1;
        } else if (b.section > a.section) {
          return -1;
        }
      }
      return 0;
    });
    this.loading = false;
  }
}
</script>
<style lang="scss">
.bx--tag.stale {
  background-color: $flow-warning;
}

#rivers-by-state {
  thead {
    position: sticky;
    top: calc(51px + 3rem);
  }

  tr {
    border-left: 0.5rem solid $ui-03;

    @each $class, $color in $flow-map {
      &.#{$class} {
        td:first-child {
          border-left: 0.5rem solid $color;
        }

        td.reach-flow {
          background: $color;
        }
      }
    }

    &.reach {
      cursor: pointer;
    }
  }
}
</style>