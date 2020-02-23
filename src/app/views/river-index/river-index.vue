<template>
  <div>
    <div class="bx--grid river-index">
      <div
        id="fullscreen-target"
        class="bx--row"
      >
        <div
          :class="[
            mapFocused ? focusedArea : unfocusedArea + ' disabled',
            { 'bx--no-gutter--left': fullscreen },
            'map-wrapper'
          ]"
        >
          <div class="outside">
            <div :class="[{ fullscreen: fullscreen }, 'inside', 'map']">
              <national-map-app-vue
                v-show="mapStyle !== 'graphic'"
                :show-search="false"
                :show-controls="false"
                :show-sidebar="false"
                :show-legend="true"
                :show-rivers-table="false"
                :mapbox-access-token="token"
                :tileserver="tileserver"
              />
              <static-us-map
                v-show="mapStyle === 'graphic'"
                @stateClicked="fetchRivers"
              />
              <div
                class="expand-toggle"
                @click="toggleFocus"
              >
                <component
                  :is="mapFocused ? 'icon-maximize' : 'icon-minimize'"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          :class="[
            mapFocused ? unfocusedArea : focusedArea,
            { fullscreen: fullscreen },
            { 'bx--no-gutter--left': fullscreen },
            'sidebar-wrapper'
          ]"
        >
          <div class="outside">
            <div class="inside sidebar">
              <div class="bx--row">
                <div class="bx--col">
                  <template v-if="fullscreen">
                    <aw-logo variant="sm" />
                    <h3 class="mt-sm">
                      River Index
                    </h3>
                    <hr>
                  </template>
                  <template v-else>
                    <h1>River Index</h1>
                    <hr>
                  </template>
                </div>
              </div>
              <div class="bx--row">
                <div class="bx--col">
                  <cv-toolbar>
                    <cv-toolbar-search
                      v-model="riverSearchHttpConfig.river"
                      @keydown.enter="fetchRivers"
                    />

                    <cv-overflow-menu class="bx--toolbar-action">
                      <template slot="trigger">
                        <Filter16 class="bx--overflow-menu__icon bx--toolbar-filter-icon" />
                      </template>
                      <cv-toolbar-title title="Show Features" />
                      <cv-toolbar-option>
                        <cv-checkbox
                          v-model="visibleFeatures.rapids"
                          value="rapids"
                          label="Rapids"
                        />
                      </cv-toolbar-option>
                      <cv-toolbar-option>
                        <cv-checkbox
                          v-model="visibleFeatures.projects"
                          value="projects"
                          label="Projects"
                        />
                      </cv-toolbar-option>
                      <cv-toolbar-option>
                        <cv-checkbox
                          v-model="visibleFeatures.bookmarks"
                          value="bookmarks"
                          label="Saved Points"
                        />
                      </cv-toolbar-option>
                    </cv-overflow-menu>

                    <cv-overflow-menu class="bx--toolbar-action">
                      <cv-overflow-menu-item primary-focus>
                        Refresh table
                      </cv-overflow-menu-item>
                      <cv-toolbar-divider />
                      <cv-toolbar-title title="Map Style" />
                      <cv-toolbar-option>
                        <cv-radio-button
                          v-model="mapStyle"
                          name="row-height"
                          label="Topographic"
                          value="topo"
                        />
                      </cv-toolbar-option>
                      <cv-toolbar-option>
                        <cv-radio-button
                          v-model="mapStyle"
                          name="row-height"
                          label="Satellite"
                          value="satellite"
                        />
                      </cv-toolbar-option>
                      <cv-toolbar-option>
                        <cv-radio-button
                          v-model="mapStyle"
                          name="row-height"
                          label="Graphic"
                          value="graphic"
                        />
                      </cv-toolbar-option>
                    </cv-overflow-menu>
                    <cv-button
                      kind="tertiary"
                      size="small"
                      small
                      @click="toggleFullscreen"
                      v-text="'Fullscreen'"
                    />
                  </cv-toolbar>
                </div>
              </div>
              <div class="bx--data-table-container">
                <table class="bx--data-table">
                  <thead>
                    <tr>
                      <th>
                        <strong>River Name</strong>
                        <br>Section
                      </th>
                      <th>Class</th>
                      <th>Flow</th>
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="!searchLoading">
                      <tr
                        v-for="(r, index) in searchResults"
                        :key="index"
                      >
                        <td
                          :class="
                            checkFlowStatus(
                              mockFlowData.current,
                              mockFlowData.min,
                              mockFlowData.max
                            )
                          "
                        >
                          <span @click="viewRiver(r.id)">
                            <strong>{{ r.name }}</strong>
                            <br>
                            {{ r.section }}
                          </span>
                        </td>
                        <td>{{ r.class }}</td>
                        <td>
                          <template v-if="r.cond">
                            <cv-definition-tooltip

                              alignment="center"
                              direction="top"
                              :definition="formatCondition(r.cond)"
                              :term="`${mockFlowData.current} [cfs]`"
                            />
                          </template>
                          <template v-else>
                            n/a
                          </template>
                        </td>
                        <td>{{ formatDate(r.updated) }}</td>
                      </tr>
                    </template>
                    <template v-if="searchLoading">
                      <tr>
                        <td colspan="4">
                          <loading-block text=" " />
                        </td>
                      </tr>
                    </template>
                    <template v-if="!searchLoading && !searchResults">
                      <tr>
                        <td colspan="4">
                          Sorry, no results found. Please try again.
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import virtual_Maximize16 from '@carbon/icons-vue/es/maximize/16'
import virtual_Minimize16 from '@carbon/icons-vue/es/minimize/16'
import { StaticUsMap } from './shared/components'
import { riverSearchHttpConfig } from '@/app/global/mixins'

