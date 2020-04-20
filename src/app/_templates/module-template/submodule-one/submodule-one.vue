<template>
  <div class="submodule-one pt-4">
    submodule-one
  </div>
</template>
<script>
import { submoduleOneActions } from '../shared/state'
export default {
  name: 'submodule-one',
  created () {
    this.$store.dispatch(submoduleOneActions.FETCH_SUBMODULE_ONE_DATA)
  }
}
</script>
