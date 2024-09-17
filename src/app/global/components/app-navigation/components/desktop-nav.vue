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
                id="map-btn"
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/river-index').catch(() => {})"
                @keydown.enter="$router.push('/river-index').catch(() => {})"
              >
                Rivers
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
  computed: {
    user () {
      return this.$store.state.User.data
    }
  }
}
</script>
