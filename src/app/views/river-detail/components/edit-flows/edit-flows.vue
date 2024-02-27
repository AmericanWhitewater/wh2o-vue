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
            + Add Gauge
          </cv-button>
        </div>

        <div v-for="(corr, index) in gaugeCorrelations"
          :key="index"
          class="bx--tile"
        >
          <h3>{{ corr.gaugeInfo.name }} ({{ corr.gaugeInfo.gaugeSource }}-{{  corr.gaugeInfo.gaugeSourceIdentifier }})</h3>
          <hr>
          <h4>Correlation</h4>
          <p v-if="corr.correlationDetails.ok && !corr.correlationDetails.value">
            No correlation defined.
          </p>
          <p v-else-if="!corr.correlationDetails.ok">
            This is legacy data that was properly defined and is not compatible with our new gauge data structures. Please re-create the correlation.
          </p>
          <div v-else>
            {{ corr.correlationDetails.value }}
          </div>
        </div>
      </template>
    </layout>
    <add-gauge-modal ref="addGaugeModal" />
  </div>
</template>

<script>
import { appLocalStorage } from '@/app/global/services'
import { trpcClient } from '@/app/services';
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
    gaugeCorrelations: [],
    loading: true
  }),
  computed: {
    ...mapState({
      user: state => state.User.data
    }),
    reachId() {
      return this.$route.params.id;
    },
  },
  watch: {
    reachId: {
      immediate: true,
      async handler() {
        this.gaugeCorrelations = await trpcClient.getGaugeCorrelationAndGaugeInfoForReach.query({ reachID: this.reachId });
      }
    }
  },
  methods: {
    async openGaugeModal() {
      const { gaugeSource, gaugeSourceIdentifier, metric } = await this.$refs.addGaugeModal.show({});

      if (gaugeSource && gaugeSourceIdentifier && metric) {
        const payload = {
          reachID: this.reachId,
          gaugeSource: gaugeSource,
          gaugeSourceIdentifier: gaugeSourceIdentifier,
          flowMetric: metric,
          correlationDetails: null
        }
        const newCorr = await trpcClient.upsertGaugeCorrelationToReach.mutate(payload);

        this.gaugeCorrelations.push(newCorr);
      }
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
  },
}
</script>

<style lang="scss" scoped>
.header-row {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>