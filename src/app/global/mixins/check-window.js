/**
 * Vue mixin to check the window width on resize for responsize behavior.
 *
 */

import Breakpoints from '../services/breakpoints/breakpoints'

export const checkWindow = {
  data: () => ({
    breakpoints: Breakpoints,
    windowWidth: 0
  }),
  methods: {
    updateStoredWindowWidth () {
      this.windowWidth = window.innerWidth
    }
  },
  mounted () {
    this.windowWidth = window.innerWidth

    this.$nextTick(() => {
      window.addEventListener('resize', this.updateStoredWindowWidth)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateStoredWindowWidth)
  }
}
