<template>
  <header>
    <div class="bx--grid mobile-nav">
      <div class="bx--row">
        <div :class="[{ 'drawer-open': drawerOpen }, 'bx--col content-area']">
          <span id="logo-wrapper" @click.exact="resetRouter">
            <aw-logo />
          </span>
          <div>
            <cv-tooltip
              v-if="offline"
              id="offline-indicator"
              tip="Network Disconnected"
              direction="bottom"
            >
              <WifiOff24 />
            </cv-tooltip>

            <span
              :class="[
                { 'drawer-open': drawerOpen },
                'nav-trigger ml-spacing-md',
              ]"
              @click.exact="drawerOpen = !drawerOpen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="#5a6872">
                  <path
                    data-color="color-2"
                    d="M23,13H1c-0.552,0-1-0.447-1-1s0.448-1,1-1h22c0.552,0,1,0.447,1,1S23.552,13,23,13z"
                  />
                  <path
                    fill="#5a6872"
                    d="M23,6H1C0.448,6,0,5.553,0,5s0.448-1,1-1h22c0.552,0,1,0.447,1,1S23.552,6,23,6z"
                  />
                  <path
                    fill="#5a6872"
                    d="M23,20H12c-0.552,0-1-0.447-1-1s0.448-1,1-1h11c0.552,0,1,0.447,1,1S23.552,20,23,20z"
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div v-if="drawerOpen" class="drawer pt-md">
        <div class="main-nav-items">
          <a href="/content/River/view/river-index">
            <cv-button kind="ghost" size="small" class="mb-spacing-xs">
              Rivers
            </cv-button>
          </a>
          <a href="/explore/">
            <cv-button kind="ghost" size="small" class="mb-spacing-xs">
              Explore
            </cv-button>
          </a>
          <a href="/engage/">
            <cv-button kind="ghost" size="small" class="mb-spacing-xs">
              Engage
            </cv-button>
          </a>
          <a href="/support/">
            <cv-button kind="ghost" size="small" class="mb-spacing-xs">
              Support
            </cv-button>
          </a>
        </div>
        <div class="main-nav-items mb-md">
          <a href="/user/profile">
            <cv-button
              v-if="user"
              kind="primary"
              class="mb-spacing-lg"
              v-text="'My Account'"
            />
          </a>
          <a v-if="!user" href="/login">
            <cv-button id="login-button" kind="primary" v-text="'Login'" />
          </a>
          <a v-if="user" href="/logout">
            <cv-button id="logout-button" kind="tertiary" v-text="'Logout'" />
          </a>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="drawerOpen"
        class="overlay"
        @click.exact="drawerOpen = false"
      />
    </transition>
  </header>
</template>
<script>
import AwLogo from "@/app/global/components/logo-library/aw-logo";
export default {
  name: "mobile-nav",
  components: {
    "aw-logo": AwLogo,
  },
  props: {
    offline: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    drawerOpen: false,
    searchTerm: "",
  }),
  computed: {
    user() {
      return this.$store.state.User.data;
    },
  },
  methods: {
    viewRoute(path) {
      this.drawerOpen = false;
      this.$router.push(path).catch(() => {});
    },
    resetRouter() {
      this.drawerOpen = false;
      /* keep catch empty to avoid nav duplication error */
      this.$router.push("/").catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.mobile-nav {
  .content-area {
    @include ease(0.6s);
    align-items: center;
    display: flex;
    height: $mobile-nav-height;
    justify-content: space-between;
  }
}

header {
  @include layer("sticky-nav");
  background-color: $ui-01;
  .drawer {
    @include full-page-height;
    background-color: $ui-02;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    padding-left: $spacing-xl;
    padding-right: $spacing-xl;
    padding-bottom: $spacing-xl;
    position: fixed;
    right: 0;
    top: $mobile-nav-height;
    width: 300px;
    z-index: 3;
  }
  .main-nav-items {
    display: flex;
    flex-flow: column nowrap;
  }
}

.overlay {
  background-color: rgba($ui-05, 0.5);
  cursor: pointer;
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;
  z-index: 2;
}
svg {
  cursor: pointer;
}

.bx--form-item {
  display: block;
}
.slide-enter-active,
.slide-leave-active {
  @include ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(300px);
}

.fade-enter-active,
.fade-leave-active {
  @include ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.nav-trigger {
  &.drawer-open {
    svg {
      path {
        fill: $brand-01;
      }
    }
  }
}
</style>
