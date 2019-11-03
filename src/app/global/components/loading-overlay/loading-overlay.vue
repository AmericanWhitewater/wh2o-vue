<template>
  <div class="loading-overlay">
    <transition name="fade">
      <template v-if="loading">
        <cv-loading
          active
          small
          overlay
        />
      </template>
    </transition>
  </div>
</template>

<script>
export default {
  name:'LoadingOverlay',
  computed: {
      loading() {
          return this.$store.state.globalAppState.globalAppData.loading
      }
  }
};
</script>

<style lang="scss">
.loading-overlay {

}
</style>