<template>
  <div>
    <cv-toolbar class="nwi-map-search">
      <search-bar
        size="small"
        @search:submitted="fetchRivers"
      />
    </cv-toolbar>
  </div>
</template>
<script>
import { riverSearchActions } from '@/app/views/river-search/shared/state'
import SearchBar from '@/app/global/components/search-bar/search-bar.vue'
export default {
  name: 'nwi-map-search',
  components: {
    SearchBar
  },
  methods: {
    fetchRivers (term) {
      this.$store.dispatch(
        riverSearchActions.FETCH_RIVER_SEARCH_DATA,
        { river: term }
      )
    }
  },
  // ensure map search bar is empty when page loads
  created () {
    this.$store.dispatch(riverSearchActions.CLEAR_SEARCH_QUERY)
  }
}
</script>
