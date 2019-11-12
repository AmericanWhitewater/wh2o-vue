<template>
  <div class="credits-tab">
    <template v-if="loading">
      <loading-block text="Loading Credits..." />
    </template>
    <template v-if="!loading && error">
      <error-block title="Credits unavailable" text="please try again later" />
    </template>
    <template v-if="!loading && !error">
      <div class>
        credits results!
      </div>
    </template>
  </div>
</template>
<script>
import { creditsActions } from "../shared/state";
import { LoadingBlock, ErrorBlock } from "@/app/global/components";

export default {
  name: "CreditsTab",
  components: {
    ErrorBlock,
    LoadingBlock
  },
  data: () => ({
    creditsHttpConfig: "let there be error"
  }),
  computed: {
    loading() {
      return this.$store.state.riverDetailState.creditsData.loading;
    },
    error() {
      return this.$store.state.riverDetailState.creditsData.error;
    }
  },
  created() {
    this.loadData();
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
  }
};
</script>
<style lang="scss" scoped>
.credits-tab {
  padding-top: 2rem;
}
</style>
