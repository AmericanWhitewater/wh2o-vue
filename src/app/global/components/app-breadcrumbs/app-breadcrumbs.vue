<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col-sm-12 bx--col-lg-16">
        <div :class="[{ 'home' : $route.name === 'home' },'app-breadcrumbs']">
          <cv-breadcrumb
            aria-label="breadcrumb"
            no-trailing-slash
          >
            <cv-breadcrumb-item>
              <cv-link
                to="/"
                aria-current="page"
              >
                Home
              </cv-link>
            </cv-breadcrumb-item>
            <template v-if="crumbs.length <= 2">
              <cv-breadcrumb-item
                v-for="(crumb, index) in crumbs"
                :key="index"
              >
                <template v-if="index+1 !== crumbs.length">
                  <cv-link
                    :to="crumb.path"
                    aria-current="page"
                  >
                    {{ getLabel(crumb.label) }}
                  </cv-link>
                </template>
                <template v-else>
                  <cv-link
                    href="#"
                    aria-current="page"
                  >
                    {{ getLabel(crumb.label) }}
                  </cv-link>
                </template>
              </cv-breadcrumb-item>
            </template>
            <template v-else>
              <cv-breadcrumb-item>
                <cv-dropdown
                  placeholder="..."
                  value="  "
                >
                  <cv-dropdown-item
                    v-for="(crumb, index) in crumbs.slice(0, crumbs.length-2).reverse()"
                    :key="index"
                    :value="index.toString()"
                  >
                    <cv-link
                      :to="crumb.path"
                      aria-current="page"
                    >
                      {{ getLabel(crumb.label) }}
                    </cv-link>
                  </cv-dropdown-item>
                </cv-dropdown>
              </cv-breadcrumb-item>
              <cv-breadcrumb-item>
                <cv-link
                  :to="crumbs[crumbs.length-2].path"
                  aria-current="page"
                >
                  {{ getLabel(crumbs[crumbs.length-2].label) }}
                </cv-link>
              </cv-breadcrumb-item>
              <cv-breadcrumb-item>
                <cv-link
                  href="#"
                  aria-current="page"
                >
                  {{ getLabel(crumbs[crumbs.length-1].label) }}
                </cv-link>
              </cv-breadcrumb-item>
            </template>
          </cv-breadcrumb>
          <slot name="tags">
            <!-- use for river detail tags/chips -->
            <!-- <cv-tag kind="blue" label="Banner needs editing" :disabled="false"></cv-tag> -->
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description Breadcrumbs which show the session history.
 * @reference https://www.carbondesignsystem.com/components/breadcrumb/usage
 *
 */

export default {
  name: "AppBreadcrumbs",
  data: () => {
    return {
      prevRoute: {
        path: null,
        label: null
      },
      crumbs: []
    };
  },
  computed: {
    currentPage() {
      return this.$route;
    }
  },
  watch: {
    currentPage() {
      this.setCrumbs();
    }
  },
  methods: {
    setCrumbs() {
      if (
        this.currentPage &&
        this.prevRoute.label !== this.currentPage.meta.crumbLabel &&
        this.$route.path !== "/"
      ) {
        this.prevRoute.label = this.currentPage.meta.crumbLabel;
        this.prevRoute.path = this.currentPage.path;
        // strip out data. stays reactive otherwise.
        let data = Object.assign({}, this.prevRoute);
        this.crumbs.push(data);
      }
    },
    getLabel(label) {
      // crumb.label

      if (label === "River Detail") {
        let currentRiver =
          this.$store.state.riverDetailState.riverDetailData.data.river +
          " - " +
          this.$store.state.riverDetailState.riverDetailData.data.section;
        return currentRiver.slice(0, 20) + "...";
      } else {
        return label;
      }
    }
  },
  created() {
    this.setCrumbs();
  }
};
</script>

<style lang="scss">
.app-breadcrumbs {
  top: $mobile-nav-height;
  z-index: 2;
  position: absolute;
  display: flex;
  padding: $spacing-sm 0;
  justify-content: space-between;
  @include MQ("LG") {
    top: $desktop-nav-height;
  }
  &.home {
    visibility: hidden;
  }
  .bx--dropdown,
  .bx--dropdown-text {
    height: auto;
    width: auto;
    background-color: transparent;
    border: 0;
    padding: 0;
  }
  .bx--dropdown-list {
    // make pretty wide for longer river names
    min-width: 100px;
  }

  .bx--dropdown__arrow-container {
    display: none;
  }
}
</style>