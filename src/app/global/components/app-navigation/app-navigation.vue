<template>
  <div :class="[{ home: homePage }, 'app-header']">
    <template v-if="windowWidth >= breakpoints.lg">
      <desktop-nav :nav-items="navItems" />
    </template>
    <template v-else>
      <mobile-nav :nav-items="navItems" />
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
  name: 'AppNavigation',
  components: {
    'desktop-nav': DesktopNav,
    'mobile-nav': MobileNav
  },
  mixins: [checkWindow, navItems],
  computed: {
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
  @include layer("overlay");
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
