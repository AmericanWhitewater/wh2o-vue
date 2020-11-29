<template>
  <div class="image-slider">
    <template v-if="!images.length"> empty </template>
    <template v-else>
      <template v-for="(item, index) in images">
        <img
          v-show="activeIndex === index"
          :key="`image-${index}`"
          :src="item"
        >
      </template>
      <div class="control-wrapper">
        <div
          v-for="(item, index) in images"
          :key="`control-${index}`"
          :class="[index === activeIndex ? 'active' : '', 'control']"
          @click.exact="activeIndex = index"
        />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "image-slider",
  props: {
    images: {
      type: Array,
      default: () => [],
    }
  },
  data: () => ({
    activeIndex: 0,
  }),
};
</script>
<style lang="scss" scoped>
.image-slider {
  .control-wrapper {
    display: flex;
    padding-top: 0.5rem;
    .control {
      position: relative;
      height: 1rem;
      width: 1rem;
      background-color: $ui-04;
      margin-right: 0.5rem;
      cursor: pointer;
      &.active {
        background-color: $ui-03;
      }
    }
  }
}
</style>
