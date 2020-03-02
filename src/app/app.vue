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
import { appLocalStorage } from '@/app/global/services'
import { userActions } from '@/app/views/user/shared/state'
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
  },
  mounted () {
    const userLoggedIn = appLocalStorage.getItem('wh2o-registered')
    if (userLoggedIn) {
      this.$store.dispatch(userActions.USER_LOGIN, {
        admin: null
      })
    }
  }
}
</script>
<style lang="scss">
.app-main-content {
  min-height: calc(100vh - 125px);
}
</style>
