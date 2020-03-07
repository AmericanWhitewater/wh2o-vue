<template>
  <layout
    name="layout-two-thirds"
    :options="{sidebar:{left:true}}"
    class="bg-topo"
  >
    <template #sidebar>
      <div class="sidebar-wrapper">
        <hr>
        <h1 class="mb-spacing-lg">
          Search
        </h1>
        <div class="bx--row mt-sm mb-spacing-sm pl-spacing-md">
          <div class="bx--col-sm-12 mr-xs mb-spacing-sm">
            <cv-search
              v-model="searchParams.river"
              :disabled="loading"
              :placeholder="'e.g. Animas'"
              size="large"
              @keydown.enter="fetchRivers"
            />
          </div>
          <div class="bx--col-auto mr-xs mb-spacing-sm">
            <cv-dropdown
              v-model="searchParams.state"
              label="State"
              :disabled="loading"
            >
              <cv-dropdown-item
                v-for="(s, index) in UsStatesList"
                :key="index"
                :value="s.value"
              >
                {{ s.text }}
              </cv-dropdown-item>
            </cv-dropdown>
          </div>
          <div class="bx--col-auto mr-xs mb-spacing-sm">
            <cv-dropdown
              v-model="searchParams.level"
              label="Level"
              :disabled="loading"
            >
              <cv-dropdown-item
                v-for="(l, index) in levelsList"
                :key="index"
                :value="l.value"
              >
                {{ l.text }}
              </cv-dropdown-item>
            </cv-dropdown>
          </div>
          <div class="bx--col-auto mr-xs mb-spacing-sm">
            <cv-dropdown
              v-model="searchParams.state"
              label="International Reaches"
              :disabled="loading"
              @change="fetchRivers"
            >
              <cv-dropdown-item
                v-for="(i, index) in InternationalReaches"
                :key="index"
                :value="i.value"
              >
                {{ i.text }}
              </cv-dropdown-item>
            </cv-dropdown>
          </div>
        </div>
        <div class="bx--row mb-md">
          <div class="bx--col">
            <cv-button
              kind="secondary"
              size="small"
              class="search-btn"
              :disabled="loading"
              @click.exact="fetchRivers"
            >
              Submit
            </cv-button>
          </div>
        </div>
      </div>
    </template>
    <template #main>
      <template v-if="loading && !error">
        <loading-block text="lookin for water..." />
      </template>
      <template v-if="error && !loading">
        <error-block />
      </template>
      <template v-if="!loading && data">
        <div class="bx--data-table-container">
          <table class="bx--data-table">
            <thead>
              <tr>
                <th>
                  <strong>Name</strong>
                  <br>Section
                </th>
                <th>Class/Grade</th>
                <th>
                  <strong>Flow Reading</strong>
                  <br>Updated
                </th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="data.length === 0">
                <td colspan="4">
                  No Results.
                </td>
              </tr>
              <template v-if="data.length > 0">
                <tr
                  v-for="(r, index) in data.slice(0, 25)"
                  :key="index"
                >
                  <td
                    class="river-name-section"
                    @click="viewRiver(r.id)"
                  >
                    <strong>{{ r.name }}</strong>
                    <br>
                    {{ r.section }}
                  </td>
                  <td>{{ r.class }}</td>
                  <td>{{ formatFlowRange(r.gauge_min, r.gauge_max) }}</td>
                  <td>
                    <cv-overflow-menu
                      flip-menu
                      tip-position="left"
                    >
                      <cv-overflow-menu-item
                        primary-focus
                        @click.exact="$router.push('/river-index')"
                      >
                        View on Map
                      </cv-overflow-menu-item>
                      <cv-overflow-menu-item @click.exact="toggleBookmark(r.id)">
                        Bookmark
                      </cv-overflow-menu-item>
                    </cv-overflow-menu>
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot v-if="data && !showAll && data.length > 25">
              <tr>
                <td colspan="4">
                  <cv-button
                    kind="secondary"
                    @click="showAll = !showAll"
                  >
                    Show All
                  </cv-button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </template>
      <div class="mb-lg" />
    </template>
  </layout>
</template>
<script>
/**
 * @todo replicate user account sidebar col widths
 */
import { mapState } from 'vuex'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'
import { riverSearchActions } from './shared/state'
import { bookmarksActions } from '@/app/views/river-detail/shared/state'
import { globalAppActions } from '@/app/global/state'
import {
  InternationalReaches,
  LevelsList,
  UsStatesList,
  UsStatesRegions
} from './shared/mixins'
import { Layout } from '@/app/global/layout'

export default {
  name: 'RiverSearch',
  components: {
    Layout,
    LoadingBlock,
    ErrorBlock
  },
  mixins: [InternationalReaches, LevelsList, UsStatesList, UsStatesRegions],
  metaInfo () {
    return {
      title: this.searchMetaTitle,
      titleTemplate: '%s | American Whitewater'
    }
  },
  data: () => ({
    searchParams: {
      river: null,
      state: null,
      level: null,
      include: null,
      atLeast: null,
      atMost: null
    },

    showAll: false
  }),
  computed: {
    ...mapState({
      loading: state => state.riverSearchState.riverSearchData.loading,
      data: state => state.riverSearchState.riverSearchData.data,
      error: state => state.riverSearchState.riverSearchData.error,
      searchTerm: state => state.riverSearchState.riverSearchData.searchTerm
    }),
    searchMetaTitle () {
      if (this.data) {
        return `Search Results: ${this.data.length}`
      }
      if (this.loading) {
        return 'Loading...'
      }

      if (this.error) {
        return 'Error'
      }
      return 'River Search'
    }
  },
  watch: {
    /**
     * @todo this needs a check. not to run when filters have been reset.
     *
     */
    searchParams () {
      this.fetchRivers()
    }
  },
  methods: {
    fetchRivers (input) {
      this.firstTimePageLoad = false
      this.$store.dispatch(
        riverSearchActions.FETCH_RIVER_SEARCH_DATA,
        this.searchParams
      )
    },
    viewRiver (id) {
      this.$router.push(`/river-detail/${id}/main`).catch(() => {})
    },
    formatFlowRange (min, max) {
      if (!min || !max) {
        return 'Data Unavailable'
      }
      return `${Math.floor(min)} - ${Math.floor(max)}`
    },
    resetSearchParams () {
      const initialSearchParams = {
        river: null,
        state: null,
        level: null,
        include: null,
        atLeast: null,
        atMost: null
      }
      this.searchParams = Object.assign(this.searchParams, initialSearchParams)
    },
    toggleBookmark (id) {
      this.$store.dispatch(bookmarksActions.ADD_BOOKMARK, id)
      this.$store.dispatch(globalAppActions.SEND_TOAST, {
        title: 'Bookmark Added',
        kind: 'success',
        contrast: false,
        action: false,
        coreAction: true
      })
    }
  },
  created () {
    /**
     * load search with previous search value.
     * intended to clue users that there are search results below fold
     * when redirected to this page
     */
    if (this.searchTerm) {
      this.searchParams.river = this.searchTerm
    }
  }
}
</script>
<style lang="scss">
.river-name-section {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.search-col {
  input {
    height: 40px !important;
  }
}

.sidebar-wrapper {
  @include layer("raised");
  padding: $spacing-md;
  background-color: $ui-01;
}
</style>
