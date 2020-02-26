<template>
  <div class="bx--row resource-card-group">
    <div class="bx--no-gutter bx--col-md-4 bx--col-lg-8">
      <slot name="cardOne" />
    </div>
    <div class="bx--no-gutter bx--col-md-4 bx--col-lg-8">
      <slot name="cardTwo" />
    </div>
    <div class="bx--no-gutter bx--col-md-4 bx--col-lg-8">
      <slot name="cardThree" />
    </div>
    <div class="bx--no-gutter bx--col-md-4 bx--col-lg-8">
      <slot name="cardFour" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourceCardGroup'
}
</script>

<style>

</style>
