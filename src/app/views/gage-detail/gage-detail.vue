<template>
  <div class="gage-detail">
    gage detail
  </div>
</template>
<script>

/**
 * @description use this as a starting point for new views.
 *
 */

import { mapState } from 'vuex'
import { gageDetailActions } from './shared/state'

export default {
  name: 'gage-detail',
  computed: {
    ...mapState({
      loading: state => state.gageDetailState.gageDetailData.loading,
      data: state => state.gageDetailState.gageDetailData.data,
      error: state => state.gageDetailState.gageDetailData.error
    })
  },
  created () {
    this.$store.dispatch(gageDetailActions.FETCH_GAGE_DATA, this.$route.params.gageId)
  }
}
</script>
