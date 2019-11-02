<template>
  <div>
    <app-toaster />
    <app-header />
    <app-breadcrumbs />
    <router-view class="app-main-content" />
    <app-footer v-if="$route.name !== 'home'" />
  </div>
</template>

<script>
import { AppToaster, AppHeader, AppBreadcrumbs, AppFooter } from "./global/components";
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
  @include MQ("LG") {
    padding-top: $desktop-nav-height + 44px;
  }
}
</style>