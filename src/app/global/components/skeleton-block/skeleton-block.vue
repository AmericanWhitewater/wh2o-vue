<template>
  <div
    id="skeleton-block"
    class="bx--skeleton__text bx--skeleton__heading"
    :style="`height:${height}px`"
  />
</template>
<script>
/**
 * @todo refactor loading-block, error-block, skeleton-block into one component
 *
 */
export default {
  name: 'SkeletonBlock',
  props: {
    height: {
      type: String,
      default: '350'
    }
  }
}
</script>
<style lang="scss" scoped>
#skeleton-block {
  .bx--skeleton__heading {
    height: 100% !important;
  }
}
</style>
