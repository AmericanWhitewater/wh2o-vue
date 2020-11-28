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
              <!-- <cv-button
                id="affiliates-btn"
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/affiliates').catch(() => {})"
                @keydown.enter="$router.push('/affiliates').catch(() => {})"
              >
                Affiliates
              </cv-button> -->

              <!-- <cv-button
                id="gages-btn"
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/gages').catch(() => {})"
                @keydown.enter="$router.push('/gages').catch(() => {})"
              >
                Gages
              </cv-button> -->

              <cv-button
                id="map-btn"
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/accident-database').catch(() => {})"
                @keydown.enter="$router.push('/accident-database').catch(() => {})"
              >
                Accidents
              </cv-button>

              <!-- <cv-button
                id="projects-btn"
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/projects').catch(() => {})"
                @keydown.enter="$router.push('/projects').catch(() => {})"
              >
                Projects
              </cv-button> -->

              <cv-button
                id="trip-reports-btn"
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/trip-reports').catch(() => {})"
                @keydown.enter="$router.push('/trip-reports').catch(() => {})"
              >
                Trip Reports
              </cv-button>

              <!-- <cv-button
                id="documents-btn"
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/documents').catch(() => {})"
                @keydown.enter="$router.push('/documents').catch(() => {})"
              >
                Documents
              </cv-button> -->

              <cv-button
                id="map-btn"
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/river-index').catch(() => {})"
                @keydown.enter="$router.push('/river-index').catch(() => {})"
              >
                Map
              </cv-button>

              <cv-button
                id="news-btn"
                kind="ghost"
                size="small"
                class="header--btn"
                @click.exact="$router.push('/news').catch(() => {})"
                @keydown.enter="$router.push('/news').catch(() => {})"
              >
                News
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
