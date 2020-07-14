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
          <div class="bx--row mb-md">
            <div class="bx--col">
              <h5>Revision Date: {{ formatDate(credits.revision, 'll') }}</h5>
              <h3>Revision Comment: {{ credits.revision_comment }}</h3>
            </div>
          </div>
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
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.creditsData.loading,
      error: state => state.riverDetailState.creditsData.error,
      credits: state => state.riverDetailState.creditsData.data
    }),
    reachId () {
      return this.$route.params.id
    }
  },
  methods: {
    loadData () {
      this.$store.dispatch(
        creditsActions.FETCH_CREDITS_DATA,
        this.reachId
      )
    }
  },
  created () {
    this.loadData()
  }
}
</script>
