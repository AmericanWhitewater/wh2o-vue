<template>
  <div :class="[{ home: homePage }, 'desktop-nav']">
    <div :class="[{ 'edit-mode': editMode }, 'top-bar-wrapper']">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 top-bar">
            <template v-if="!editMode">
              <!-- <router-link to="/users/login">Login</router-link> -->
              <router-link
                v-if="user"
                to="/user/account/1"
                class="ml-2xs"
              >
                <UserAvatar16 />
                My Account
              </router-link>
              <router-link
                to="/river-search"
                class="ml-2xs"
              >
                <icon-search />Search
              </router-link>
            </template>
            <template v-else>
              <aw-logo />
              <h4 class="productive-heading-02">
                Edit Mode
              </h4>
              <cv-button
                kind="tertiary"
                small
                @click="exitEditMode"
              >
                Exit
              </cv-button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="primary-nav-wrapper">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 nav-main-content-area">
            <router-link
              v-show="!homePage"
              to="/"
            >
              <aw-logo />
            </router-link>
            <cv-header-nav>
              <template v-for="(navItem, index) in navItems">
                <template v-if="!navItem.children">
                  <cv-header-menu-item
                    :key="navItem.label + '-' + index"
                    :style="`color:#292929`"
                    :to="navItem.path"
                  >
                    {{ navItem.label }}
                  </cv-header-menu-item>
                </template>
                <template v-else>
                  <cv-header-menu
                    :key="navItem.label + '-' + index"
                    :aria-label="navItem.label"
                    :title="navItem.label"
                  >
                    <template v-for="(child, i) in navItem.children">
                      <cv-header-menu-item
                        v-if="!child.legacy"
                        :key="child.label + '-' + i"
                        :to="child.path"
                      >
                        {{ child.label }}
                      </cv-header-menu-item>
                      <cv-header-menu-item
                        v-else
                        :key="child.label + '-' + i"
                        :href="child.path"
                      >
                        {{ child.label }}
                      </cv-header-menu-item>
                    </template>
                  </cv-header-menu>
                </template>
              </template>
              <template v-if="!user">
                <router-link
                  to="/user/access/login"
                  class="header--btn"
                >
                  <cv-button
                    kind="primary"
                    size="small"
                  >
                    Login
                  </cv-button>
                </router-link>
              </template>
              <template v-else>
                <a
                  to="/donate"
                  class="header--btn"
                >
                  <cv-button
                    kind="tertiary"
                    size="small"
                  >
                    Donate
                  </cv-button>
                </a>
              </template>
            </cv-header-nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import virtual_Search16 from '@carbon/icons-vue/es/search/16'
import { mapState } from 'vuex'
import AwLogo from '@/app/global/components/logo-library/aw-logo'
import { globalAppActions } from '@/app/global/state'

export default {
  name: 'DesktopNav',
  components: {
    'aw-logo': AwLogo,
    'icon-search': virtual_Search16
  },
  props: {
    navItems: {
      type: Array,
      default: () => null
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

  .bx--header__menu-title[role='menuitem'][aria-expanded='true'] {
    background-color:#fff !important;
  }

  .bx--header__menu-title[role='menuitem'][aria-expanded='true'] + .bx--header__menu {
    @include layer('temporary-nav')
  }

  a.bx--header__menu-item[role='menuitem']:hover > svg {
    fill:$ui-04;
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

  .top-bar-wrapper {
    background-color: $brand-03;

    &.edit-mode {
      @include layer("raised");
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
        align-items:center;
        color: #fff;
        display:inline-flex;
        font-size: 12px;
        font-weight: 600;
        text-decoration: none;
        svg {
          margin-right:0.25rem;
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
