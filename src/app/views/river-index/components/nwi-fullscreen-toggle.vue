<template>
  <div class="nwi-fullscreen-toggle">
    <cv-button
      id="fullscreen-trigger"
      kind="ghost"
      @click.exact="toggleFullscreen()"
      @keydown.enter="toggleFullscreen()"
    >
      <component :is="fullscreenIcon" />
    </cv-button>
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
    fullscreenIcon: 'Maximize16'
  }),
  methods: {
    toggleFullscreen () {
      if (this.fullscreen) {
        this.fullscreen = false
        this.fullscreenIcon = 'Maximize16'
      } else {
        this.fullscreen = true
        this.fullscreenIcon = 'Minimize16'
      }
      screenfull.toggle(document.getElementById(this.fullscreenTarget))
    }
  }
}
</script>

<style lang="scss">
.nwi-fullscreen-toggle {
  background-color: #f4f7fb;
  border-radius: 3px;
  top: 0.5rem; // make space for toolbar on top
  right: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 1;
  display: block;

  button {
    // ensures that hover bg color change doesn't
    // change the borders
    &.bx--btn--ghost {
      border-radius: 3px;
    }
    &.bx--btn {
      min-height: unset;
    }
    &.bx--dropdown-text {
      cursor: pointer;
    }
  }
}
</style>
