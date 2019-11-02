<template>
  <div class="accidents-tab">
    <template v-if="loading">
      <cv-inline-loading small />
    </template>
    <template v-if="!loading && error">
      <error-block
        title="Accident data unavailable"
        text="please try again later"
      />
    </template>
    <template v-if="!loading && !error">
      <div class>
        accidents results!
      </div>
    </template>
  </div>
</template>
<script>
import { accidentsActions } from "../shared/state";
import { ErrorBlock } from "../shared/components";
export default {
  name: "AccidentsTab",
  components: {
    ErrorBlock
  },
  computed: {
    loading() {
      return this.$store.state.riverDetailState.accidentsData.loading;
    },
    error() {
      return this.$store.state.riverDetailState.accidentsData.error;
    },
    data() {
      return this.$store.state.riverDetailState.accidentsData.data;
    },
    riverId() {
      return parseInt(this.$route.params.id);
    },
    accidents() {
      return this.$store.state.riverDetailState.accidentsData.data.data.reach
        .accidents;
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      if (!this.data && !this.error) {
        this.$store.dispatch(
          accidentsActions.FETCH_ACCIDENTS_DATA,
          this.riverId
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.accidents-tab {
  padding-top: 2rem;
}
</style>
