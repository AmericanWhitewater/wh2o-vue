<template>
  <div class="search-results-counter" />
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchResultsCounter',
  computed: {
    ...mapState({
      searchResults: state => state.riverSearchState.riverSearchData.data,
      searchLoading: state => state.riverSearchState.riverSearchData.loading,
      searchError: state => state.riverSearchState.riverSearchData.error
    })
  }
}
</script>

<style lang="scss" scoped>
.search-results-counter {

}
</style>
