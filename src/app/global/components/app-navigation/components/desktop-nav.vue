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

              <a href="/">
                <cv-button
                  id="explore-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Explore
                </cv-button>
              </a>

              <a href="/">
                <cv-button
                  id="engage-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Engage
                </cv-button>
              </a>

              <a href="https://membership.americanwhitewater.org/s/lightningmembership">
                <cv-button
                  id="support-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Support
                </cv-button>
              </a>

              <a href="https://connect.clickandpledge.com/w/Form/c178a504-b0d6-486e-8d74-db507a71fad1">
                <cv-button
                  id="donate-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Donate
                </cv-button>
              </a>

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
              <a href="/user/profile">
                <cv-button
                  v-if="user"
                  id="account-btn"
                  kind="tertiary"
                  size="small"
                  class="header--btn"
                >
                  My Account
                </cv-button>
              </a>
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
