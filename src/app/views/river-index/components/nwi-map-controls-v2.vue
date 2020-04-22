<template>
  <div>
    <cv-search
      v-model="riverSearchHttpConfig.river"
      size="large"
      @keydown.enter="fetchRivers"
    />
    <cv-toolbar class="nwi-map-controls-v2">
      <cv-overflow-menu class="bx--toolbar-action">
        <template slot="trigger">
          <Filter16 class="bx--overflow-menu__icon bx--toolbar-filter-icon" />
        </template>
        <cv-toolbar-title title="Show Features" />
        <cv-toolbar-option>
          <cv-checkbox
            v-model="visibleFeatures.rapids"
            value="rapids"
            label="Rapids"
          />
        </cv-toolbar-option>
        <cv-toolbar-option>
          <cv-checkbox
            v-model="visibleFeatures.projects"
            value="projects"
            label="Projects"
          />
        </cv-toolbar-option>
        <cv-toolbar-option>
          <cv-checkbox
            v-model="visibleFeatures.bookmarks"
            value="bookmarks"
            label="Saved Points"
          />
        </cv-toolbar-option>
      </cv-overflow-menu>
      <cv-overflow-menu class="bx--toolbar-action">
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
      <div v-if="!mobileDevice">
        <cv-button
          kind="tertiary"
          size="small"
          small
          @click="toggleFullscreen"
          v-text="'Fullscreen'"
        />
      </div>
    </cv-toolbar>
  </div>
</template>
<script>
import { riverSearchHttpConfig, checkWindow } from '@/app/global/mixins'
import { riverSearchActions } from '@/app/views/river-search/shared/state'
import { riverIndexActions } from '../shared/state'
import screenfull from 'screenfull'
export default {
  name: 'nwi-map-controls-v2',
  mixins: [riverSearchHttpConfig, checkWindow],
  data: () => ({
    mapStyle: 'topo',
    visibleFeatures: {
      rapids: true,
      pins: true,
      projects: true
    }
  }),
  computed: {
    mobileDevice () {
      return this.windowWidth < this.breakpoints.lg
    }
  },
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
    fetchRivers () {
      this.$store.dispatch(
        riverSearchActions.FETCH_RIVER_SEARCH_DATA,
        this.riverSearchHttpConfig
      )
    }
  }
}
</script>
