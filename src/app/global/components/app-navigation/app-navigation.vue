<template>
  <div :class="[{ home: homePage }, 'app-header']">
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
import { mapState } from 'vuex'

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
    ...mapState({
      offline: state => state.appGlobalState.appGlobalData.offline
    }),
    homePage () {
      if (this.$route.name === 'home') {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss">
.app-header {
  @include layer("raised");
  border-bottom: 1px solid $ui-03;
  background-color: $ui-01;
  position: fixed;
  width: 100vw;
  z-index: 3;
  &.home {
    background-color: rgba($ui-01, 0.05);
    box-shadow: none;
  }
}
</style>
<docs>

```js
<app-navigation />
```

</docs>
