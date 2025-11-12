<template>
  <div class="wh2o-vue rebuild">
    <app-toaster />
    <app-navigation v-if="!laravelDeploy" />
    <transition :name="transitionName">
      <router-view
        :class="[{ 'laravel-deploy': laravelDeploy }, 'app-main-content']"
      />
    </transition>
    <app-cookie-banner />
  </div>
</template>

<script>
import {
  AppToaster,
  AppNavigation,
  AppCookieBanner,
} from "./global/components";
import { mapState } from 'vuex';

export default {
  name: "app",
  components: {
    AppNavigation,
    AppToaster,
    AppCookieBanner,
  },
  data: () => ({
    transitionName: "fade",
  }),
  computed: {
    laravelDeploy() {
      return this.$store.state.Global.laravelDeploy;
    },
    ...mapState({
      user: state => state.User.data,
      loggedIn: state => state.User.loggedIn
    })
  },
  watch: {
    loggedIn(newVal) {
      // if loggedIn updates to true, but gql-derived user remains false, reload the page
      if (newVal && !this.user) {
        window.location.reload();
      }
    }
  },
  metaInfo: {
    title: "National Whitewater Inventory | American Whitewater",
  },
  created() {
    this.$store.dispatch("User/getProperty");
  },
};
</script>

 <style lang="scss">
@import "/assets/scss/app";
@import "~maplibre-gl/dist/maplibre-gl.css";

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
