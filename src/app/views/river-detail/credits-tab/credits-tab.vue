<template>
  <div class="credits-tab">
    <template v-if="loading">
      <loading-block text="Loading Credits..." />
    </template>
    <template v-if="!loading && error">
      <error-block
        title="Credits unavailable"
        text="please try again later"
      />
    </template>
    <template v-if="!loading && !error">
      <div class>
        credits results!
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { creditsActions } from '../shared/state'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'

export default {
  name: 'credits-tab',
  components: {
    ErrorBlock,
    LoadingBlock
  },
  data: () => ({
    creditsHttpConfig: 'let there be error'
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.creditsData.loading,
      error: state => state.riverDetailState.creditsData.error
    })
  },
  methods: {
    loadData () {
      if (!this.data && !this.error) {
        this.$store.dispatch(
          creditsActions.FETCH_CREDITS_DATA,
          this.creditsHttpConfig
        )
      }
    }
  },
  created () {
    this.loadData()
  }
}
</script>
<style lang="scss" scoped>
.credits-tab {
  padding-top: 2rem;
}
</style>
