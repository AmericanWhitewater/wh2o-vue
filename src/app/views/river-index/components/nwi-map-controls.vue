<template>
  <div>
    <nwi-basemap-toggle
      v-if="controlEnabled('baseMap')"
      :style="getControlOffset('baseMap')"
    />
    <nwi-fullscreen-toggle
      v-if="controlEnabled('fullscreen')"
      :fullscreen-target="fullscreenTarget"
      :style="getControlOffset('fullscreen')"
    />
  </div>
</template>

<script>
import {
  NwiFullscreenToggle,
  NwiBasemapToggle,
} from '.'
export default {
  name: 'nwi-map-controls',
  components: {
    NwiBasemapToggle,
    NwiFullscreenToggle
  },
  props: {
    fullscreenTarget: {
      type: String,
      required: false
    },
    mapControls: {
      type: Array,
      default: () => ['baseMap', 'fullscreen']
    }
  },
  methods: {
    controlEnabled (control) {
      return this.mapControls.includes(control)
    },
    getControlOffset (control) {
      if (control === 'fullscreen') {
        return
      }
      let offsetString = '0.5rem'
      if (this.controlEnabled('fullscreen')) {
        offsetString += ' + 50px'
      }
      return `right: calc(${offsetString})`
    }
  }
}
</script>
