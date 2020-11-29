<template>
  <div class="desktop-nav">
    <div class="primary-nav-wrapper">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 nav-main-content-area">
            <div class="logo-wrapper">
              <div>
                <router-link id="aw-logo" to="/">
                  <aw-logo />
                </router-link>
              </div>
            </div>
            <header>
              <template v-for="(item, index) in $options.navItems">
                <template v-if="item.children">
                  <div :key="index" class="ml-spacing-sm">
                    <cv-overflow-menu>
                      <template #trigger>
                        <div>
                          <cv-button kind="ghost">
                            {{ item.label }}
                          </cv-button>
                        </div>
                      </template>
                      <cv-overflow-menu-item
                        v-for="(child, i) in item.children"
                        :id="child.label"
                        :key="i"
                        kind="ghost"
                        size="small"
                        :value="child.label"
                        class="header--btn"
                        @click.exact="$router.push(child.path).catch(() => {})"
                        @keydown.enter="
                          $router.push(child.path).catch(() => {})
                        "
                      >
                        {{ child.label }}
                      </cv-overflow-menu-item>
                    </cv-overflow-menu>
                  </div>
                </template>
                <template v-else>
                  <cv-button
                    :id="item.label"
                    :key="index"
                    kind="ghost"
                    size="small"
                    class="ml-spacing-sm"
                    @click.exact="$router.push(item.path).catch(() => {})"
                    @keydown.enter="$router.push(item.path).catch(() => {})"
                  >
                    {{ item.label }}
                  </cv-button>
                </template>
              </template>

              <cv-button
                v-if="!user"
                id="login-btn"
                kind="primary"
                size="small"
                class="header--btn"
                @click.exact="
                  $router.push('/user/access/login').catch(() => {})
                "
                @keydown.enter="
                  $router.push('/user/access/login').catch(() => {})
                "
              >
                Login
              </cv-button>
              <cv-button
                v-if="user"
                id="account-btn"
                kind="tertiary"
                size="small"
                class="header--btn"
                @click.exact="
                  $router
                    .push(`/user/account/${user && user.uid}/alerts`)
                    .catch(() => {})
                "
                @keydown.enter="
                  $router
                    .push(`/user/account/${user && user.uid}/alerts`)
                    .catch(() => {})
                "
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
import AwLogo from "@/app/global/components/logo-library/aw-logo";
import navItems from "./nav-item";
export default {
  name: "desktop-nav",
  components: {
    "aw-logo": AwLogo,
  },
  navItems,
  props: {
    navItems: {
      type: Array,
      default: () => null,
    },
    offline: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    user() {
      return this.$store.state.User.data;
    },
  },
};
</script>