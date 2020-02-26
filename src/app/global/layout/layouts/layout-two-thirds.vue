<template>
  <div class="bx--grid">
    <div class="bx--row">
      <template v-if="options.sidebar.left">
        <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-5">
          <slot name="sidebar" />
        </div>
        <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-10 bx--offset-lg-1">
          <slot name="main" />
        </div>
      </template>
      <template v-else>
        <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-10">
          <slot name="main" />
        </div>
        <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-5 bx--offset-lg-1">
          <slot name="sidebar" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LayoutTwoThirds',
  props: {
    options: {
      type: Object,
      required: false,
      default: () => ({
        sidebar: {
          left: false
        }
      })
    }
  }
}
</script>
