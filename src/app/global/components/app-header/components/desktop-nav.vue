<template>
  <div :class="[{ home: homePage }, 'desktop-nav']">
    <div :class="[{ editMode: riverDetailEditMode }, 'top-bar-wrapper']">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 top-bar">
            <template v-if="!riverDetailEditMode">
              <!-- <router-link to="/users/login">Login</router-link> -->
              <router-link to="/river-search" class="ml-2xs"
                >Search</router-link
              >
            </template>
            <template v-else>
              <aw-logo />
              <h4 class="productive-heading-02">Edit Mode</h4>
              <cv-button kind="tertiary" small @click="toggleEditMode"
                >Exit</cv-button
              >
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
                <cv-button kind="ghost" small>{{ item.title }}</cv-button>
              </router-link>
              <router-link to="/users/login">
                <cv-button kind="primary" small>Login</cv-button>
              </router-link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AwLogo from "./aw-logo";
import { actionsTypes } from "../../../../river-detail/shared/state";
export default {
  name: "DesktopNav",
  components: {
    "aw-logo": AwLogo
  },
  props: {
    navItems: {
      type: Array,
      default: () => {
        return null;
      }
    }
  },
  data: () => {
    return {
      editMode: false
    };
  },
  computed: {
    riverDetailEditMode() {
      return this.$store.state.riverDetailState.riverDetailData.mode;
    },
    homePage() {
      if (this.$route.name === "Home") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    toggleEditMode() {
      // this.editMode = !this.editMode;
      this.$store.dispatch(
        actionsTypes.SET_EDIT_MODE,
        !this.riverDetailEditMode
      );
    }
  }
};
</script>
<style lang="scss">
.desktop-nav {
  .top-bar-wrapper {
    background-color: $brand-03;

    &.editMode {
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
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .primary-nav-wrapper {
    .nav-main-content-area {
      justify-content: space-between;
      height: $desktop-nav-height - 25px;
      display: flex;
      align-items: center;
      .bx--btn--ghost {
        color: $text-01;
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
