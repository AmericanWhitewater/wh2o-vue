<template>
  <div :class="[{ home: homePage }, 'desktop-nav']">
    <div :class="[{ 'edit-mode': editMode }, 'top-bar-wrapper']">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 top-bar">
            <template v-if="!editMode">
              <!-- <router-link to="/users/login">Login</router-link> -->
              <router-link v-if="user" to="/user/account/1" class="ml-2xs">
                <icon-search />My Account
              </router-link>
              <router-link to="/river-search" class="ml-2xs">
                <icon-search />Search
              </router-link>
            </template>
            <template v-else>
              <aw-logo />
              <h4 class="productive-heading-02">
                Edit Mode
              </h4>
              <cv-button kind="tertiary" small @click="exitEditMode">
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
            <router-link v-show="!homePage" to="/">
              <aw-logo />
            </router-link>
            <nav>
              <router-link
                v-for="(item, index) in navItems"
                :key="index"
                :to="item.path"
              >
                <cv-button kind="ghost" small>
                  {{ item.title }}
                </cv-button>
              </router-link>
              <template v-if="!user">
                <router-link to="/user/access/login">
                  <cv-button kind="primary" small>
                    Login
                  </cv-button>
                </router-link>
              </template>
              <template v-else>
                <router-link to="/donate">
                  <cv-button kind="tertiary" small>
                    Donate
                  </cv-button>
                </router-link>
              </template>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import virtual_Search16 from "@carbon/icons-vue/es/search/16";
import { mapState } from "vuex";
import AwLogo from "@/app/global/components/logo-library/aw-logo";
import { globalAppActions } from "@/app/global/state";

export default {
  name: "DesktopNav",
  components: {
    "aw-logo": AwLogo,
    "icon-search": virtual_Search16
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
    homePage() {
      if (this.$route.name === "home") {
        return true;
      }
      return false;
    }
  },
  methods: {
    exitEditMode() {
      this.$store.dispatch(globalAppActions.TOGGLE_EDIT_MODE, false);
    }
  }
};
</script>
<style lang="scss">
.desktop-nav {
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
        justify-content: space-between;
        height: 75px;
        align-items: center;
      }
    }
    .top-bar {
      display: flex;
      justify-content: flex-end;
      height: 25px;
      align-items: center;
      a {
        color: #fff;
        text-decoration: none;
        font-size: 12px;
        font-weight: 600;
        line-height: 2.5rem;

        svg {
          margin-top: 1rem;
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
      justify-content: space-between;
      height: 50px;
      display: flex;
      align-items: center;
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
