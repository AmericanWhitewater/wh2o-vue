<template>
  <div class="submodule-one pt-4">
    <h4>{{ $route.name }}</h4>
    <hr>
    <div>Name: {{ $route.name }}</div>
    <div>Path: {{ $route.path }}</div>
    <div>Full Path: {{ $route.fullPath }}</div>
  </div>
</template>
<script>
import { submoduleOneActions } from '../shared/state'
export default {
  name: 'SubmoduleOne',
  created () {
    this.$store.dispatch(submoduleOneActions.FETCH_SUBMODULE_ONE_DATA)
  }
}
</script>
<style lang="scss" scoped>
.submodule-one {
 background-color: $ui-03;
 padding: $layout-lg;
}
</style>
<docs>

</docs>
