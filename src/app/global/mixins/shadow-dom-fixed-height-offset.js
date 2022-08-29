import { laravelDeploy } from '@/app/environment'

export const shadowDomFixedHeightOffset = {
  methods: {
    // if we are in the laravel app, position: fixed doesn't work the same way
    // because it's embedded in a shadow dom, so we need to override the scss-defined
    // styling
    shadowDomFixedHeightOffset () {
      if (laravelDeploy) {
        const fixedTopBarHeight = window.outerWidth < 992 ? 0 : 21
        const menuHeight = window.outerWidth < 992 ? 50 : 55
        const combinedHeight = fixedTopBarHeight + menuHeight
        let top
        let heightOffset

        // this logic is a thorough mess, but this is the only way I could get it to
        // work consistently across Chrome, FF, and Safari
        // if user is scrolled so the top menu is out of site
        if (window.scrollY > menuHeight) {
          if (fixedTopBarHeight > 0) {
            top = window.scrollY - (fixedTopBarHeight + 13)
          } else {
            top = window.scrollY - menuHeight
          }
          heightOffset = fixedTopBarHeight
        } else if (window.scrollY === 0) {
          top = fixedTopBarHeight
          heightOffset = combinedHeight
        } else {
          top = fixedTopBarHeight
          heightOffset = combinedHeight - window.scrollY
        }
        return `
          top: ${top}px;
          height: calc(100vh - ${heightOffset}px);
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
