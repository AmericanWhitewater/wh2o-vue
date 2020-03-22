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
        <div class="main-nav-items">
          <cv-search
            v-model="searchTerm"
            theme="light"
            class="mb-spacing-md"
            placeholder="River Search"
            @keypress.enter="searchRiver"
          />
          <transition
            name="fade"
            mode="out-in"
          >
            <cv-button
              v-if="searchTerm.length > 0"
              class="mb-spacing-md"
              size="small"
              kind="secondary"
              @click.exact="searchRiver"
            >
              Submit
            </cv-button>
          </transition>
          <cv-button
            kind="ghost"
            class="mb-spacing-xs"
            @click.exact="viewRoute('/river-index')"
            v-text="'River Index'"
          />
          <cv-button
            class="mb-spacing-xs"
            kind="ghost"
            @click.exact="viewRoute('/news')"
            v-text="'News'"
          />
          <cv-button
            class="mb-spacing-xs"
            kind="ghost"
            @click.exact="viewRoute('/river-search')"
            v-text="'Search'"
          />
        </div>
        <div class="main-nav-items mb-md">
          <cv-button
            v-if="user"
            kind="primary"
            class="mb-spacing-lg"
            @click.exact="viewRoute('/user/account/1/bookmarks')"
            v-text="'My Account'"
          />
          <cv-button
            v-if="!user"
            kind="primary"
            @click.exact="viewRoute('/user/access/login')"
            v-text="'Login'"
          />
          <cv-button
            v-else
            kind="tertiary"
            @click.exact="viewRoute('/user/access/logout')"
            v-text="'Logout'"
          />
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
import { riverSearchActions } from '@/app/views/river-search/shared/state'
export default {
  name: 'mobile-nav',
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
    },
    /**
     * this func is is getting replicated a lot.
     */
    searchRiver () {
      this.drawerOpen = false
      this.$store.dispatch(riverSearchActions.FETCH_RIVER_SEARCH_DATA, {
        river: this.searchTerm
      })
      /**
       * @todo figure out how to dynamically set scroll position
       * transition to search page is jarring, search results obscured
       */
      this.searchTerm = ''
      this.$router.push('/river-search').catch(() => {})
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
