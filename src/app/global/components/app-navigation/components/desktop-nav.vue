<template>
  <div class="desktop-nav">
    <div class="primary-nav-wrapper">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 nav-main-content-area">
            <div class="logo-wrapper">
              <div>
                <router-link
                  id="aw-logo"
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
                    id="network-tag"
                    kind="red"
                    label="Network Disconnected"
                  />
                </div>
              </transition>
            </div>
            <header>
              <cv-button
                v-for="(item, index) in links"
                :id="item.label"
                :key="index"
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push(item.path).catch(() => {})"
                @keydown.enter="$router.push(item.path).catch(() => {})"
              >
                {{ item.label }}
              </cv-button>
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
                  $router.push(`/user/account/${user && user.uid}/alerts`).catch(() => {})
                "
                @keydown.enter="
                  $router.push(`/user/account/${user && user.uid}/alerts`).catch(() => {})
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
import AwLogo from '@/app/global/components/logo-library/aw-logo'
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
  data: () => ({
    links: [
      {
        label:"About",
        path: '/legacy-viewer?url=https://www.americanwhitewater.org/content/Wiki/aw:about/?'
      },
      {
        label:"Safety",
        path: '/legacy-viewer?url=https://www.americanwhitewater.org/content/Safety/view/?'
      },
      {
        label:"News",
        path: '/news'
      },
      {
        label:"Trip Reports",
        path: '/trip-reports'
      },
      {
        label:"Map",
        path: '/river-index'
      },
    ] 
  }),
  computed: {
    user () {
      return this.$store.state.User.data
    }
  }
}
</script>
