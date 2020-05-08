<template>
  <div>
    <cv-toolbar class="nwi-map-controls-v2">
      <cv-overflow-menu class="bx--toolbar-action">
        <template slot="trigger">
          <PaintBrushAlt16 class="" />
        </template>
        <cv-toolbar-title title="Map Style" />
        <cv-toolbar-option>
          <cv-radio-button
            v-model="mapStyle"
            name="topographic"
            label="Topographic"
            value="topo"
          />
        </cv-toolbar-option>
        <cv-toolbar-option>
          <cv-radio-button
            v-model="mapStyle"
            name="satellite"
            label="Satellite"
            value="satellite"
          />
        </cv-toolbar-option>
      </cv-overflow-menu>
      <cv-button
        id="fullscreen-trigger"
        kind="ghost"
        @click.exact="toggleFullscreen()"
        @keydown.enter="toggleFullscreen()"
      >
        <Maximize16 />
      </cv-button>
      <search-bar
        size="small"
        @search:submitted="fetchRivers"
      />
    </cv-toolbar>
  </div>
</template>
<script>
import { riverSearchActions } from '@/app/views/river-search/shared/state'
import { riverIndexActions } from '../shared/state'
import screenfull from 'screenfull'
import SearchBar from '@/app/global/components/search-bar/search-bar.vue'
export default {
  name: 'nwi-map-controls-v2',
  components: {
    SearchBar
  },
  data: () => ({
    mapStyle: 'topo'
  }),
  watch: {
    mapStyle (v) {
      this.$store.dispatch(riverIndexActions.SET_MAP_STYLE, v)
    }
  },
  methods: {
    toggleFullscreen () {
      if (this.fullscreen) {
        this.fullscreen = false
        this.fullscreenIcon = 'Maximize16'
      } else {
        this.fullscreen = true
        this.fullscreenIcon = 'Minimize16'
      }
      screenfull.toggle(document.getElementById('fullscreen-target'))
    },
    fetchRivers (term) {
      this.$store.dispatch(
        riverSearchActions.FETCH_RIVER_SEARCH_DATA,
        term
      )
    }
  }
}
</script>
<style lang="scss">
#fullscreen-trigger{
  display:none;
  @include carbon--breakpoint('sm') {
    display: block;
  }
}
</style>
