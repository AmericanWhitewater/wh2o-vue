<template>
  <div>
    <app-toaster />
    <app-navigation />
    <app-breadcrumbs />
    <router-view class="app-main-content" />
    <app-footer />
  </div>
</template>

<script>
import {
  AppToaster,
  AppNavigation,
  AppBreadcrumbs,
  AppFooter
} from './global/components'

export default {
  name: 'App',
  metaInfo: {
    title: 'American Whitewater'
  },
  components: {
    AppBreadcrumbs,
    AppFooter,
    AppNavigation,
    AppToaster
  }
}
</script>
<style lang="scss">
.app-main-content {
  // add 44px to account for breadcrumbs
  background-color: $ui-01;
  padding-top: $mobile-nav-height + 44px;
  min-height: calc(100vh - 125px);
  @include MQ("LG") {
    padding-top: $desktop-nav-height + 44px;
  }
}
</style>
