<template>
  <div class="user-account bg-topo">
    <div class="bx--grid">
      <div class="bx--row pt-lg">
        <div class="bx--col-xs-12 bx--col-sm-12 bx--col-lg-16 mb-spacing-md">
          <hr>
          <h1>My Account</h1>
        </div>
        <div class="bx--col-xs-12 bx--col-sm-12 bx--col-lg-16">
          <div class="bx--grid dashboard-wrapper">
            <div class="bx--row">
              <div
                class="bx--col-xs-12 bx--col-sm-4 bx--col-md-4 bx--col-lg-4 "
              >
                <ul class="bg-ui-01">
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
              </div>
              <div
                class="bx--col-xs-12 bx--col-sm-8 bx--col-md-8 bx--col-lg-12"
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

export default {
  name: 'UserAccount',
  filters: {
    capitalize (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  data: () => ({
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
  methods: {
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
  @include full-page-height;
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
