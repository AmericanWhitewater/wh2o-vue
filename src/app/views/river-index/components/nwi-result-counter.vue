<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-show="results"
      class="nwi-result-counter"
    >
      <a href="#nwi-rivers-table">
        <cv-tag
          kind="blue"
          :label="`Results Found: ${results}`"
          :disabled="false"
        />
      </a>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'nwi-result-counter',
  computed: {
    results () {
      return this.$store.state.riverIndexState.riverIndexData.data?.length
    }
  }
}
</script>
<style lang="scss" scoped>
.nwi-result-counter {
  border-radius: 3px;
  bottom: 0.5rem;
  display: block;
  position: absolute;
  right: 0.5rem;
  z-index: 1;
}
</style>
