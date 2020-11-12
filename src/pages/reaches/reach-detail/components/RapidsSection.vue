<template>
  <div class="RapidSection">
      <v-card class="mb-2" tile>
        <v-card-title>{{ $t("rapids") }}</v-card-title>

      </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "RapidSection",
  props: {
    reachId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.Rapids.loading,
      rapids: (state) => state.Rapids.data,
      error: (state) => state.Rapids.error,
    }),
  },
  methods: {
    load() {
      this.$store.dispatch("Rapids/getProperty", {
        url: `/rapids?reachid=${this.reachId}`,
      });
    }
  },
  created() {
    this.load()
  },
};
</script>
