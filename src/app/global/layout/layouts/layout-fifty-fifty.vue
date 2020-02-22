<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col-sm-12 bx--col-md-6 bx--col-lg-8">
        <slot name="left" />
      </div>
      <div class="bx--col-sm-12 bx--col-md-6 bx--col-lg-8">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutFiftyFifty'
}
</script>
