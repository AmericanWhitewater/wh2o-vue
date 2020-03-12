<template>
  <div>
    <app-toaster />
    <app-navigation />
    <app-breadcrumbs />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view :class="[$route.name !== 'home' ? 'interior': null ,'app-main-content']" />
    </transition>
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
  name: 'app',
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