import { LoadingBlock, AwLogo } from '@/app/global/components'
import { riverIndexActions } from './shared/state'
import { riverSearchActions } from '../river-search/shared/state'
import {
  mapboxAccessToken,
  nwiTileServer
} from '@/app/environment/environment'
import {
  InternationalReaches,
  LevelsList
} from '../river-search/shared/mixins'
import NationalMapAppVue from './components/national-map-app/national-map-app.vue'
import { mapState } from 'vuex'
import screenfull from 'screenfull'
import Moment from 'moment'
export default {
  name: 'RiverIndex',
  components: {
    NationalMapAppVue,
    StaticUsMap,
    LoadingBlock,
    AwLogo,
    'icon-maximize': virtual_Maximize16,
    'icon-minimize': virtual_Minimize16
  },
  mixins: [riverSearchHttpConfig, InternationalReaches, LevelsList],
  metaInfo () {
    return {
      title: 'National Whitewater Inventory - American Whitewater'
    }
  },
  data: () => ({
    tileserver: nwiTileServer,
    mapStyle: 'topo',
    fullscreen: false,
    fullscreenIcon: 'AddFilled16',
    riverSearch: null,
    token: mapboxAccessToken,
    expandToggleTxt: 'Hide',
    mapFocused: true,
    focusedArea: 'bx--col-sm-4 bx--col-md-6 bx--col-lg-12',
    unfocusedArea: 'bx--col-sm-4 bx--col-md-2 bx--col-lg-4',
    location: null,
    coords: {
      lat: null,
      lon: null
    },
    fullscreenButtonConfig: {
      name: 'FitToScreen16',
      functional: true
    },
    visibleFeatures: {
      rapids: true,
      pins: true,
      projects: true
    }
  }),
  computed: {
    ...mapState({
      searchResults: state => state.riverSearchState.riverSearchData.data,
      searchLoading: state => state.riverSearchState.riverSearchData.loading
    }),
    /**
     * @temp return dummy values for styling
     */
    mockFlowData () {
      return {
        current: Math.floor(Math.random() * 50 + 1),
        min: Math.floor(Math.random() * 10 + 1),
        max: Math.floor(Math.random() * 100 + 1)
      }
    }
  },
  watch: {
    mapStyle () {
      this.setMapStyle()
    }
  },
  mounted () {
    this.getUserLocation()
  },
  methods: {
    /**
     * @public
     * @description capitalize the current flow range for tooltip
     * @param {string} cond river flow condition. low, recommended, upper recommended, above recommended, etc.
     * @todo for empty values (n/a) we want to deemphasize. lower opacity or make light gray.
     *
     */
    formatCondition (cond) {
      if (cond) {
        return cond.charAt(0).toUpperCase() + cond.substring(1)
      }
      return 'n/a'
    },
    /**
     * @public
     * @description format the date to make human friendly
     * @param {string} date date reach flow rate was last updated
     * @todo for empty values (n/a) we want to deemphasize. lower opacity or make light gray.
     *
     */
    formatDate (date) {
      if (date) {
        return Moment(date, 'MMMM Do YYYY').format('LLL')
      }

      return 'n/a'
    },
    /**
     * @public
     * @param {number} current most recent gage reading
     * @param {number} min gage_min reach flow level
     * @param {number} max gage_max reach flow level
     */
    checkFlowStatus (current, min, max) {
      if (current) {
        if (current < min) {
          return 'low'
        } else if (current > max) {
          return 'hi'
        } else {
          return 'med'
        }
      }
      return 'unknown'
    },
    /**
     * @public
     * @description push to river detail route. use $router.push to create log in browser history
     * @param {string} id river id used to load repective data
     *
     */
    viewRiver (id) {
      this.$router.push(`/river-detail/${id}/main`)
    },
    toggleFocus () {
      this.mapFocused = !this.mapFocused
      if (this.mapFocused) {
        this.expandToggleTxt = 'Hide'
      } else {
        this.expandToggleTxt = 'Show'
      }
    },
    fetchRivers () {
      this.$store.dispatch(
        riverSearchActions.FETCH_RIVER_SEARCH_DATA,
        this.riverSearchHttpConfig
      )
    },
    /**
     * @description helper func used to retrieve users location and put data in vuex store.
     * @todo privacy ux considerations
     */
    showPosition (position) {
      this.coords.lat = position.coords.latitude
      this.coords.lon = position.coords.longitude
      this.$store.dispatch(riverIndexActions.FETCH_USER_LOCATION, this.coords)
    },
    /**
     * @description fetches users location
     */
    getUserLocation () {
      /**
       * if browser supports geolocation, cool, run it.
       */
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition)
      }
    },
    /**
     * @description sets map style
     * @values topo, satellite, graphic
     */
    setMapStyle () {
      this.$store.dispatch(riverIndexActions.SET_MAP_STYLE, this.mapStyle)
    },
    toggleFullscreen () {
      if (this.fullscreen) {
        this.fullscreen = false
        this.fullscreenIcon = 'Maximize16'
      } else {
        this.fullscreen = true
        this.fullscreenIcon = 'Minimize16'
      }
      screenfull.toggle(document.getElementById('fullscreen-target'))
    }
  }
}
</script>
<style lang="scss" scoped>
$content-height: calc(100vh - 125px);
// todo: move to global scss
@mixin flow-border($color) {
  border-left: 0.5rem solid $color;
  &:hover {
    border-left: 1.5rem solid $color;
  }
}

