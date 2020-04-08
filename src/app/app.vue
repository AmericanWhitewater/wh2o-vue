<template>
  <div class="wh2o-vue">
    <app-toaster />
    <app-navigation />
    <router-view
      :class="[$route.name !== 'home' ? 'interior' : null, 'app-main-content']"
    />
    <app-cookie-banner />
  </div>
</template>

<script>
import {
  AppToaster,
  AppNavigation
  , AppCookieBanner
} from './global/components'
import { appLocalStorage } from '@/app/global/services'
import { userActions } from '@/app/views/user/shared/state'

export default {
  name: 'app',
  metaInfo: {
    title: 'American Whitewater'
  },
  components: {
    AppNavigation,
    AppToaster,
    AppCookieBanner
  },
  created () {
    if (appLocalStorage.getItem('wh2o-auth')) {
      this.$store.dispatch(userActions.FETCH_USER_DATA)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
