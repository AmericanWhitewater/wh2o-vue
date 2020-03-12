<template>
  <div class="submodule-two pt-4">
    <h4>{{ $route.name }}</h4>
    <hr>
    <div>Name: {{ $route.name }}</div>
    <div>Path: {{ $route.path }}</div>
    <div>Full Path: {{ $route.fullPath }}</div>
  </div>
</template>
<script>
import { submoduleTwoActions } from '../shared/state'
export default {
  name: 'community-partners',
  created () {
    this.$store.dispatch(submoduleTwoActions.FETCH_SUBMODULE_TWO_DATA)
  }
}
</script>
<style lang="scss" scoped>
.submodule-two {
  background-color: $ui-03;
  padding: $layout-lg;
}
</style>
<docs>

</docs>
