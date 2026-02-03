<template>
  <div class="desktop-nav">
    <div class="primary-nav-wrapper">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 nav-main-content-area">
            <div class="logo-wrapper">
              <div>
                <a id="aw-logo"
                  href="/"

                >
                  <aw-logo />
                </a>
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
              <a href="/content/River/view/river-index">
                <cv-button
                  id="rivers-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Rivers
                </cv-button>
              </a>

              <a href="/explore/">
                <cv-button
                  id="explore-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Explore
                </cv-button>
              </a>

              <a href="/engage/">
                <cv-button
                  id="engage-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Engage
                </cv-button>
              </a>

              <a href="/support/">
                <cv-button
                  id="support-btn"
                  kind="ghost"
                  size="small"
                  class="header--btn"
                >
                  Support
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
