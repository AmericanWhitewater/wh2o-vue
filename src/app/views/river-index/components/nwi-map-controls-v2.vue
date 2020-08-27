<template>
  <div>
    <cv-toolbar class="nwi-map-controls-v2">
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
  name: 'nwi-map-controls-v2',
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
  }
}
</script>
