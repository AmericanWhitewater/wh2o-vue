import { mapState } from "vuex";

export const gaugeHelpers = {
  computed: {
    ...mapState({
      metrics: (state) => state.RiverGages.data?.metrics ?? [],
    }),
  // users don't need to see all the possible metrics, just the ones they'll actually use
  // mimicked gage-chart-controls.vue, should probably refactor the way we treat metrics
  // across the board at some point
  metricOptions() {
    return this.metrics
      .filter((m) => [2, 8, 15].includes(parseInt(m.id)))
      .map((m) => ({
        id: m.id,
        label: m.name === "Flow" ? "CFS" : m.name,
      }));
    },
  }
}