<template>
  <div class="river-search bg-topo">
    <layout name="layout-full-width">
      <template #main>
        <hr>
        <h1 class="mb-spacing-md">
          Search
        </h1>
      </template>
    </layout>

    <layout
      name="layout-two-thirds"
      :options="{ sidebar: { left: true } }"
    >
      <template #sidebar>
        <div class="sidebar sticky mb-spacing-lg">
          <cv-search
            v-model="searchParams.river"
            :disabled="loading"
            :placeholder="'e.g. Animas'"
            size="large"
            class="mb-spacing-md"
            @keydown.enter="fetchRivers"
          />
          <cv-dropdown
            v-model="searchParams.state"
            label="State"
            :disabled="loading"
            class="mb-spacing-md"
          >
            <cv-dropdown-item
              v-for="(s, index) in UsStatesList"
              :key="index"
              :value="s.value"
            >
              {{ s.text }}
            </cv-dropdown-item>
          </cv-dropdown>
          <cv-dropdown
            v-model="searchParams.level"
            label="Level"
            :disabled="loading"
            class="mb-spacing-md"
          >
            <cv-dropdown-item
              v-for="(l, index) in levelsList"
              :key="index"
              :value="l.value"
            >
              {{ l.text }}
            </cv-dropdown-item>
          </cv-dropdown>
          <cv-dropdown
            v-model="searchParams.state"
            label="International Reaches"
            :disabled="loading"
            class="mb-spacing-md"
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
      </template>
      <template #main>
        <template v-if="!loading && !error && !data">
          <utility-block
            state="content"
            blank
          />
        </template>
        <template v-if="loading">
          <utility-block
            state="loading"
            text="lookin for water"
          />
        </template>
        <template v-else-if="data">
          <div class="bx--data-table-container">
            <table class="bx--data-table river-table">
              <thead>
                <tr>
                  <th>
                    <strong>Name</strong>
                    <br>Section
                  </th>
                  <th>Class/Grade</th>
                  <th>
                    Flow Reading
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
                    v-for="(r, index) in data"
                    :key="index"
                  >
                    <td
                      :class="[r.color, 'river-name-section']"
                      @click="viewRiver(r.id)"
                    >
                      <strong>{{ r.name }}</strong>
                      <br>
                      {{ r.section }}
                    </td>
                    <td>{{ r.class }}</td>
                    <td
                      v-if="r.reading_formatted"
                      @click.exact="viewRiver(r.id, 'flow')"
                    >
                      <div>{{ r.reading_formatted }}</div>

                      <template v-if="r.reading_delta">
                        <span> {{ r.reading_delta }}</span>
                      </template>
                    </td>
                    <td v-else>
                      Data Unavailable
                    </td>
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
                        <cv-overflow-menu-item
                          @click.exact="toggleBookmark(r.id)"
                        >
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
        <template v-if="error">
          <utility-block state="error" />
        </template>
        <div class="mb-lg" />
      </template>
    </layout>
  </div>
</template>
<script>
/**
 * @todo replicate user account sidebar col widths
 */
import { mapState } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
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
  name: 'river-search',
  components: {
    Layout,
    UtilityBlock
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
    viewRiver (id, tab) {
      this.$router
        .push(`/river-detail/${id}/${tab || 'main'}`)
        .catch(() => {})
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
.river-search {
  .sidebar {
    background-color: $ui-01;
    @include layer("raised");
    padding: $spacing-md;
  }
}
</style>
