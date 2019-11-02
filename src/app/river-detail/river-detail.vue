<template>
  <section class="bx--grid river-detail">
    <transition name="fade">
      <template v-if="loading">
        <cv-loading active overlay small></cv-loading>
      </template>
    </transition>
    <template v-if="!loading">
      <div class="bx--row breadcrumb-container">
        <div class="bx--col">
          <div class="outside">
            <div class="inside">
              <cv-breadcrumb aria-label="breadcrumb" no-trailing-slash>
                <cv-breadcrumb-item>
                  <cv-link to="/nwi-map">NWI Map</cv-link>
                </cv-breadcrumb-item>
                <cv-breadcrumb-item>
                  <cv-link href="#" aria-current="page">Reach Id: {{ this.$route.params.id }}</cv-link>
                </cv-breadcrumb-item>
              </cv-breadcrumb>
              <cv-tag kind="blue" label="Banner needs editing" :disabled="false"></cv-tag>
            </div>
          </div>
        </div>
      </div>
      <template v-if="river">
        <river-header :name="river.river" :section="river.section" />
        <div class="tabs-wrapper">
          <cv-overflow-menu>
            <cv-overflow-menu-item>Link Resources</cv-overflow-menu-item>
            <cv-overflow-menu-item>Share Reach</cv-overflow-menu-item>
            <cv-overflow-menu-item danger>Remove from Index</cv-overflow-menu-item>
          </cv-overflow-menu>
          <cv-tabs @tab-selected="switchTab($event)" aria-label="navigation tab label">
            <cv-tab
              no-default-to-first
              :id="'tab-' + index + 1"
              :label="tab"
              v-for="(tab, index) in tabs"
              :key="tab"
            ></cv-tab>
          </cv-tabs>
        </div>
        <!-- <transition name="fade"> -->
        <router-view />
        <!-- </transition> -->
      </template>
    </template>
  </section>
</template>
<script>
import RiverHeader from "./river-header/river-header";
import {
  actionsTypes,
  weatherActions,
  rapidsActions,
  galleryActions
} from "./shared/state";
export default {
  name: "RiverDetail",
  components: {
    "river-header": RiverHeader
  },
  data: () => {
    return {
      selected: true,
      prevRoute: null,
      tabs: [
        "Main",
        "Flow",
        "Weather",
        "Map",
        "Gallery",
        "News",
        "Accidents",
        "Credits"
      ]
    };
  },
  computed: {
    riverId() {
      return this.$route.params.id;
    },
    river() {
      return this.$store.state.riverDetailState.riverDetailData.data;
    },
    loading() {
      return this.$store.state.riverDetailState.riverDetailData.loading;
    },
    editMode() {
      return this.$store.state.riverDetailState.riverDetailData.mode;
    }
  },
  methods: {
    switchTab(eventName) {
      // cv-tabs emits an event on click, use that to push to new router view
      switch (eventName) {
        case 0:
          this.$router.push(`/river-detail/${this.riverId}/main`);
          break;
        case 1:
          this.$router.push(`/river-detail/${this.riverId}/flow`);
          break;
        case 2:
          this.$router.push(`/river-detail/${this.riverId}/weather`);
          break;
        case 3:
          this.$router.push(`/river-detail/${this.riverId}/map`);
          break;
        case 4:
          this.$router.push(`/river-detail/${this.riverId}/gallery`);
          break;
        case 5:
          this.$router.push(`/river-detail/${this.riverId}/news`);
          break;
        case 6:
          this.$router.push(`/river-detail/${this.riverId}/accidents`);
          break;
        case 7:
          this.$router.push(`/river-detail/${this.riverId}/credits`);
          break;
      }
    }
  },
  created() {
    this.$store.dispatch(actionsTypes.FETCH_RIVER_DETAIL_DATA, this.riverId);
    // this.loadTab(this.$route.name);
  },
  mounted() {
    this.$store.dispatch(rapidsActions.FETCH_RAPIDS_DATA, this.riverId);
  },
  beforeRouteLeave(to, from, next) {
    if (this.editMode) {
      alert("you're leaving in edit mode!!!!");
      this.$store.dispatch(actionsTypes.SET_EDIT_MODE, false);
    }
    this.$store.dispatch(weatherActions.RESET_WEATHER_DATA);
    this.$store.dispatch(galleryActions.RESET_GALLERY_DATA);
    next();
  }
};
</script>

<style lang="scss">
.river-detail {
  padding-bottom: $layout-lg;
  .tabs-wrapper {
    background-color: $ui-03;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cv-tabs {
      width: 100%;
    }
    .bx--tabs {
      display: flex;
      justify-content: flex-end;
      text-align: center;
      border-bottom: 3px solid $ui-03;
      width: auto;
    }
  }
  a.bx--tabs__nav-link {
    width: 6rem;
    &:focus {
      width: 6rem;
    }
  }
  .breadcrumb-container {
    padding: $spacing-sm 0;
    .inside {
      display: flex;
      justify-content: space-between;
    }
  }
  .bx--loading-overlay {
    top: $desktop-nav-height;
    height: calc(100vh - 75px);
  }
}
.fade-enter-active {
  @include ease;
}
.fade-leave-active {
  @include ease(0.4s);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
