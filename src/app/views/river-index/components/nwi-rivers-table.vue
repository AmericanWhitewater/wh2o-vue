<template>
  <div id="nwi-rivers-table" kind="standard">
    <template v-if="searchLoading">
      <utility-block state="loading" />
    </template>
    <template v-else-if="reaches && reaches.length > 0">
      <div class="bx--data-table-container river-index">
        <nwi-level-legend :top=-2 />
        <table class="bx--data-table river-table">
          <thead>
            <tr>
              <th>
                <strong>Name</strong>
                <br >Section
              </th>
              <th>Level</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="reaches && reaches.length > 0">
              <tr
                v-for="reach in reaches"
                :key="reach.id"
                :ref="`reach-${reach.id}`"
                :class="[
                  mouseoveredFeature && reach.id === mouseoveredFeature.properties.id ? 'active' : '',
                  (reachFlows[reach.id] && reachFlows[reach.id].correlation) ? cssClassForGaugeCorrelation(reachFlows[reach.id].correlation) : ''
                ]"
                @mouseover="debouncedMouseover(reach.feature)"
                @mouseleave="debouncedMouseover()"
              >
                <td class="river-name-section">
                  <router-link :to="`/river-detail/${reach.id}/main`">
                    <strong>{{ displayReachTitle(reach) }}</strong>
                    <br >
                    {{ reach.section }}
                    <span v-if="reach.altname">({{ reach.altname }})</span>
                  </router-link>
                </td>
                <td class="level">
                  <template v-if="reachFlows[reach.id] && reachFlows[reach.id].loading">
                    <cv-inline-loading
                      small
                      state="loading"
                      loading-text=""
                    />
                  </template>
                  <template v-else-if="reachFlows[reach.id] && reachFlows[reach.id].correlation">
                    {{ reachFlows[reach.id].correlation.latestReading.value }} {{ correlationMetrics[reachFlows[reach.id].correlation.metric].unit }}
                    <cv-tooltip
                      v-if="reachFlows[reach.id].correlation.status === 'stale'"
                      tip="reading is out of date"
                      direction="left"
                    >
                      !
                    </cv-tooltip>
                  </template>
                </td>
                <td>
                  <zoom-in16
                    v-if="reach.geometry"
                    class="zoom-button"
                    width="21"
                    height="21"
                    @click.exact="centerReach(reach)"
                  />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
    <template v-else-if="noReaches">
      <template v-if="showingSearchResults">
        <utility-block
          state="content"
          text="No rivers match your search query."
        />
      </template>
      <template v-else>
        <utility-block
          state="content"
          text="Zoom in on the map to display river details here."
        />
      </template>
    </template>
    <template v-else> Error </template>
  </div>
</template>

<script>
import NwiLevelLegend from './nwi-level-legend.vue';
import { lineString } from "@turf/helpers";
import debounce from "lodash.debounce";
import ZoomIn16 from "@carbon/icons-vue/lib/zoom--in/16";
import scrollIntoView from "scroll-into-view-if-needed";
import { Breakpoints } from "@/app/global/services";
import { reachClient } from "@/app/http";
import { reachApiHelper } from "@/app/global/mixins";
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block.vue";

