<template>
  <div class="credits-tab">
    <layout name="layout-full-width">
      <template #main>
        <template v-if="loading">
          <utility-block
            state="loading"
            text="Loading Credits..."
          />
        </template>
        <template v-else-if="credits">
          results
        </template>
        <template v-else>
          <utility-block
            state="error"
            title="Credits unavailable"
            text="please try again later"
          />
        </template>
      </template>
    </layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { creditsActions } from '../shared/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { Layout } from '@/app/global/layout'
export default {
  name: 'credits-tab',
  components: {
    UtilityBlock,
    Layout
  },
  data: () => ({
    creditsHttpConfig: 'let there be error'
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.creditsData.loading,
      error: state => state.riverDetailState.creditsData.error,
      credits: state => state.riverDetailState.creditsData.credits
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
