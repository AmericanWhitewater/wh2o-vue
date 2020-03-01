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
          <!-- <transition name="fade"> -->
          <template v-show="windowWidth <= breakpoints.lg">
            <span @click="resetRouter">
              <aw-logo />
            </span>
          </template>
          <!-- </transition> -->
          <span
            :class="[{ 'drawer-open': drawerOpen }, 'nav-trigger']"
            @click="drawerOpen = !drawerOpen"
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
        <!-- <cv-search small v-model="searchTerm" label="Search label"> </cv-search> -->
        <cv-button
          v-for="item in topBarItems"
          :key="item.title"
          kind="ghost"
          @click.prevent="viewRoute(item.path)"
        >
          <!-- <router-link :to="item.path">{{ item.title }}</router-link> -->
          <a href="#0">{{ item.title }}</a>
        </cv-button>
        <cv-button
          v-for="item in navItems"
          :key="item.label"
          kind="ghost"
          @click.prevent="viewRoute(item.path)"
        >
          <!-- <router-link :to="item.path">{{ item.title }}</router-link> -->
          <a href="#0">{{ item.label }}</a>
        </cv-button>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="drawerOpen"
        class="overlay"
        @click="drawerOpen = false"
      />
    </transition>
  </header>
</template>
<script>
import AwLogo from '@/app/global/components/logo-library/aw-logo'
import { CheckWindow } from '../../../mixins'

export default {
  name: 'MobileNav',
  components: {
    'aw-logo': AwLogo
  },
  mixins: [CheckWindow],
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
      if (this.drawerOpen) {
        this.drawerOpen = false
      }
      this.$router.push('/')
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
    background-color: $ui-03;
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    min-height: calc(100vh - 50px);
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
