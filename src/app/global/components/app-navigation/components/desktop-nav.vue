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
              <a href="/content/Wiki/aw:about">
                <cv-button
                  id="our-organization-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Our Organization
                </cv-button>
              </a>

              <a href="https://membership.americanwhitewater.org/s/lightningmembership">
                <cv-button
                  id="support-aw-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Support AW
                </cv-button>
              </a>

              <cv-button
                id="river-info-btn"
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/river-index').catch(() => {})"
                @keydown.enter="$router.push('/river-index').catch(() => {})"
              >
                River Info
              </cv-button>

              <a href="/content/Journal/archive">
                <cv-button
                  id="library-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Library
                </cv-button>
              </a>

              <a href="/content/Events/view">
                <cv-button
                  id="community-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Community
                </cv-button>
              </a>

              <a href="/login">
                <cv-button
                  v-if="!user"
                  id="login-btn"
                  kind="primary"
                  size="small"
                  class="header--btn"
                >
                  Login
                </cv-button>
              </a>
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
