import { laravelDeploy } from '@/environment'

export const shadowDomFixedHeightOffset = {
  methods: {
    // if we are in the laravel app, position: fixed doesn't work the same way
    // because it's embedded in a shadow dom, so we need to override the scss-defined
    // styling
    shadowDomFixedHeightOffset () {
      if (laravelDeploy) {
      // determine page size relative to carbon breakpoint
        const widthInRem = window.outerWidth / parseFloat(getComputedStyle(document.documentElement).fontSize)
        const navHeight = widthInRem < 42 ? 50 : 79
        const height = window.scrollY + navHeight
        return `
          top: ${height}px;
          height: calc(100vh - ${navHeight}px);
        `
      }
      return ''
    },
    // requires a cv-modal in $refs.modalWrapper
    setModalOffset () {
      this.$nextTick(() => {
        this.$refs.modalWrapper.$el.style = this.shadowDomFixedHeightOffset()
      })
    }
  }
}
