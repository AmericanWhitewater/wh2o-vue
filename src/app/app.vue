<template>
  <div>
    <app-toaster />
    <app-header />
    <div :class="[windowSize, 'main-content-area']">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
// should just be able to import from global/components?
import { AppToaster, AppHeader } from "./global/components";
import CheckWindow from "./global/services/mixins/check-window";
export default {
  name: "App",
  mixins: [CheckWindow],
  components: {
    AppHeader,
    AppToaster
  },
  computed: {
    windowSize() {
      if (this.windowWidth > this.breakpoints.lg) {
        return "desktop";
      } else {
        return "mobile";
      }
    }
  }
};
</script>

<style lang="scss">
.main-content-area {
  &.desktop {
    padding-top: 75px;
  }
  &.mobile {
    padding-top: 50px;
  }
}
</style>
