<template>
  <div class="edit-flows">
    <layout name="layout-full-width" class="mb-lg">
      <template #main>
        <hr>
        <div class="header-row mb-spacing-lg">
          <h2>Edit Flows</h2>
          <cv-button
            size="small"
            @click.exact="openGaugeModal()"
          >
            + Add Gauge Correlation
          </cv-button>
        </div>

        <div v-for="(gauge, index) in gauges"
          :key="index"
          class="bx--tile"
        >
          <h3>{{ gauge.gauge.name }} ({{ gauge.gauge.source }}) ({{ gauge.gauge.id }})</h3>
          <table class="bx--data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Time Adjustment</th>
                <th>Estimated</th>
                <th>Excluded</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody class="align-center">
              <tr>
                <td>{{ metricLabel(gauge.gauge_metric) }}</td>
                <td>{{ gauge.time_adjustment }}m</td>
                <td>test</td>
                <td>test</td>
                <td>test</td>
              </tr>
            </tbody>
          </table>
          <h4>Ranges</h4>

          <table class="bx--data-table">
            <thead>
              <tr>
                <th>Min</th>
                <th>Max</th>
                <th>Range</th>
                <th>Rated</th>
                <th>Comment</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              Ranges will go here
            </tbody>
          </table>
        </div>
      </template>
    </layout>
    <add-gauge-modal ref="addGaugeModal" :reachTargetId="reachTargetId" />
  </div>
</template>

<script>
import { appLocalStorage } from '@/app/global/services'
import { getGaugeCorrelations, getReachCorrelationGauge } from '@/app/services'
import { Layout } from '@/app/global/layout'
import { gaugeHelpers } from '@/app/global/mixins'
import { mapState } from 'vuex'
import { AddGaugeModal } from './components'

export default {
  name: 'edit-flows',
  components: {
    Layout,
    AddGaugeModal
  },
  mixins: [gaugeHelpers],
  data: () => ({
    reachCorrelationGauge: null, // this "gauge" record represents the reach itself in relationships with other gauges
    gaugeCorrelations: [],
    loading: true
  }),
  computed: {
    ...mapState({
      gauges: state => state.RiverGages.data?.gauges ?? [],
      user: state => state.User.data
    }),
    reachId() {
      return this.$route.params.id;
    },
    reachTargetId() {
      return this.reachCorrelationGauge?.id;
    }
  },
  watch: {
    // gauge correlations require a "gauge id" to represent the reach
    // we need to query to retrieve it
    reachId: {
      immediate: true,
      async handler() {
        // get the reach "target ID"
        const targetGauge = await getReachCorrelationGauge(this.reachId);
        if (!targetGauge.errors) {
          this.reachCorrelationGauge = targetGauge.gauge;

          // use the "target ID" to retrieve existing gauge correlations
          const corrs = await getGaugeCorrelations(this.reachTargetId);
          if (!corrs.errors) {
            this.gaugeCorrelations = corrs.gauges;
          } else {
            // eslint-disable-next-line no-console
            console.log(corrs.errors);  
          }
        }  else {
          // eslint-disable-next-line no-console
          console.log(targetGauge.errors);
        }
      }
    }
  },
  methods: {
    async openGaugeModal(gauge = null) {
      await this.$refs.addGaugeModal.show({
        gauge: gauge
      });
    }
  },
  beforeMount () {
    // as of now, this is the only place in the app that we're actually checking
    // auth before showing a route. So I'm just doing it in this ad hoc way
    // but if the SPA expands and has more login-protected routes,
    // we'll need to address this more systematically
    if (!(this.user || appLocalStorage.getItem('wh2o-auth'))) {
      this.$router.replace(`/river-detail/${this.$route.params.id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.header-row {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>