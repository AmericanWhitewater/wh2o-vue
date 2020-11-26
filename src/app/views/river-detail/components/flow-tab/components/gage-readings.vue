<template>
  <section class="mt-3 mb-lg">
    <div v-if="!loading && data" class="bx--data-table-container">
      <table class="bx--data-table">
        <thead>
          <tr>
            <th>Flow Rate</th>
            <th>Date / Time</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(r, rowIndex) in data.slice(0, resultsOffset)"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <td v-text="`${Math.floor(r.reading)} ${metric}`" />
            <td>{{ getDate(r.updated) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <cv-button
      v-if="data"
      class="mt-spacing-md"
      size="small"
      :disabled="resultsOffset >= data.length"
      @click.exact="resultsOffset += 12"
      @keydown.enter="resultsOffset += 12"
    >
      Show More
    </cv-button>
    <utility-block v-if="loading" state="loading" />
    <utility-block v-if="!loading && error" state="error" />
  </section>
</template>
<script>
import moment from "moment";
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
export default {
  name: "gage-readings",
  components: {
    UtilityBlock,
  },
  data: () => ({
    columns: ["Reading", "Updated"],
    resultsOffset: 20,
  }),
  computed: {
    ...mapState({
      data: (state) => state.GageReadings.data,
      loading: (state) => state.GageReadings.loading,
      error: (state) => state.GageReadings.error,
      metrics: (state) => state.GageMetrics.data,
    }),
    metric() {
      if (!this.metrics) return null;
      return (
        this.metrics.find((m) => m.id === this.data[0].metric.toString())
          ?.unit || ""
      );
    },
  },
  methods: {
    getDate(date) {
      return moment(date, 'X').format('MM/DD hh:mm a')
    },
  },
};
</script>
