<template>
  <div class="wh2o-vue">
    <app-toaster />
    <app-navigation v-if="!hideNavigation" />
    <transition :name="transitionName">
      <router-view
        :class="[{'laravel-deploy': hideNavigation }, $route.name !== 'home' ? 'interior' : null, 'app-main-content']"
      />
    </transition>
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
    hideNavigation: false,
    transitionName: 'fade'
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
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  // transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  // transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  @include ease();
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
