<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-10 main">
        <slot name="main" />
      </div>
      <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-5 bx--offset-lg-1 sidebar">
        <slot name="sidebar" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @todo add prop for sidebar left or side bar right
 */
export default {
  name: 'LayoutTwoThirds'
}
</script>