.river-index {
  .map {
    height: $content-height;
    background-color: $brand-03;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    &.fullscreen {
      height: 100vh;
    }
    .expand-toggle {
      transform: rotate(90deg);
      font-size: 14px;
      font-weight: bolder;
      white-space: nowrap;
      cursor: pointer;
      white-space: nowrap;
      line-height: 50px;
      width: 50px;
      text-align: center;
      position: absolute;
      right: 0;
      top: 1rem;
      background-color: #fff;
    }
  }
  .sidebar-wrapper {
    padding-top: 1rem;
    &.fullscreen {
      padding-top: $layout-sm;
    }
    .sidebar {
      display: flex;
      align-items: flex-start;
      flex-flow: column nowrap;
      width: 100%;
      overflow: hidden;
    }
  }
}

.disabled {
  opacity: 0.75;
}

.map-wrapper,
.sidebar-wrapper {
  @include ease(0.6s);
}

.bx--loading-overlay {
  height: calc(100vh - 75px);
  top: 75px;
}

.bx--data-table-container {
  overflow-x: scroll;
  height: $content-height;
}
.bx--data-table {
  min-width: 700px;
  position: relative;

  th {
    position: sticky;
    top: -5px;
  }

  th,
  td {
    vertical-align: middle;
    span {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  tbody {
    tr,
    td {
      @include ease;
      &:nth-child(1) {
        &.low {
          @include flow-border($flow-low);
        }
        &.med {
          @include flow-border($flow-medium);
        }
        &.hi {
          @include flow-border($flow-high);
        }
        &.unknown {
          @include flow-border($flow-high);
        }
      }
    }
  }
}

#fullscreen-target {
  background-color: $ui-01;
}
</style>
