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
          <div
            v-for="c in credits"
            :key="c.revision"
            class="bx--row mb-md"
          >
            <div class="bx--col">
              <h5>Revision Date: {{ formatDate(c.edited) }}</h5>
              <h5>Edited By: {{ c.sk && c.sk.contact && c.sk.contact.name }}</h5>
              <h3>Revision Comment: {{ c.revision_comment }}</h3>
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
      loading: state => state.RiverCredits.loading,
      error: state => state.RiverCredits.error,
      credits: state => state.RiverCredits.data
    }),
    reachId () {
      return this.$route.params.id
    }
  },
  methods: {
    loadData () {
      this.$store.dispatch(
        'RiverCredits/getProperty',
        this.reachId
      )
    }
  },
  created () {
    this.loadData()
  }
}
</script>
