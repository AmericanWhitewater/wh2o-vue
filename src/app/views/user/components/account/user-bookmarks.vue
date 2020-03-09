<template>
  <div class="user-bookmarks">
    <template v-if="loading">
      <loading-block />
    </template>
    <template v-if="!loading && loadedBookmarks">
      <div class="bx--row bx--no-gutter mb-lg">
        <div
          v-for="(item, index) in loadedBookmarks"
          :key="index"
          class="bx--col-sm-12 bx--col-md-8 bx--col-lg-8 bx--col-max-6"
        >
          <ArticleCard
            :key="index"
            :title="item.section.slice(0,75)+'...'"
            :subtitle="item.river"
            river
            condition="low"
            :article-id="item.id"
            :to="`/river-detail/${item.id}/main`"
            :read-time="item.class"
            :author="mockFlowData(1000)"
          />
        </div>
      </div>
    </template>
    <template v-if="!loading && !loadedBookmarks.length">
      <cv-tile class="mb-lg">
        <p class="mb-spacing-lg">
          You dont have any bookmarks. <br>Start by searching for a river.
        </p>
        <cv-search
          v-model="searchTerm"
          placeholder="e.g. Animas"
          theme="light"
          @keypress.enter="searchRiver"
        />
      </cv-tile>
    </template>
  </div>
</template>

<script>
import { appLocalStorage } from '@/app/global/services'
import { ArticleCard, LoadingBlock } from '@/app/global/components'
import { mapState } from 'vuex'
import { bookmarksActions } from '@/app/views/river-detail/shared/state'
import { riverSearchActions } from '@/app/views/river-search/shared/state'

export default {
  name: 'UserBookmarks',
  components: {
    ArticleCard,
    LoadingBlock
  },
  data: () => ({
    searchTerm: ''
  }),
  computed: {
    ...mapState({
      loadedBookmarks: state => state.riverDetailState.bookmarksData.data,
      loading: state => state.riverDetailState.bookmarksData.loading,
      error: state => state.riverDetailState.bookmarksData.error
    }),
    loggedIn () {
      const loggedIn = appLocalStorage.getItem('wh2o-registered')
      if (loggedIn) {
        return loggedIn
      }
      return null
    },
    saveData () {
      const savedData = appLocalStorage.getItem('wh2o-bookmarked-rivers')
      if (savedData) {
        return savedData
      }
      return null
    }
  },
  methods: {
    /**
     * check for existence of bookmarked rivers
     * then check to see if user added a bookmark during session
     *
     */
    checkBookmarks () {
      if (this.savedData && !this.loadedBookmarks.length) {
        this.fetchBookmarks(this.saveData)
      }
      if (this.saveData && this.loadedBookmarks) {
        if (this.saveData.length !== this.loadedBookmarks.length) {
          this.fetchBookmarks(this.saveData)
        }
      }
    },
    /**
     * @param {array} bookmarks user stored bookmarks, An array of reach IDs.
     *
     */
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
    },
    searchRiver () {
      this.$store.dispatch(
        riverSearchActions.FETCH_RIVER_SEARCH_DATA, {
          river: this.searchTerm
        }
      )
      /**
       * @todo figure out how to dynamically set scroll position
       * transition to search page is jarring, search results obscured
       */
      this.$router.push('/river-search').catch(() => {})
    }
  },
  mounted () {
    this.checkBookmarks()
  }
}
</script>

<style>
</style>
