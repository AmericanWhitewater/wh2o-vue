<template>
  <div class="bx--grid">
    <page-header
      title="River Search"
      class="mb-sm"
    />
    <div class="bx--row mb-md pl-spacing-md">
      <div class="bx--col-auto mr-xs search-col mb-spacing-sm">
        <label class="bx--label">Search</label>
        <cv-search
          v-model="searchParams.river"
          :placeholder="'e.g. Arkansas River'"
          small
          @keydown.enter="fetchRivers"
        />
      </div>
      <div class="bx--col-auto mr-xs mb-spacing-sm">
        <cv-dropdown
          v-model="searchParams.state"
          label="State"
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
    <div class="bx--row mb-xl">
      <div class="bx--col">
        <table class="bx--data-table mb-md">
          <thead>
            <tr>
              <th>
                <strong>Name</strong>
                <br>Section
              </th>
              <th>Class/Grade</th>
              <th>Flow Range</th>
              <th>
                <strong>Flow</strong>
                <br>Updated
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="!loading && data">
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
                <td>
                  <!-- <template
                      v-if="r.gauge_min && r.gauge._max"
                    >{{ r.gauge_min }} - {{ r.gauge_max }}</template>
                    <template v-else>Data Unavailable</template>-->
                  {{ Math.floor(r.gauge_min) }} -
                  {{ Math.floor(r.gauge_max) }}
                </td>
                <td>{{ r.last_gauge_updated }}</td>
              </tr>
              <template v-if="showAll">
                <tr
                  v-for="(r, index) in data.slice(25, 750)"
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
                  <td>
                    {{ Math.floor(r.gauge_min) }} -
                    {{ Math.floor(r.gauge_max) }}
                  </td>
                  <td>{{ r.last_gauge_updated }}</td>
                </tr>
              </template>
            </template>
            <template v-else-if="loading">
              <tr>
                <td colspan="4">
                  <cv-inline-loading
                    small
                    state="loading"
                  />
                </td>
              </tr>
            </template>
            <template v-else-if="!data && !firstTimePageLoad">
              <tr>
                <td colspan="4">
                  No Results matched your criteria. Please try again.
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="4">
                  Try searching your home state.
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <template v-if="data && !showAll && data.length > 25">
          <cv-button
            kind="primary"
            @click="showAll = !showAll"
          >
            Show All
          </cv-button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { PageHeader } from '@/app/global/components'
import { riverSearchActions } from './shared/state'
import {
  InternationalReaches,
  LevelsList,
  UsStatesList,
  UsStatesRegions
} from './shared/mixins'

export default {
  name: 'RiverSearch',
  components: {
    PageHeader
  },
  mixins: [InternationalReaches, LevelsList, UsStatesList, UsStatesRegions],
  metaInfo () {
    return {
      title: this.searchMetaTitle,
      titleTemplate: '%s | American Whitewater'
    }
  },
  data: () => ({
    // show cta rather than 'no results' on initial page load
    firstTimePageLoad: true,
    searchParams: {
      river: '',
      state: '',
      level: '',
      include: '',
      atLeast: '',
      atMost: ''
    },
    showAll: false,
    metaTitle: null
  }),
  computed: {
    ...mapState({
      loading: state => state.riverSearchState.riverSearchData.loading,
      data: state => state.riverSearchState.riverSearchData.data,
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
      return null
    }
  },
  watch: {
    /**
     * @note place fetchRivers in a watcher. cv-dropdown emits twice resulting in duplicate api calls
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
      this.$router.push(`/river-detail/${id}/main`)
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
</style>
