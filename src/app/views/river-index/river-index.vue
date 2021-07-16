<template>
  <div id="national-map-app">
    <div class="bx--grid">
      <div id="fullscreen-target" class="bx--row">
        <div class="bx--col-sm-16 bx--col-lg-10">
          <nwi-map
            :external-loading="loading"
            :feature-to-center="featureToCenter"
            :has-controls="false"
            :source-layers="sourceLayers"
            center-on-user-location
            id-for-full-screen="national-map-app"
            :include-legend="showLegend"
            map-container-id="nwi-map-index"
            @centeredFeature="centerFeature"
            @changeReachesInViewport="changeReachesInViewport"
            @clickFeature="clickFeature"
          />
          <div
            v-if="windowWidth < $options.breakpoints.lg"
            class="map-scroll-indicator bx--none"
            @click="scrollToMapTable"
          >
            <cv-button :icon="caretIconSVG" small> See table </cv-button>
          </div>
        </div>
        <div ref="mapTable" class="bx--col-sm-16 bx--col-lg-6">
          <nwi-map-search />
          <template v-if="loading">
            <utility-block state="loading" />
          </template>
          <template v-else>
            <nwi-rivers-table
              :reaches-on-map="reachesInViewport"
              @centerReach="centerFeature"
            />
          </template>
        </div>
      </div>
      <div class="bx--row mb-md mt-md">
        <div class="bx--col-sm-12 bx--col-lg-5 mb-spacing-lg">
          <h2 class="mb-spacing-sm">Stream Team</h2>
          <p class="mb-spacing-md">
            Adopt a river and help keep American Whitewater river information up
            to date.
          </p>
          <a
            class="bx--btn bx--btn--secondary"
            href="/content/StreamTeam/info/?"
            >Learn More</a
          >
        </div>
        <div class="bx--col-sm-12 bx--col-lg-5 mb-spacing-lg">
          <h2 class="mb-spacing-sm">Permit Information</h2>
          <p class="mb-spacing-md">
            See an extensive listing of all US rivers which require permits to
            access, and application details.
          </p>
          <a
            class="bx--btn bx--btn--secondary"
            href="/content/River/list-permits/?"
            >View Permits</a
          >
        </div>
        <div class="bx--col-sm-12 bx--col-lg-5">
          <h2 class="mb-spacing-sm">Release Information</h2>
          <p class="mb-spacing-md">
            Find out the dam release schedules and planned flow rates for your
            favorite runs.
          </p>
          <a class="bx--btn bx--btn--secondary" href="/content/Release/view/?"
            >View Calendar</a
          >
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <nwi-state-list />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  NwiRiversTable,
  NwiMap,
  NwiMapSearch,
  NwiStateList,
} from "./components";
import { mapState } from "vuex";
import { checkWindow } from "@/app/global/mixins";

import UtilityBlock from "@/app/global/components/utility-block/utility-block.vue";

export default {
  name: "river-index",
  components: {
    NwiMap,
    NwiRiversTable,
    UtilityBlock,
    NwiMapSearch,
    NwiStateList,
  },
  mixins: [checkWindow],
  props: {
    showRiversTable: {
      type: Boolean,
      default: true,
      required: false,
    },
    showControls: {
      type: Boolean,
      default: true,
      required: false,
    },
    showLegend: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data: () => ({
    river: null,
    featureToCenter: null,
    loading: false,
    sourceLayers: [
      "reach-segments",
      "reach-segment-labels",
      "reaches-without-geom",
      "projects",
    ],
    caretIconSVG: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
    </svg>`,
  }),
  computed: {
    ...mapState({
      reachesInViewport: (state) => state.RiverIndex.data,
      error: (state) => state.RiverIndex.error,
    }),
  },
  methods: {
    changeReachesInViewport(newReaches) {
      this.$store.dispatch("RiverIndex/loadReaches", newReaches);
    },
    centerFeature(feature) {
      this.featureToCenter = feature;
    },
    clickFeature(feature) {
      if (
        [
          "reach-segments",
          "reach-segment-labels",
          "reaches-without-geom",
        ].indexOf(feature.sourceLayer) !== -1
      ) {
        if (this.$route.name === "river-index") {
          this.$router.push(`/river-detail/${feature.properties.id}/main`);
        }
      } else if (feature.sourceLayer === "projects") {
        if (this.$route.name === "river-index") {
          this.$router.push(`/project-detail/${feature.properties.id}`);
        }
      }
    },
    scrollToMapTable() {
      this.$refs.mapTable.scrollIntoViewIfNeeded();
    },
  },
};
</script>

<style lang="scss" scoped>
#national-map-app {
  height: 100%;
  width: 100%;
  position: relative;
}
#fullscreen-target {
  background-color: #fff;
}
div.map-scroll-indicator {
  display: block;
  width: 100%;
  background: rgba(109, 143, 109, 0.5);
  position: relative;
  bottom: 6rem;
  text-align: center;
  color: white;
}
</style>
