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
        @input="debouncedFetchGaugeOptions" />

      <div v-if="searchResults.length" class="gauge-list bx--tile mb-spacing-md">
        <cv-radio-group vertical="vertical">
          <cv-radio-button
            v-for="(g, index) in searchResults"
            :key="index"
            v-model="selectedGauge"
            :value="g.value.toString()"
            :label="g.name"
          />
        </cv-radio-group>
      </div>

      <div v-if="selectedGauge" class="gauge-details">
        <cv-select v-model="gaugeMetric" label="Gauge metric to use">
          <cv-select-option
            v-for="(m, index) in metricOptions"
            :key="index"
            :value="m.id"
            >{{ m.label }}
          </cv-select-option>
        </cv-select>
      </div>
    </template>
    <template slot="secondary-button"> Cancel </template>
    <template slot="primary-button"> OK </template>
  </cv-modal>
</template>
<script>
import { shadowDomFixedHeightOffset, gaugeHelpers } from "@/app/global/mixins";
import http from '@/app/http'
import debounce from 'lodash.debounce'

export default {
  name: "add-gauge-modal",
  mixins: [gaugeHelpers, shadowDomFixedHeightOffset],
  data: () => ({
    searchResults: [],
    selectedGauge: null,
    gaugeMetric: "2"
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
      this.resolvePromise(true);
      this.$refs.modalWrapper.hide()
    },
    _cancel() {
      this.resolvePromise(false);
    },
    async fetchGaugeOptions(query) {
      if (query.length === 0) {
        this.searchResults = []
      } else if (query.length > 4) {
        http.get(`/ui/lookup/LookupGaugeInfo/?name=${query}`)
          .then(r => {
            this.searchResults = r.data?.items;
          });
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