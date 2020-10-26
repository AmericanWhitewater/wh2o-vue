<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <div
      v-show="results || loading"
      class="nwi-result-counter"
    >
      <a href="#nwi-rivers-table">
        <!-- <cv-inline-loading
          v-if="loading"
          class="bx--tag--blue bx--tag"
          state="loading"
        /> -->

        <!-- <cv-tag
          v-else
          kind="blue"
          :label="`Results Found: ${results}`"
          :disabled="false"
        /> -->
        {{ results }}
      </a>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'nwi-result-counter',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    results () {
      return this.$store.state.RiverIndex.data?.length
    }
  }
}
</script>
