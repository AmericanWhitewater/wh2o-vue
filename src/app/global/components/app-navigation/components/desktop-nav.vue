<template>
  <div :class="[{ home: homePage }, 'desktop-nav']">
    <div class="primary-nav-wrapper">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 nav-main-content-area">
            <div class="logo-wrapper">
              <div>
                <router-link
                  v-show="!homePage"
                  to="/"
                >
                  <aw-logo />
                </router-link>
              </div>

              <transition
                name="fade"
                mode="out-in"
              >
                <div
                  v-if="offline"
                  class="ml-spacing-md"
                >
                  <cv-tag
                    kind="red"
                    label="Network Disconnected"
                  />
                </div>
              </transition>
            </div>
            <header>
              <cv-button
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/river-index').catch(()=>{})"
              >
                Map
              </cv-button>

              <cv-button
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/news').catch(()=>{})"
              >
                News
              </cv-button>
              <cv-button
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/river-search').catch(()=>{})"
              >
                Search
              </cv-button>
              <cv-button
                v-if="!user"
                kind="primary"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/user/access/login').catch(()=>{})"
              >
                Login
              </cv-button>
              <cv-button
                v-if="user"
                kind="tertiary"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/user/account/1/bookmarks').catch(()=>{})"
              >
                My Account
              </cv-button>
            </header>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import AwLogo from '@/app/global/components/logo-library/aw-logo'
import { globalAppActions } from '@/app/global/state'

export default {
  name: 'desktop-nav',
  components: {
    'aw-logo': AwLogo
  },
  props: {
    navItems: {
      type: Array,
      default: () => null
    },
    offline: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState({
      editMode: state => state.appGlobalState.appGlobalData.editMode,
      user: state => state.userState.userData.data
    }),
    homePage () {
      if (this.$route.name === 'home') {
        return true
      }
      return false
    }
  },
  methods: {
    exitEditMode () {
      this.$store.dispatch(globalAppActions.TOGGLE_EDIT_MODE, false)
    }
  }
}
</script>
<style lang="scss">
.desktop-nav {
  .bx--header__menu-title[role="menuitem"][aria-expanded="true"] {
    background-color: #fff !important;
  }

 .logo-wrapper {
   display: flex;
   align-items: center;
 }

  a.bx--header__menu-item[role="menuitem"]:hover > svg {
    fill: $ui-04;
  }

  .bx--header__nav::before {
    background-color: #fff;
  }

  .bx--header__menu {
    background-color: $ui-01 !important;
    &:hover {
      background-color: $ui-01 !important;
    }
  }
  a.bx--header__menu-item {
    color: $text-01 !important;
    &:hover {
      background-color: $ui-02 !important;
    }
  }

  header,
  .cv-header-nav,
  .bx--header {
    display: flex;
    border-bottom: none;
    position: relative;
    justify-content: space-between;
    flex-flow: row nowrap;
    align-items: center;
    background-color: #fff !important;

    .header--btn {
      max-height: 2rem;
      align-self: center;
    }
  }

  &.home {
    header,
    .cv-header-nav,
    .bx--header {
      // @include layer("sticky-nav");
      padding:$spacing-sm;
    }
  }

  .top-bar-wrapper {
    background-color: $brand-03;

    &.edit-mode {
      // @include layer("raised");
      background-color: $support-03;
      height: 75px;
      position: fixed;
      width: 100vw;
      z-index: 999;

      .top-bar {
        align-items: center;
        height: 75px;
        justify-content: space-between;
      }
    }
    .top-bar {
      align-items: center;
      display: flex;
      height: 25px;
      justify-content: flex-end;
      a {
        align-items: center;
        color: #fff;
        display: inline-flex;
        font-size: 12px;
        font-weight: 600;
        text-decoration: none;
        svg {
          margin-right: 0.25rem;
          g,
          path {
            fill: #fff;
          }
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .primary-nav-wrapper {
    .nav-main-content-area {
      align-items: center;
      display: flex;
      height: 50px;
      justify-content: space-between;
      .bx--btn--ghost {
        color: $text-01;
      }

      .bx--btn {
        margin-left: $spacing-xs;
      }
    }
  }

  &.home {
    @include ease;
    .top-bar-wrapper {
      background-color: transparent;
      .top-bar {
        a {
          color: $text-01;
          text-decoration: none;
          font-size: 14px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .nav-main-content-area {
      justify-content: flex-end;
    }
  }
}
</style>
