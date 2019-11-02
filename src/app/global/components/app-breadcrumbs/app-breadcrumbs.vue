<template>
  <div :class="[ { 'home' : $route.name === 'home' } ,'bx--grid']">
    <div class="bx--row">
      <div class="bx--col-sm-12 bx--col-lg-16">
        <div class="app-breadcrumbs">
          <cv-breadcrumb
            aria-label="breadcrumb"
            no-trailing-slash
          >
            <template v-if="crumbs.length <= 3">
              <cv-breadcrumb-item
                v-for="(crumb, index) in crumbs"
                :key="index"
              >
                <template v-if="index+1 !== crumbs.length">
                  <cv-link
                    :to="crumb.path"
                    aria-current="page"
                  >
                    {{ crumb.label }}
                  </cv-link>
                </template>
                <template v-else>
                  <cv-link
                    href="#"
                    aria-current="page"
                  >
                    {{ crumb.label }}
                  </cv-link>
                </template>
              </cv-breadcrumb-item>
            </template>
            <template v-else>
              <cv-breadcrumb-item>
                <cv-link
                  :to="crumbs[0].path"
                  aria-current="page"
                >
                  {{ crumbs[0].label }}
                </cv-link>
              </cv-breadcrumb-item>
              <cv-breadcrumb-item>
                <cv-dropdown
                  placeholder="..."
                  value="  "
                >
                  <cv-dropdown-item
                    v-for="(crumb, index) in crumbs.slice(1, crumbs.length-2).reverse()"
                    :key="index"
                    :value="index.toString()"
                  >
                    <cv-link
                      :to="crumb.path"
                      aria-current="page"
                    >
                      {{ crumb.label }}
                    </cv-link>
                  </cv-dropdown-item>
                </cv-dropdown>
              </cv-breadcrumb-item>
              <cv-breadcrumb-item>
                <cv-link
                  :to="crumbs[crumbs.length-2].path"
                  aria-current="page"
                >
                  {{ crumbs[crumbs.length-2].label }}
                </cv-link>
              </cv-breadcrumb-item>
              <cv-breadcrumb-item>
                <cv-link
                  href="#"
                  aria-current="page"
                >
                  {{ crumbs[crumbs.length-1].label }}
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
    currentPageLabel() {
      return this.$route.meta.crumbLabel;
    }
  },
  watch: {
    currentPageLabel() {
      this.prevRoute.label = this.$route.meta.crumbLabel;
      this.prevRoute.path = this.$route.path;
      // strip out data. stays reactive otherwise.
      let data = Object.assign({}, this.prevRoute);
      this.crumbs.push(data);
    }
  }
};
</script>

<style lang="scss">
.main-content-area {
  &.desktop {
    padding-top: 75px;
  }
  &.mobile {
    padding-top: 50px;
  }
}
.app-breadcrumbs {
  top: $mobile-nav-height;
  z-index: 2;
  position: absolute;
  width: 100%;
  display: flex;
  padding: $spacing-sm 0;
  justify-content: space-between;
  @include MQ("LG") {
    top: $desktop-nav-height;
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

.bx--grid {
  &.home {
    z-index: -1;
  }
}

</style>