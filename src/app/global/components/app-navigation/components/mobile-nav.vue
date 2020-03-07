<template>
  <header>
    <div class="bx--grid mobile-nav">
      <div class="bx--row">
        <div
          :class="[
            { home: homePage },
            { 'drawer-open': drawerOpen },
            'bx--col content-area'
          ]"
        >
          <template v-show="windowWidth <= breakpoints.lg">
            <span @click.exact="resetRouter">
              <aw-logo />
            </span>
          </template>
          <span
            :class="[{ 'drawer-open': drawerOpen }, 'nav-trigger']"
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
    <transition name="slide">
      <div
        v-if="drawerOpen"
        class="drawer pt-md"
      >
        <!-- <template v-for="(item, i) in navItems">
          <template v-if="!item.children">
            <cv-button
              :key="item.label"
              kind="ghost"
              @click.exact="viewRoute(item.path)"
              v-text="item.label"
              class="mb-spacing-md"
            />
          </template>
          <template v-else>
            <div
              :key="i"
              class="mb-spacing-md"
            >
              <h6 class="pl-spacing-sm">{{ item.label }}</h6>
              <cv-button
                v-for="subitem in item.children"
                :key="subitem.label"
                kind="ghost"
                @click.exact="viewRoute(subitem.path)"
                v-text="subitem.label"
              />
            </div>
          </template>
        </template> -->
        <div class="main-nav-items">
          <cv-button
            kind="ghost"
            @click.exact="viewRoute('/river-search')"
            v-text="'Search'"
          />
          <cv-button
            kind="ghost"
            @click.exact="viewRoute('/river-index')"
            v-text="'River Index'"
          />
          <cv-button
            kind="ghost"
            @click.exact="viewRoute('/safety')"
            v-text="'Safety'"
          />
        </div>
        <div>
          <template v-if="!user">
            <cv-button

              kind="primary"
              @click.exact="viewRoute('/user/access/login')"
              v-text="'Login'"
            />
          </template>
          <template v-else>
            <cv-button
              class="mb-spacing-md"
              kind="primary"
              @click.exact="viewRoute('/user/account/1/bookmarks')"
              v-text="'My Account'"
            />
            <cv-button

              kind="tertiary"
              @click.exact="viewRoute('/user/access/logout')"
              v-text="'Logout'"
            />
          </template>
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
import AwLogo from '@/app/global/components/logo-library/aw-logo'
import { checkWindow } from '@/app/global/mixins'

export default {
  name: 'MobileNav',
  components: {
    'aw-logo': AwLogo
  },
  mixins: [checkWindow],
  props: {
    navItems: {
      type: Array,
      default: () => null
    }
  },
  data: () => ({
    drawerOpen: false,
    searchTerm: '',
    topBarItems: [
      {
        path: '/user/access/login',
        title: 'Login'
      },
      {
        path: '/river-search',
        title: 'River Search'
      }
    ]
  }),
  computed: {
    user () {
      return this.$store.state.userState.userData.data
    },
    homePage () {
      if (this.$route.name === 'Home') {
        return true
      }
      return false
    }
  },
  methods: {
    viewRoute (path) {
      this.drawerOpen = false
      this.$router.push(path)
    },
    resetRouter () {
      this.drawerOpen = false
      /* keep catch empty to avoid nav duplication error */
      this.$router.push('/').catch(() => {})
    }
  }
}
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
    background-color: $ui-02;
    display: flex;
    flex-flow: column nowrap;
    @include full-page-height;
    position: fixed;
    right: 0;
    top: $mobile-nav-height;
    width: 300px;
    z-index: 3;
    justify-content: space-between;
    a {
      color: $text-01;
      display: block;
      margin-left: $spacing-md;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
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
