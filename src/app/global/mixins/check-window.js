/**
 * Vue mixin to check the window width on resize for responsize behavior.
 *
 */

import Breakpoints from '../services/breakpoints'

export const checkWindow = {
  data: () => ({
    windowWidth: 0
  }),
  breakpoints: null,
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
  created () {
    this.$options.breakpoints = Breakpoints
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateStoredWindowWidth)
  }
}
