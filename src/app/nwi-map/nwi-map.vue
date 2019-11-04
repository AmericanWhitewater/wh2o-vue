<template>
  <div>
    <div class="bx--grid nwi-map">
      <div class="bx--row">
        <div
          :class="[
            mapFocused ? focusedArea : unfocusedArea + ' disabled',
            'map-wrapper'
          ]"
        >
          <div class="outside">
            <div class="inside map">
              <static-us-map @stateClicked="fetchRivers" />
              <div
                class="expand-toggle"
                @click="toggleFocus"
              >
                <div v-text="expandToggleTxt" />
              </div>
            </div>
          </div>
        </div>
        <div
          :class="[mapFocused ? unfocusedArea : focusedArea, 'sidebar-wrapper']"
        >
          <div class="outside">
            <div class="inside sidebar">
              <template v-if="riverSearchHttpConfig.state">
                <h1>{{ riverSearchHttpConfig.state.substring(2) }}</h1>
              </template>
              <template v-else>
                <h1>Select a State</h1>
                <hr>
              </template>
              <div class="bx--row">
                <div class="bx--col mb-spacing-md">
                  <cv-dropdown
                    v-model="riverSearchHttpConfig.level"
                    label="Level"
                    @change="fetchRivers(riverSearchHttpConfig.state)"
                  >
                    <cv-dropdown-item
                      v-for="(l, index) in levelsList"
                      :key="index"
                      :value="JSON.stringify(l.value)"
                    >
                      {{ l.text }}
                    </cv-dropdown-item>
                  </cv-dropdown>
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
                    <template v-if="!loadingResults">
                      <tr
                        v-for="(r, index) in searchResults"
                        :key="index"
                      >
                        <td :class="r.cond">
                          <span @click="viewRiver(r.id)">
                            <strong>{{ r.name }}</strong>
                            <br>
                            {{ r.section }}
                          </span>
                        </td>
                        <td>{{ r.class }}</td>
                        <td>
                          <template v-if="parseInt(r.reading_formatted)">
                            {{ r.reading_formatted }} [{{ r.reading_delta }}]
                          </template>
                          <template
                            v-else
                          >
                            n/a
                          </template>
                        </td>
                        <td>{{ r.updated }}</td>
                      </tr>
                    </template>
                    <template
                      v-if="loadingResults"
                    >
                      <tr>
                        <td colspan="4">
                          <loading-block text=" " />
                        </td>
                      </tr>
                    </template>
                    <template v-if="!loadingResults && !searchResults">
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
import { riverSearchHttpConfig } from "../global/mixins";
import { StaticUsMap } from "./shared/components";
import {LoadingBlock} from "@/app/global/components"
import { riverSearchActions } from "../river-search/shared/state";
import {
  InternationalReaches,
  LevelsList
} from "../river-search/shared/mixins";
export default {
  name: "NwiMap",
  components: {
    StaticUsMap,
    LoadingBlock
  },
  mixins: [riverSearchHttpConfig, InternationalReaches, LevelsList],
  data: () => {
    return {
      expandToggleTxt: "Hide",
      mapFocused: true,
      focusedArea: "bx--col-sm-4 bx--col-md-6 bx--col-lg-12",
      unfocusedArea: "bx--col-sm-4 bx--col-md-2 bx--col-lg-4"
    };
  },
  computed: {
    searchResults() {
      if (this.$store.state.riverSearchState.riverSearchData.data) {
        return this.$store.state.riverSearchState.riverSearchData.data.slice(
          0,
          50
        );
      } else {
        return null;
      }
    },
    loadingResults() {
      return this.$store.state.riverSearchState.riverSearchData.loading;
    }
  },
  methods: {
    viewRiver(id) {
      this.$router.push(`/river-detail/${id}/main`);
    },
    toggleFocus() {
      this.mapFocused = !this.mapFocused;
      if (this.mapFocused) {
        this.expandToggleTxt = "Hide";
      } else {
        this.expandToggleTxt = "Show";
      }
    },
    fetchRivers(data) {
      // console.log("config", this.riverSearchHttpConfig);
      // console.log("data ", data);

      this.riverSearchHttpConfig.state = "st" + data;
      this.$store.dispatch(
        riverSearchActions.FETCH_RIVER_SEARCH_DATA,
        this.riverSearchHttpConfig
      );
      this.riverSearchHttpConfig.state = null;
    }
  }
};
</script>
<style lang="scss" scoped>
$content-height: calc(100vh - 125px);
// todo: move to global scss
@mixin flow-border($color) {
  box-shadow: inset 4px 0px 0px 0px $color;
  &:hover {
    box-shadow: inset 8px 0px 0px 0px $color;
  }
}

.nwi-map {
  .map {
    height: $content-height;
    background-color: $brand-03;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
  }

  .sidebar {
    height: $content-height;
    max-height: $content-height;
    display: flex;
    flex-flow: column nowrap;
    // justify-content: center;
    width: 100%;

    overflow: hidden;
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
}
.bx--data-table {
  min-width: 700px;
  position: relative;

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
    tr {
      &:hover {
        background-color: $ui-02;
      }
      td {
        @include ease;
        &:nth-child(1) {
          box-shadow: inset 2px 0px 0px 0px $ui-03;
          &.low {
            @include flow-border($flow-low);
          }
          &.med {
            @include flow-border($flow-medium);
          }
          &.hi {
            @include flow-border($flow-high);
          }
        }
      }
    }
  }
}

.expand-toggle {
  transform: rotate(90deg);
  font-size: 14px;
  font-weight: bolder;
  color: #fff;
  white-space: nowrap;
  cursor: pointer;
}
</style>
