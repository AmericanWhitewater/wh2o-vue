<template>
  <div>
    <app-toaster />
    <app-navigation />
    <app-breadcrumbs />
    <router-view :class="[$route.name !== 'home' ? 'interior': null ,'app-main-content']" />
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
  min-height: calc(100vh - 125px);
}
</style>
