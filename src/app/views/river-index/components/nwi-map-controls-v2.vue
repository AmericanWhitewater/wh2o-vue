<template>
  <cv-toolbar class="nwi-map-controls-v2">
    <cv-toolbar-search
      v-model="riverSearchHttpConfig.river"
      @keydown.enter="fetchRivers"
    />
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
      <cv-overflow-menu-item primary-focus>
        Refresh table
      </cv-overflow-menu-item>
      <cv-toolbar-divider />
      <cv-toolbar-title title="Map Style" />
      <cv-toolbar-option>
        <cv-radio-button
          v-model="mapStyle"
          name="row-height"
          label="Topographic"
          value="topo"
        />
      </cv-toolbar-option>
      <cv-toolbar-option>
        <cv-radio-button
          v-model="mapStyle"
          name="row-height"
          label="Satellite"
          value="satellite"
        />
      </cv-toolbar-option>
      <cv-toolbar-option>
        <cv-radio-button
          v-model="mapStyle"
          name="row-height"
          label="Graphic"
          value="graphic"
        />
      </cv-toolbar-option>
    </cv-overflow-menu>
    <cv-button
      v-if="!mobileDevice"
      kind="tertiary"
      size="small"
      small
      @click="toggleFullscreen"
      v-text="'Fullscreen'"
    />
  </cv-toolbar>
</template>
<script>
import { riverSearchHttpConfig, checkWindow } from '@/app/global/mixins'
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
    }
  }
}
</script>
