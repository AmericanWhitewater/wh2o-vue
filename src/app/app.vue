<template>
  <div>
    <app-toaster />
    <app-navigation />
    <transition :name="transitionName">
      <router-view
        :class="[$route.name !== 'home' ? 'interior' : null, 'app-main-content']"
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
  data: () => ({
    transitionName: 'fade'
  }),
  created () {
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
