<template>
  <cv-modal
    ref="modalWrapper"
    size="large"
    @primary-click="_confirm()"
    @modal-hidden="_cancel()"
    @modal-shown="setModalOffset"
  >
    <template slot="title">
      <h2>
        Select a new gauge
      </h2>
    </template>
    <template slot="content">
      <cv-search
        label="start typing to search for a gauge"
        autocorrect="off" spellcheck="false" autocomplete="off"
        @input="debouncedFetchGaugeOptions"
        />

      <div v-if="searchResults.length" class="gauge-list bx--tile mb-spacing-md">
        <cv-radio-group vertical="vertical">
          <cv-radio-button
            v-for="(g, index) in searchResults"
            :key="index"
            v-model="selectedGauge"
            :value="`${g.gaugeSource}-${g.gaugeSourceIdentifier}`"
            :label="`${g.name} (${g.gaugeSource}-${g.gaugeSourceIdentifier})`" 
          />
        </cv-radio-group>
      </div>
    </template>
    <template slot="secondary-button"> Cancel </template>
    <template slot="primary-button"> OK </template>
  </cv-modal>
</template>
<script>
import { reachApiHelper, shadowDomFixedHeightOffset, gaugeHelpers } from "@/app/global/mixins";
import { gaugeClient } from '@/app/services';
import debounce from 'lodash.debounce';

export default {
  name: "add-gauge-modal",
  mixins: [gaugeHelpers, reachApiHelper, shadowDomFixedHeightOffset],
  data: () => ({
    searchResults: [],
    selectedGauge: null,
    gaugeMetric: "cfs"
  }),
  methods: {
    show(opts = {}) {
      if (opts.gauge) {
        this.selectedGauge = opts.gauge.id
      }
      this.$refs.modalWrapper.show();

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    _confirm() {
      const [source, sourceID] = this.selectedGauge.split('-');
      this.resolvePromise({
        gaugeSource: source,
        gaugeSourceIdentifier: sourceID,
      });
      this.$refs.modalWrapper.hide()
    },
    _cancel() {
      this.resolvePromise(false);
    },
    async fetchGaugeOptions(query) {
      if (query.length === 0) {
        this.searchResults = []
      } else if (query.length > 4) {
        this.searchResults = await gaugeClient.getGaugesForSelect.query({ query: query, numToFetch: 50 });
      }
    }
  },
  created() {
    this.debouncedFetchGaugeOptions = debounce(this.fetchGaugeOptions, 200, {
      leading: false,
      trailing: true
    });
  }
}
</script>

<style lang="scss" scoped>
.gauge-list {
  max-height: 120px;
  overflow-y: scroll;
}
</style>