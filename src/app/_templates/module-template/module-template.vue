<template>
  <div class="module-template">
    module-template
  </div>
</template>
<script>

/**
 * @description use this as a starting point for new views.
 *
 */

import { mapState } from 'vuex'
import { moduleActions } from './shared/state'

export default {
  name: 'module-template',
  computed: {
    ...mapState({
      loading: state => state.moduleState.moduledata.loading,
      data: state => state.moduleState.moduledata.data,
      error: state => state.moduleState.moduledata.error
    })
  },
  created () {
    this.$store.dispatch(moduleActions.FETCH_MODULE_DATA)
  }
}
</script>
