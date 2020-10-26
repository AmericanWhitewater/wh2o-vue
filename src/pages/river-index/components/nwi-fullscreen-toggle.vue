<template>
  <div class="nwi-fullscreen-toggle">
    <v-btn
      id="fullscreen-trigger"
      @click.exact="toggleFullscreen()"
      @keydown.enter="toggleFullscreen()"
      icon
    >
       <v-icon> {{ fullscreenIcon}} </v-icon>
    </v-btn>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'nwi-fullscreen-toggle',
  props: {
    fullscreenTarget: {
      type: String,
      required: false
    }
  },
  data: () => ({
    fullscreen: false,
    fullscreenIcon: 'mdi-fullscreen'
  }),
  methods: {
    toggleFullscreen () {
      if (this.fullscreen) {
        this.fullscreen = false
        this.fullscreenIcon = 'mdi-fullscreen'
      } else {
        this.fullscreen = true
        this.fullscreenIcon = 'mdi-fullscreen-exit'
      }
      screenfull.toggle(document.getElementById(this.fullscreenTarget))
    }
  }
}
</script>

<style lang="scss">
.nwi-fullscreen-toggle {
  padding: 2px;
  background-color: #f4f7fb;
  top: 0.5rem; // make space for toolbar on top
  right: 0.5rem;
  position: absolute;
  z-index: 1;
}
</style>
