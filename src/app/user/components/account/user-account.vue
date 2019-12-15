<template>
  <div class="user-account bg-topo">
    <div class="bx--grid">
      <div class="bx--row pt-lg">
        <div class="bx--col-xs-12 bx--col-sm-12 bx--col-lg-16 mb-spacing-md">
          <h1>My Account</h1>
        </div>
        <div class="bx--col-xs-12 bx--col-sm-12 bx--col-lg-16">
          <cv-tile>
            <div class="bx--grid dashboard-wrapper">
              <div class="bx--row">
                <div
                  class="bx--col-xs-12 bx--col-sm-4 bx--col-md-4 bx--col-lg-4"
                >
                  <ul>
                    <li v-for="(item, index) in tabs" :key="index">
                      <cv-button
                        :kind="activeSection(item.label)"
                        small
                        @click="
                          $router.replace(`/user/account/1/${item.label}`)
                        "
                      >
                        {{ item.label | capitalize }}
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
          </cv-tile>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "UserAccount",
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  data: () => ({
    tabs: [
      {
        label: "alerts"
      },
      {
        label: "gages"
      },
      {
        label: "profile"
      },
      {
        label: "settings"
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
  created() {
    // this is temp, we want to check if there any alerts for the user, if no, push to gages.
    if (!this.alerts) {
      this.$router.replace("/user/account/1/gages");
    }
  },
  methods: {
    activeSection(view) {
      if (this.$route.name === view) {
        return "secondary";
      } else {
        return "ghost";
      }
    }
  }
};
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
}
</style>
