<template>
  <div class="bx--grid">
    <page-header title="River Search" class="mb-sm" />
    <div class="bx--row mb-md pl-spacing-md">
      <div class="bx--col-auto mr-xs search-col">
        <label class="bx--label">Search</label>
        <cv-search
          v-model="riverSearchHttpConfig.river"
          :placeholder="'e.g. Arkansas River'"
          small
          @change="fetchRivers"
        />
      </div>
      <div class="bx--col-auto mr-xs">
        <cv-dropdown
          v-model="riverSearchHttpConfig.state"
          label="State"
          @change="fetchRivers"
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
      <div class="bx--col-auto mr-xs">
        <cv-dropdown
          v-model="riverSearchHttpConfig.level"
          label="Level"
          @change="fetchRivers"
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
      <div class="bx--col-auto mr-xs">
        <cv-dropdown
          v-model="riverSearchHttpConfig.state"
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
                <br />Section
              </th>
              <th>Class/Grade</th>
              <th>Flow Range</th>
              <th>
                <strong>Flow</strong>
                <br />Updated
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="!loading && data">
              <tr v-for="(r, index) in data.slice(0, 25)" :key="index">
                <td class="river-name-section" @click="viewRiver(r.id)">
                  <strong>{{ r.name }}</strong>
                  <br />
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
                <tr v-for="(r, index) in data.slice(25, 750)" :key="index">
                  <td class="river-name-section" @click="viewRiver(r.id)">
                    <strong>{{ r.name }}</strong>
                    <br />
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
              </template>
            </template>
            <template v-else-if="loading">
              <tr>
                <td colspan="4">
                  <cv-inline-loading small state="loading" />
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
          <cv-button kind="primary" @click="showAll = !showAll">
            Show All
          </cv-button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { PageHeader } from "../global/components";
import { riverSearchActions } from "./shared/state";
import {
  InternationalReaches,
  LevelsList,
  UsStatesList,
  UsStatesRegions
} from "./shared/mixins";

export default {
  name: "river-search",
  components: {
    PageHeader
  },
  mixins: [InternationalReaches, LevelsList, UsStatesList, UsStatesRegions],
  metaInfo() {
    return {
      title: "River Search - American Whitewater"
    };
  },
  data: () => ({
    // show cta rather than 'no results' on initial page load
    firstTimePageLoad: true,
    riverSearchHttpConfig: {
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
      data: state => state.riverSearchState.riverSearchData.data
    })
  },
  methods: {
    fetchRivers() {
      this.firstTimePageLoad = false;
      this.$store.dispatch(
        riverSearchActions.FETCH_RIVER_SEARCH_DATA,
        this.riverSearchHttpConfig
      );
    },
    viewRiver(id) {
      this.$router.push(`/river-detail/${id}/main`);
    }
  }
};
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
