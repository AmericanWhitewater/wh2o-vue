<template>
  <div class="credits-tab">
    <template v-if="loading">
      <cv-inline-loading small></cv-inline-loading>
    </template>
    <template v-if="!loading && error">
      <error-block
        title="Credits data unavailable"
        text="please try again later"
      />
    </template>
    <template v-if="!loading && !error">
      <div class>credits results!</div>
    </template>
  </div>
</template>
<script>
import { creditsActions } from "../shared/state";
import { ErrorBlock } from "../shared/components";
export default {
  name: "CreditsTab",
  data: () => {
    return {
      creditsHttpConfig: "let there be error"
    };
  },
  components: {
    ErrorBlock
  },
  computed: {
    loading() {
      return this.$store.state.riverDetailState.creditsData.loading;
    },
    error() {
      return this.$store.state.riverDetailState.creditsData.error;
    }
  },
  methods: {
    loadData() {
      if (!this.data && !this.error) {
        this.$store.dispatch(
          creditsActions.FETCH_CREDITS_DATA,
          this.creditsHttpConfig
        );
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style lang="scss" scoped>
.credits-tab {
  padding-top: 2rem;
}
</style>
