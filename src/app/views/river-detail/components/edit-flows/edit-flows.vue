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

        <correlation-details v-for="(corr, index) in gaugeCorrelations"
          :key="`corr-${index}`"
          :correlation="corr"
          @saved="updateSavedCorrelation"
          @deleted="removeDeletedCorrelation"
        />
      </template>
    </layout>
    <add-gauge-modal ref="addGaugeModal" />
  </div>
</template>

<script>
import { appLocalStorage } from '@/app/global/services'
import { gaugeClient } from '@/app/services';
import { Layout } from '@/app/global/layout'
import { gaugeHelpers } from '@/app/global/mixins'
import { mapState } from 'vuex'
import { AddGaugeModal, CorrelationDetails } from './components'

export default {
  name: 'edit-flows',
  components: {
    Layout,
    AddGaugeModal,
    CorrelationDetails
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
      handler() {
        this.refreshCorrelations();
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
        const newCorr = await gaugeClient.upsertGaugeCorrelationToReach.mutate(payload);

        this.gaugeCorrelations.push(newCorr);
      }
    },
    async refreshCorrelations() {
      this.loading = true;
      const correlations = await gaugeClient.getModernDBGaugeCorrelationAndGaugeInfoForReach.query({ reachID: this.reachId });
      this.gaugeCorrelations = correlations.map(x => {
        x.editing = false;
        return x;
      });
      this.loading = false;
    },
    removeDeletedCorrelation(corr) {
      this.gaugeCorrelations = this.gaugeCorrelations.filter(function(x) {
          return !(x.gaugeInfo.gaugeSource === corr.gaugeInfo.gaugeSource &&
            x.gaugeInfo.gaugeSourceIdentifier === corr.gaugeInfo.gaugeSourceIdentifier);
        });
    },
    updateSavedCorrelation() {
      // just reload all correlations as "isPrimary" changes can affect all of them
      this.refreshCorrelations();
      // update in place with the saved correlation so we don't need to refresh from the db
      // const editedCorr = this.gaugeCorrelations.find((x) => x.gaugeInfo.gaugeSource === corr.gaugeInfo.gaugeSource &&
      //   x.gaugeInfo.gaugeSourceIdentifier === corr.gaugeInfo.gaugeSourceIdentifier);
      // Object.assign(editedCorr, corr);
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