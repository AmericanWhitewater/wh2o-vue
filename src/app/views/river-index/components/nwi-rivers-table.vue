<template>
  <div id="nwi-rivers-table" kind="standard">
    <template v-if="searchLoading">
      <utility-block state="loading" />
    </template>
    <template v-else-if="reaches && reaches.length > 0">
      <div class="bx--data-table-container river-index">
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
                :key="reach.properties.id"
                :ref="`reach-${reach.properties.id}`"
                :class="{
                  active:
                    mouseoveredFeature &&
                    reach.properties.id === mouseoveredFeature.properties.id,
                }"
                @mouseover="debouncedMouseover(reach)"
                @mouseleave="debouncedMouseover()"
              >
                <td
                  :class="[
                    `${reach.properties.condition}`,
                    'river-name-section',
                  ]"
                >
                  <router-link :to="`/river-detail/${reach.properties.id}/main`">
                    <strong>{{ displayReachTitle(reach) }}</strong>
                    <br >
                    {{ reach.properties.section }}
                    <span v-if="reach.properties.altname">({{ reach.properties.altname }})</span>
                  </router-link>
                </td>
                <td class="level">{{ displayGaugeReading(reach) }}</td>
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
import { lineString } from "@turf/helpers";
import debounce from "lodash.debounce";
import ZoomIn16 from "@carbon/icons-vue/lib/zoom--in/16";
import scrollIntoView from "scroll-into-view-if-needed";
import { Breakpoints } from "@/app/global/services";
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block.vue";
export default {
  name: "nwi-rivers-table",
  components: {
    ZoomIn16,
    UtilityBlock,
  },
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
    reaches() {
      if (this.showingSearchResults) {
        if (this.searchResults && this.searchResults.length) {
          return this.searchResults.map((x) =>
            this.convertSearchResponseToGeoJSON(x)
          );
        }
        return [];
      }
      // alphabetize results if they're just displaying from the map
      const alphabetizedReaches = this.reachesOnMap.slice(0).sort((a, b) => {
        const nameA = a.properties.river.toUpperCase();
        const nameB = b.properties.river.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      return alphabetizedReaches;
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
  },
  methods: {
    displayReachTitle(reach) {
      return [reach.properties.river, reach.properties.class].join(" - ");
    },
    displayGaugeReading(reach) {
      if (reach.properties.gage_0_reading) {
        return [
          (reach.properties.gage_0_estimated ? '~' : ''),
          parseFloat(reach.properties.gage_0_reading.toFixed(2)),
          reach.properties.gage_0_unit,
        ].join(" ");
      }
      return "";
    },
    viewRiver(id, tab) {
      this.$router.push(`/river-detail/${id}/${tab || "main"}`).catch(() => {});
    },
    mouseoverFeature(feature) {
      this.$store.dispatch("RiverIndex/mouseOverFeature", feature);
    },
    centerReach(reach) {
      this.$emit("centerReach", reach);
    },
    // the search endpoint returns a very different looking object
    // than the tileserver, but for all the map centering logic (and table display logic)
    // to work, we need to convert the data here
    convertSearchResponseToGeoJSON(reach) {
      let geom;
      if (reach.geom) {
        const coords = reach.geom
          .split(",")
          .map((x) => x.split(" ").map((y) => parseFloat(y)));
        geom = lineString(coords).geometry;
      }
      const readingSummaryProps = {};
      if (reach.readingsummary) {
        readingSummaryProps.gage_0_id = reach.readingsummary.gauge_id;
        readingSummaryProps.gage_0_reading = parseFloat(
          reach.readingsummary.gauge_reading
        );
        readingSummaryProps.gage_0_updated = reach.readingsummary.updated;
        if (reach.readingsummary.metric) {
          readingSummaryProps.gage_0_unit = reach.readingsummary.metric.unit;
        }
        readingSummaryProps.gage_0_estimated = reach.readingsummary.gauge_estimated;
        if (reach.readingsummary.reading) {
          const reading = reach.readingsummary.reading;
          if (reading > 1) {
            readingSummaryProps.condition = "hi";
          } else if (reading < 0) {
            readingSummaryProps.condition = "low";
          } else {
            readingSummaryProps.condition = "med";
          }
        }
      }

      if (!readingSummaryProps.condition) {
        readingSummaryProps.condition = "unk";
      }

      return {
        type: "Feature",
        id: undefined,
        geometry: geom,
        properties: {
          class: reach.class,
          id: reach.id,
          river: reach.river,
          section: reach.section,
          altname: reach.altname,
          abstract: reach.abstract,
          ...readingSummaryProps,
          gage_0_name: reach.gauge && reach.gauge.name,
        },
      };
    },
  },
  created() {
    this.debouncedMouseover = debounce(this.mouseoverFeature, 200);
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
    overflow-x: unset;
  }
}

.bx--data-table.river-table {
  position: relative;

  th {
    position: sticky;
    top: -5px;
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

  &.river-table {
    tbody {
      tr.active {
        background: #e5e5e5;

        td {
          background: #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          border-top: 1px solid #e5e5e5;
        }

        td:nth-child(1) {
          border-left-width: 1.5rem;
        }
      }

      tr,
      td {
        @include ease;
        padding-bottom: 0.5rem;

        padding-top: 0.5rem;

        .level {
          white-space: nowrap;
        }

        &:nth-child(1) {
          &[class*="low"],
          &.low {
            @include flow-border($flow-low);
          }

          &[class*="med"],
          &.med {
            @include flow-border($flow-medium);
          }

          &[class*="hi"],
          &.hi {
            @include flow-border($flow-high);
          }

          &[class*="unk"],
          &.unk {
            @include flow-border($ui-03);
          }
        }
      }
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