<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col-sm-12 bx--col-md-12 bx--col-lg-16">
        <slot name="main" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutFullWidth'
}
</script>
