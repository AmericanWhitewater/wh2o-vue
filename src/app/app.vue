<template>
  <div>
    <app-toaster />
    <app-header />
    <app-breadcrumbs />
    <transition name="fade" mode="out-in">
      <router-view class="app-main-content" />
    </transition>
    <app-footer v-if="$route.name !== 'home'" />
  </div>
</template>

<script>
import {
  AppToaster,
  AppHeader,
  AppBreadcrumbs,
  AppFooter
} from "./global/components";

export default {
  name: "App",
  components: {
    AppBreadcrumbs,
    AppFooter,
    AppHeader,
    AppToaster
  }
};
</script>
<style lang="scss">
.app-main-content {
  // add 44px to account for breadcrumbs
  padding-top: $mobile-nav-height + 44px;
  margin-bottom: $layout-xl;
  @include MQ("LG") {
    padding-top: $desktop-nav-height + 44px;
    margin-bottom: $layout-xl;
  }
}
</style>
