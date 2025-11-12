<template>
  <div class="user-account bg-topo">
    <div class="bx--grid">
      <div class="bx--row pt-lg">
        <div class="bx--col-sm-12 bx--col-lg-16 mb-spacing-md">
          <hr >
          <h1>My Account</h1>
        </div>
        <div class="bx--col-sm-12 bx--col-lg-16">
          <div class="bx--grid dashboard-wrapper">
            <div class="bx--row">
              <div class="bx--col-sm-4 bx--col-md-2 bx--col-lg-3">
                <template v-if="windowWidth > $options.breakpoints.md">
                  <ul class="bg-ui-01 sticky">
                    <li
                      v-for="(item, index) in tabs"
                      :key="index"
                      class="mb-spacing-sm"
                    >
                      <cv-button
                        :kind="activeSection(item.label)"
                        :disabled="item.disabled"
                        @click="
                          $router.replace(
                            `/user/account/${user && user.uid}/${item.value}`
                          )
                        "
                      >
                        {{ item.label | capitalize }}
                      </cv-button>
                    </li>
                    <li class="mt-lg">
                      <a href="/logout">
                        <cv-button kind="tertiary" size="small">
                          Logout
                        </cv-button>
                      </a>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <cv-dropdown
                    v-model="selectedRoute"
                    class="mb-spacing-xl"
                    value="bookmarks"
                  >
                    <cv-dropdown-item
                      v-for="(menuItem, i) in tabs"
                      :key="i"
                      :value="menuItem.value"
                    >
                      {{ menuItem.label }}
                    </cv-dropdown-item>
                  </cv-dropdown>
                </template>
              </div>
              <div
                class="
                  bx--col-sm-12
                  bx--offset-md-1
                  bx--col-md-5
                  bx--col-lg-11
                  bx--offset-lg-1
                "
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
import { mapState } from "vuex";
import { checkWindow } from "@/app/global/mixins";

/**
 * User Dashboard / My Account
 *
 * Bookmarks, settings, etc...
 *
 */
export default {
  name: "user-account",
  filters: {
    /**
     * capitalizes first letter in string
     * @todo make this globally available
     *
     */
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  mixins: [checkWindow],
  data: () => ({
    selectedRoute: "bookmarks",
    tabs: [
      {
        label: "Gages",
        value: "gages",
      },
      {
        label: "Profile",
        value: "profile",
      },
    ],
  }),
  computed: {
    ...mapState({
      user: (state) => state.User.data,
      loading: (state) => state.User.loading,
      error: (state) => state.User.error,
    }),
  },
  watch: {
    /**
     * for mobile, when the dropdown changes, replace the route
     */
    selectedRoute(val) {
      this.$router.replace(
        `/user/account/${this.user && this.user.uid}/${val}`
      );
    },
  },
  methods: {
    /**
     * toggles button / sidebar nav styling
     */
    activeSection(view) {
      if (this.$route.name === view) {
        return "secondary";
      }
      return "ghost";
    },
  },
  created() {
    this.$store.dispatch("User/getProperty");
  },
};
</script>
