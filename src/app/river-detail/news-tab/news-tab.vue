<template>
  <div class="map-tab">
    <template v-if="loading">
      <cv-inline-loading small />
    </template>
    <template v-if="!loading && error">
      <error-block
        title="Map data unavailable"
        text="please try again later"
      />
    </template>
    <template v-if="!loading && !error">
      <div class>
        map results!
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions } from "../shared/state";
import { ErrorBlock } from "../shared/components";
export default {
  name: "MapTab",
  components: {
    ErrorBlock
  },
  data: () => {
    return {
      mapHttpConfig: {
        lat: null,
        lon: null
      }
    };
  },
  computed: {
    loading() {
      return this.$store.state.riverDetailState.mapData.loading;
    },
    error() {
      return this.$store.state.riverDetailState.mapData.error;
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      if (!this.data && !this.error) {
        this.$store.dispatch(mapActions.FETCH_MAP_DATA, this.mapHttpConfig);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.map-tab {
  padding-top: 2rem;
}
</style>
