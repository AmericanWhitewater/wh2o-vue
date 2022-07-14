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
    observationEnum() {
      return {
          "-1": "Low",
          "0.1": "Low Runnable",
          "0.45": "Runnable",
          "0.8": "High Runnable",
          "1.5": "Too High"        
      }
    }
  },
  methods: {
    visualReadingLabel: (val) => {
      if (val < 0.0) {
        return "Low";
      } else if (val > 0 && val < 0.33) {
          return "Low Runnable";
      } else if (val > 0.33 && val < 0.66) {
          return "Runnable";
      } else if (val > 0.66 && val < 1.0) {
          return "High Runnable";
      } else if (val > 1.0) {
          return "Too High";
      } else {
          return "n/a";
      }
    },

    gaugeReading(obj) {
      let output;
      if (obj.reading && obj.metric && obj.metric.unit) {
        // this is a special metric for visual estimates
        if (obj.metric.id === "1") {
          output = this.visualReadingLabel(obj.reading);
        } else {
          output = `${obj.reading}${obj.metric.unit}`;
        }
      } else {
        output = "n/a";
      }
      return output;
    },
  }
};