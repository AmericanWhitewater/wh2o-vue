<template>
  <div class="app-navigation">
    <template v-if="windowWidth <= $options.breakpoints.lg">
      <mobile-nav
        :nav-items="navItems"
        :offline="offline"
      />
    </template>
    <template v-else>
      <desktop-nav
        :nav-items="navItems"
        :offline="offline"
      />
    </template>
  </div>
</template>

<script>
import DesktopNav from './components/desktop-nav'
import MobileNav from './components/mobile-nav'
import { navItems, checkWindow } from '@/app/global/mixins'

/**
 * @displayName App Navigation
 *
 */
export default {
  name: 'app-navigation',
  components: {
    'desktop-nav': DesktopNav,
    'mobile-nav': MobileNav
  },
  mixins: [checkWindow, navItems],
  computed: {
    offline () {
      return this.$store.state.Global.offline
    }
  }
}
</script>

<style lang="scss">
.app-navigation {
  @include layer("raised");
  border-bottom: 1px solid $ui-03;
  background-color: $ui-01;
  position: fixed;
  width: 100vw;
  z-index: 3
}
</style>
