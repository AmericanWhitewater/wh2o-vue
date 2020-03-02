<template>
  <div class="user-bookmarks">
    <template v-if="loading">
      <loading-block />
    </template>
    <template v-if="!loading && loadedBookmarks.length >= 1">
      <div class="bx--row bx--no-gutter">
        <div
          v-for="(item, index) in loadedBookmarks"
          :key="index"
          class="bx--col-sm-4 bx--col-md-8 bx--col-lg-6 "
        >
          <ResourceCard
            :key="index"
            :title="item.section.slice(0,50)+'...'"
            :subtitle="item.river"
            :to="`/river-detail/${item.id}/main`"
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
import { ResourceCard, LoadingBlock } from '@/app/global/components'
import { mapState } from 'vuex'
import { bookmarksActions } from '@/app/views/river-detail/shared/state'

export default {
  name: 'UserBookmarks',
  components: {
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
    }
  },
  mounted () {
    this.bookmarks = appLocalStorage.getItem('wh2o-bookmarked-rivers')
    this.fetchBookmarks(this.bookmarks)
  }
}
</script>

<style>
</style>
