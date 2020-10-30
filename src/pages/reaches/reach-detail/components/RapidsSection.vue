<template>
  <div class="RapidSection">
    <h3>{{ $t("rapids") }}</h3>
    <template v-if="loading"> loading... </template>
    <template v-else-if="rapids">
      <v-card v-for="(rapid, index) in rapids" :key="index" class="mb-2" tile>
        <v-card-title>{{rapid.name}}</v-card-title>
      </v-card>
    </template>
    <template v-else> Something went wrong </template>
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
