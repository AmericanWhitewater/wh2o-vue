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
import SearchBar from '@/app/global/components/search-bar/search-bar.vue'
export default {
  name: 'nwi-map-search',
  components: {
    SearchBar
  },
  methods: {
    fetchRivers (term) {
      this.$store.dispatch(
        'RiverIndex/fetchMapSearchData',
        term
      )
    }
  }
}
</script>
