<template>
  <div>
    <app-toaster />
    <app-header />
    <app-breadcrumbs />
    <router-view class="app-main-content" />
  </div>
</template>

<script>
import { AppToaster, AppHeader, AppBreadcrumbs } from "./global/components";
export default {
  name: "App",
  components: {
    AppHeader,
    AppToaster,
    AppBreadcrumbs
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