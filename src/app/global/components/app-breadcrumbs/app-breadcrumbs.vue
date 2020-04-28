<template>
  <div class="app-breadcrumbs-wrapper">
    <layout name="layout-full-width">
      <template #main>
        <template v-if="loading">
          <cv-skeleton-text />
        </template>
        <template v-else-if="crumbs">
          <div
            v-show="$route.name !== 'home'"
            class="app-breadcrumbs"
          >
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
                  <template v-if="index + 1 !== crumbs.length">
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
                      v-for="(crumb, index) in crumbs
                        .slice(0, crumbs.length - 2)
                        .reverse()"
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
                    :to="crumbs[crumbs.length - 2].path"
                    aria-current="page"
                  >
                    {{ getLabel(crumbs[crumbs.length - 2].label) }}
                  </cv-link>
                </cv-breadcrumb-item>
                <cv-breadcrumb-item>
                  <cv-link
                    href="#"
                    aria-current="page"
                  >
                    {{ getLabel(crumbs[crumbs.length - 1].label) }}
                  </cv-link>
                </cv-breadcrumb-item>
              </template>
            </cv-breadcrumb>
            <cv-tag
              v-if="$route.name === 'river-index' && riverIndexData"
              kind="blue"
              :label="`Rivers Found: ${riverIndexData.length}`"
              :disabled="false"
            />
          </div>
        </template>
      </template>
    </layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Layout } from '@/app/global/layout'
import { checkWindow } from '@/app/global/mixins'
/**
 * @description Breadcrumbs which show the session history.
 * @reference https://www.carbondesignsystem.com/components/breadcrumb/usage
 * @displayName App Breadcrumbs
 *
 */

export default {
  name: 'app-breadcrumbs',
  components: {
    Layout
  },
  mixins: [checkWindow],
  data: () => ({
    prevRoute: {
      path: null,
      label: null
    },
    crumbs: []
  }),
  computed: {
    ...mapState({
      river: state => state.riverDetailState.riverDetailData.data,
      loading: state => state.riverDetailState.riverDetailData.loading,
      searchResults: state => state.riverSearchState.riverSearchData.data,
      riverIndexData: state => state.riverIndexState.riverIndexData.data
    }),
    currentPage () {
      return this.$route
    },
    riverName () {
      if (this.river) {
        return this.river.river
      }
      return null
    },
    riverSection () {
      if (this.river) {
        return this.river.section
      }
      return null
    }
  },
  watch: {
    currentPage () {
      this.setCrumbs()
    }
  },
  methods: {
    setCrumbs () {
      if (
        this.currentPage &&
        this.prevRoute.label !== this.currentPage.meta.crumbLabel &&
        this.$route.path !== '/'
      ) {
        this.prevRoute.label = this.currentPage.meta.crumbLabel
        this.prevRoute.path = this.currentPage.path
        // strip out data. stays reactive otherwise.
        const data = Object.assign({}, this.prevRoute)
        this.crumbs.push(data)
      }
    },
    getLabel (label) {
      if (label === 'River Detail') {
        const currentRiver = `${this.riverName} - ${this.riverSection}`
        if (this.windowWidth < this.breakpoints.lg) {
          return `${currentRiver.slice(0, 20)}...`
        }
        return currentRiver
      }
      return label
    }
  },
  created () {
    this.setCrumbs()
  }
}
</script>

<style lang="scss">
.app-breadcrumbs-wrapper {
  position: relative;
}
.app-breadcrumbs {
  top: $mobile-nav-height;
  z-index: 2;
  position: relative;
  display: flex;
  padding: $spacing-sm 0;
  justify-content: space-between;
  max-width: 100%;
  // overflow-x: scroll;
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

// TEMP !!!!!

.bx--col-lg-10 {
  height: 100% !important;
}

.bx--breadcrumb {
  display: flex !important;
}
</style>
<docs>

```js
<app-breadcrumbs />
```

</docs>
