<template>
  <div class="wh2o-vue rebuild">
    <app-toaster />
    <app-navigation v-if="!laravelDeploy" />
    <transition :name="transitionName">
      <router-view
        :class="[{'laravel-deploy': laravelDeploy }, $route.name !== 'home' ? 'interior' : null, 'app-main-content']"
      />
    </transition>
    <app-cookie-banner />
    <app-footer v-if="!laravelDeploy" />
  </div>
</template>

<script>
import {
  AppToaster,
  AppNavigation,
  AppFooter,
  AppCookieBanner
} from './global/components'

export default {
  name: 'app',
  components: {
    AppNavigation,
    AppToaster,
    AppFooter,
    AppCookieBanner
  },
  data: () => ({
    transitionName: 'fade'
  }),
  computed: {
    laravelDeploy() {
      return this.$store.state.Global.laravelDeploy
    }
  },
  metaInfo: {
    title: 'American Whitewater'
  },
  created () {
    this.$store.dispatch('User/getProperty')
  }
}
</script>

 <style lang="scss">
@import "/assets/scss/app.scss";
@import '~mapbox-gl/dist/mapbox-gl.css';

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
