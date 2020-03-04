<template>
  <div class="user-account bg-topo">
    <div class="bx--grid">
      <div class="bx--row pt-lg">
        <div class="bx--col-sm-12 bx--col-lg-16 mb-spacing-md">
          <hr>
          <h1>My Account</h1>
        </div>
        <div class="bx--col-sm-12 bx--col-lg-16">
          <div class="bx--grid dashboard-wrapper">
            <div class="bx--row">
              <div
                class="bx--col-sm-4 bx--col-md-2 bx--col-lg-2"
              >
                <template v-if="windowWidth > breakpoints.md">
                  <ul class="bg-ui-01 sticky">
                    <li
                      v-for="(item, index) in tabs"
                      :key="index"
                      class="mb-spacing-sm"
                    >
                      <cv-button
                        :kind="activeSection(item.label)"
                        @click="
                          $router.replace(`/user/account/1/${item.label}`)
                        "
                      >
                        {{ item.label | capitalize }}
                      </cv-button>
                    </li>
                    <li class="mt-lg">
                      <cv-button
                        kind="tertiary"
                        size="small"
                        @click="$router.push('/user/access/logout')"
                      >
                        Logout
                      </cv-button>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <cv-dropdown
                    v-model="selectedRoute"
                    class="mb-spacing-xl"
                    value="bookmarks"
                  >
                    <cv-dropdown-item value="bookmarks">
                      Bookmarks
                    </cv-dropdown-item>
                    <cv-dropdown-item value="gages">
                      Gages
                    </cv-dropdown-item>
                    <cv-dropdown-item value="alerts">
                      Alerts
                    </cv-dropdown-item>
                    <cv-dropdown-item value="profile">
                      Profile
                    </cv-dropdown-item>
                    <cv-dropdown-item value="settings">
                      Settings
                    </cv-dropdown-item>
                  </cv-dropdown>
                </template>
              </div>
              <div
                class="bx--col-sm-12 bx--offset-md-1 bx--col-md-5 bx--col-lg-11 bx--offset-lg-1"
              >
                <router-view />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { CheckWindow } from '@/app/global/mixins'

/**
 * User Dashboard / My Account
 *
 * Bookmarks, settings, etc...
 *
 */
export default {
  name: 'UserAccount',
  filters: {
    /**
     * capitalizes first letter in string
     * @todo make this globally available
     *
     */
    capitalize (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  mixins: [CheckWindow],
  data: () => ({
    /**
     * active / selected route
     */
    selectedRoute: 'bookmarks',
    /**
     * user account subroutes
     */
    tabs: [
      {
        label: 'alerts'
      },
      {
        label: 'bookmarks'
      },
      {
        label: 'gages'
      },
      {
        label: 'profile'
      },
      {
        label: 'settings'
      }
    ]
  }),
  computed: {
    ...mapState({
      alerts: state => state.userState.userData.data.alerts,
      loading: state => state.userState.userData.loading,
      error: state => state.userState.userData.error
    })
  },
  watch: {
    /**
     * for mobile, when the dropdown changes, replace the route
     */
    selectedRoute (val) {
      this.$router.replace(`/user/account/1/${val}`)
    }
  },
  methods: {
    /**
     * toggles button / sidebar nav styling
     */
    activeSection (view) {
      if (this.$route.name === view) {
        return 'secondary'
      }
      return 'ghost'
    }
  }
}
</script>

<style lang="scss">
.user-account {
  .bx--grid {
    &.dashboard-wrapper {
      margin: 0;
      padding: 0;
      min-height: 50vh;
    }
  }
  .bg-ui-01 {
    background-color:$ui-01;
    @include layer('raised')
  }
}

</style>
