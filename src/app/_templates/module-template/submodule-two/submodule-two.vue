<template>
  <div class="submodule-two pt-4">
    submodule-two
  </div>
</template>
<script>
import { submoduleTwoActions } from '../shared/state'
export default {
  name: 'submodule-two',
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
