<template>
  <div class="wh2o-vue">
    <app-toaster />
    <app-navigation v-if="!hideNavigation" />
    <router-view
      :class="[{'laravel-deploy': hideNavigation }, $route.name !== 'home' ? 'interior' : null, 'app-main-content']"
    />
    <app-cookie-banner />
  </div>
</template>

<script>
import {
  AppToaster,
  AppNavigation,
  AppCookieBanner
} from './global/components'
import { appLocalStorage } from '@/app/global/services'
import { userActions } from '@/app/views/user/shared/state'
import { laravelDeploy } from '@/app/environment/environment'

export default {
  name: 'app',
  components: {
    AppNavigation,
    AppToaster,
    AppCookieBanner
  },
  data: () => ({
    hideNavigation: false
  }),
  metaInfo: {
    title: 'American Whitewater'
  },
  created () {
    /**
     * if mounting app inside legacy wh2o laravel app
     * hide the SPA navigation
     */
    this.hideNavigation = !!laravelDeploy

    if (appLocalStorage.getItem('wh2o-auth')) {
      this.$store.dispatch(userActions.FETCH_USER_DATA)
    }
  }
}
</script>
<style lang="scss">

.wh2o-vue {
  @import '@/app/assets/scss/app.scss';
}

</style>
