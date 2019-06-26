<template lang="html">
  <div :class="[tier, 'page-banner-container bx--row']">
    <div class="bx--col-sm-12 bx--col-md-12 bx--col-lg-12">
      <div class="page-banner-content">
        <div>
          <h1>{{ heading }}</h1>
          <h3>{{ subheading }}</h3>
          <a v-if="editable" href="#">Toggle Edit Mode</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageBanner",
  props: {
    heading: {
      type: String,
      default: "Page Title"
    },
    subheading: {
      type: String,
      default: ""
    },
    editable: {
      type: Boolean,
      default: false
    },
    tier: {
      type: String,
      default: "L2"
    }
  }
};
</script>

<style lang="scss" scoped>
.page-banner-container {
  background-color: $ui-03;
  &.hero {
    height: 100vh;
  }
  &.L1 {
    height: 70vh;
  }
  &.L2 {
    height: 50vh;
  }
  .page-banner-content {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    justify-content: flex-end;
  }
}
</style>
