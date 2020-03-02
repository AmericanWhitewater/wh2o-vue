<template>
  <div class="user-bookmarks">
    <template v-if="loading">
      <loading-block />
    </template>
    <template v-if="!loading && loadedBookmarks.length >= 1">
      <div class="bx--row bx--no-gutter mb-lg">
        <div
          v-for="(item, index) in loadedBookmarks"
          :key="index"
          class="bx--col-sm-4 bx--col-md-8 bx--col-lg-6 "
        >
          <ArticleCard
            :key="index"
            :title="item.section.slice(0,75)+'...'"
            :subtitle="item.river"
            river
            :article-id="item.id"
            :to="`/river-detail/${item.id}/main`"
            :read-time="item.class"
            :author="mockFlowData(1000)"
          />
        </div>
        <div
          class="bx--col-sm-12 bx--col-md-6 bx--col-lg-6 "
        >
          <ResourceCard
            title="River Search"
            to="/river-search"
            icon="AddAlt32"
          />
        </div>
      </div>
    </template>
    <template v-if="!loading && loadedBookmarks.length === 0">
      <cv-tile>
        <h3 class="mb-spacing-sm">
          No Bookmarks
        </h3>
        <p class="mb-spacing-sm">
          Start adding some!
        </p>
        <ResourceCard

          title="River Search"
          to="/river-search"
          icon="AddAlt32"
        />
      </cv-tile>
    </template>
  </div>
</template>

<script>
import { appLocalStorage } from '@/app/global/services'
import { ArticleCard, ResourceCard, LoadingBlock } from '@/app/global/components'
import { mapState } from 'vuex'
import { bookmarksActions } from '@/app/views/river-detail/shared/state'

export default {
  name: 'UserBookmarks',
  components: {
    ArticleCard,
    ResourceCard,
    LoadingBlock
  },
  data: () => ({
    bookmarks: null
  }),
  computed: {
    ...mapState({
      loadedBookmarks: state => state.riverDetailState.bookmarksData.data,
      loading: state => state.riverDetailState.bookmarksData.loading,
      error: state => state.riverDetailState.bookmarksData.error
    }),
    loggedIn () {
      const loggedIn = appLocalStorage.getItem('wh2o-registered')
      return loggedIn
    },
    storedRivers () {
      return appLocalStorage.getItem('wh2o-bookmarked-rivers')
    }
  },
  watch: {
    storedRivers () {
      this.fetchBookmarks(this.storedRivers)
    }
  },
  methods: {
    fetchBookmarks (bookmarks) {
      for (let i = 0; i < bookmarks.length; i++) {
        this.$store.dispatch(
          bookmarksActions.FETCH_BOOKMARKS_DATA,
          bookmarks[i]
        )
      }
    },
    mockFlowData (max) {
      return `${Math.floor(Math.random() * Math.floor(max))} [cfs]`
    }
  },
  mounted () {
    this.bookmarks = appLocalStorage.getItem('wh2o-bookmarked-rivers')
    if (this.loadedBookmarks.length === 0) {
      this.fetchBookmarks(this.bookmarks)
    }
  }
}
</script>

<style>
</style>