export default {
  name: "nwi-rivers-table",
  components: {
    ZoomIn16,
    UtilityBlock,
    NwiLevelLegend
  },
  mixins: [reachApiHelper],
  props: {
    reachesOnMap: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data: () => ({
    windowWidth: 0,
    mq: Breakpoints,
    reachFlows: {}
  }),
  computed: {
    ...mapState({
      searchResults: (state) => state.RiverIndex.mapSearchResults,
      searchTerm: (state) => state.RiverIndex.mapSearchTerm,
      searchLoading: (state) => state.RiverIndex.mapSearchLoading,
      mouseoveredFeature: (state) => state.RiverIndex.mouseoveredFeature,
    }),
    showingSearchResults() {
      return Boolean(this.searchTerm);
    },
    // convert map features or search results into normal reach objects
    reaches() {
      if (this.showingSearchResults) {
        if (this.searchResults && this.searchResults.length) {
          // this is still coming from a Laravel endpoint, so returns old schema
          return this.searchResults.map((x) => {
            let geom;
            if (x.geom) {
              const coords = x.geom
                .split(",")
                .map((x) => x.split(" ").map((y) => parseFloat(y)));
              geom = lineString(coords).geometry;
            }
            return {
              id: x.id,
              geometry: geom,
              difficulty: x.class,          
              river: x.river,
              section: x.section,
              altname: x.altname,
              abstract: x.abstract,
            }
          });
        }
        return [];
      } else {
        const convertedReaches = this.reachesOnMap.map((x) => ({
            geometry: x.geometry,
            ...x.properties,
            // tileserver returns both class and difficulty with the latter being an integer
            difficulty: x.properties.class,
            // to retain existing "mouseover highlight" functionality, including ref to original geojson
            feature: x
          }));
        // alphabetize results if they're just displaying from the map
        convertedReaches.sort((a, b) => {
          const nameA = a.river.toUpperCase();
          const nameB = b.river.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });

        return convertedReaches;
      }
    },
    noReaches() {
      return Boolean(this.reaches && this.reaches.length === 0);
    },
    columns() {
      return ["Reach", "Difficulty", "Flow", "Zoom"];
    },
    rowSize() {
      if (this.windowWidth < this.mq.lg) {
        return "compact";
      }
      return "standard";
    },
  },
  watch: {
    mouseoveredFeature(feature) {
      if (feature) {
        const reachId = feature.properties.id;
        if (
          this.$refs[`reach-${reachId}`] &&
          this.$refs[`reach-${reachId}`].length > 0
        ) {
          scrollIntoView(this.$refs[`reach-${reachId}`][0], {
            scrollMode: "if-needed",
            block: "center",
            inline: "nearest",
            behavior: "smooth",
            boundary: this.$el,
          });
        }
      }
    },
    // update reactive data property with map or search results whenever they change
    async reaches(newReaches) {
      this.debouncedGetFlows(newReaches);
    },
  },
  methods: {
    async getFlows(reaches) {
      const reachIDsToQuery = reaches.map(r => r.id.toString()).filter(id => !this.reachFlows[id]);
      if (reachIDsToQuery.length > 0) {
        reachIDsToQuery.forEach(id => this.reachFlows[id] = { loading: true });
        try {
          // batch request if it's over 150 reaches as the API request sometimes fails if it's too big
          // we know there is a max of 300 from nwi-map.vue#250
          const newReachFlows = await reachClient.getReachTableByIDs.query({ reachIDs: reachIDsToQuery.slice(0,150) });
          if (reachIDsToQuery.length > 150) {
            const addlReachFlows = await reachClient.getReachTableByIDs.query({ reachIDs: reachIDsToQuery.slice(150, 300) });
            newReachFlows.push(...addlReachFlows);
          }
          newReachFlows.forEach(rf => {
            this.reachFlows[rf.reach.id].correlation = rf.correlation;
          });
        } catch(e) {
          // eslint-disable-next-line no-console
          console.error(e);
        } finally {
          reachIDsToQuery.forEach(id => {
            this.reachFlows[id].loading = false;
          });
        }
      }
    },
    displayReachTitle(reach) {
      return [reach.river, reach.difficulty].join(" - ");
    },
    viewRiver(id, tab) {
      this.$router.push(`/river-detail/${id}/${tab || "main"}`).catch(() => {});
    },
    mouseoverFeature(feature) {
      this.$store.dispatch("RiverIndex/mouseOverFeature", feature);
    },
    centerReach(reach) {
      this.$emit("centerReach", reach.feature);
    },
  },
  created() {
    this.debouncedMouseover = debounce(this.mouseoverFeature, 200);
    this.debouncedGetFlows = debounce(this.getFlows, 500);
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
  },
};
</script>

<style lang="scss">
.bx--data-table-container {
  min-width: unset;
  overflow-x: scroll;
  overflow-y: auto;
  z-index: 2;

  &.river-index {
    height: calc(100vh - 189px);
    overflow-x: clip;
  }
}

.bx--data-table.river-table {
  position: relative;

  th {
    position: sticky;
    top: calc(3rem - 2px);
  }

  th,
  td {
    vertical-align: middle;

    a {
      color: #5a6872;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.29;
      letter-spacing: 0.16px;
    }

    span {
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .river-name-section {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .zoom-button {
    cursor: pointer;
  }

  tr.stale button.cv-tooltip {
    background-color: $flow-warning;
    padding: 0 0.47rem;
    border-radius: 1rem;
  }

  tr {
    @include ease;
    // lines up header background with borders from the rows
    border-left: 0.5rem solid $ui-03;

    .level {
      white-space: nowrap;
    }

    @each $class, $color in $flow-map {
      &.#{$class} {
        td:first-child {
          border-left: 0.5rem solid $color;
        }
      }
    }
    td {
      padding: 0.5rem 0;
    }

    &.active, &.active td {
      background: #e5e5e5;
    }
  }
}

.nwi-map-search.bx--toolbar {
  .cv-search {
    .bx--search-close {
      display: flex;
    }
  }
}
</style>