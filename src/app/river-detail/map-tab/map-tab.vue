<template>
  <div class="map-tab">
    <template v-if="loading">
      <cv-inline-loading small></cv-inline-loading>
    </template>
    <template v-if="!loading && error">
      <error-block title="Map data unavailable" text="please try again later" />
    </template>
    <template v-if="!loading && !error">
      <div class>map results!</div>
    </template>
  </div>
</template>
<script>
import { mapActions } from "../shared/state";
import { ErrorBlock } from "../shared/components";
export default {
  name: "MapTab",
  data: () => {
    return {
      mapHttpConfig: {
        lat: null,
        lon: null
      }
    };
  },
  components: {
    ErrorBlock
  },
  computed: {
    loading() {
      return this.$store.state.riverDetailState.mapData.loading;
    },
    error() {
      return this.$store.state.riverDetailState.mapData.error;
    }
  },
  methods: {
    loadData() {
      if (!this.data && !this.error) {
        this.$store.dispatch(mapActions.FETCH_MAP_DATA, this.mapHttpConfig);
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style lang="scss" scoped>
.map-tab {
  padding-top: 2rem;
}
</style>
