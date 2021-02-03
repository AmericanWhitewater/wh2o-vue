<template>
  <div class="river-detail">
    <div class="bleed">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col">
            <header v-if="loading && !reach" class="bx--tile">
              <div>
                <cv-skeleton-text />
                <cv-skeleton-text heading />
                <cv-breadcrumb-skeleton no-trailing-slash />
              </div>
            </header>
            <header v-else-if="reach" class="bx--tile">
              <div>
                <h1>
                  {{ reach.river }}
                </h1>

                <h4 class="mb-spacing-md" v-text="reach.section" />
              </div>
              <div>
                <cv-button
                  v-if="editMode"
                  id="edit-title"
                  size="small"
                  kind="secondary"
                  @click="editReachTitleModalVisible = true"
                >
                  Edit
                </cv-button>
                <reach-title-edit-modal
                  v-if="editMode && !loading"
                  :visible="editReachTitleModalVisible"
                  @edit:cancelled="editReachTitleModalVisible = false"
                />
                <div v-if="reach.photo">
                  <img
                    class="reach--photo"
                    :src="assetUrl(reach.photo.image.uri.big)"
                    @click.exact="switchTab('gallery')"
                    @keydown.exact="switchTab('gallery')"
                  >
                </div>
              </div>
            </header>
            <header v-else class="bx--tile">
              <div>
                <h4>Error</h4>
                <h1 class="mb-spacing-md">Something went wrong</h1>
              </div>
            </header>
            <utility-block
              v-if="loading && !reach"
              size="lg"
              state="loading"
              theme="dark"
              hide-text
            />
            <transition :name="transitionName" mode="out-in">
              <map-banner
                v-if="activeTabKey !== 'map' && !loading && reach"
                :title="reach.river"
                :subtitle="reach.section"
              >
                <div
                  v-if="editMode"
                  class="edit-overlay"
                  @click="editGeometryModalVisible = true"
                >
                  <h3>Edit Reach Geometry</h3>
                </div>
              </map-banner>
            </transition>
            <geometry-edit-modal
              v-if="editMode && !loading"
              :visible="editGeometryModalVisible"
              @edit:cancelled="editGeometryModalVisible = false"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bx--grid">
      <div class="bx--row">
        <aside class="bx--col-sm-4 bx--col-lg-3 bx--col-max-2">
          <div class="sticky controls-wrapper">
            <div class="button-toolbar">
              <div class="button-wrapper">
                <cv-button
                  v-if="!editMode"
                  id="bookmark-toggle"
                  kind="ghost"
                  @click.exact="toggleBookmark"
                  @keydown.enter="toggleBookmark"
                >
                  <component
                    :is="bookmarked ? 'FavoriteFilled20' : 'Favorite20'"
                  />
                </cv-button>
                <cv-interactive-tooltip v-if="!user">
                  <template #trigger>
                    <cv-button
                      id="edit-mode-toggle"
                      kind="ghost"
                      disabled
                      @click.exact="toggleEditMode"
                      @keydown.enter="toggleEditMode"
                    >
                      <edit-off-20 />
                    </cv-button>
                  </template>
                  <template #content> Must Log In to edit. </template>
                </cv-interactive-tooltip>
                <cv-button
                  v-if="user"
                  id="edit-mode-toggle"
                  :kind="editMode ? 'primary' : 'ghost'"
                  @click.exact="toggleEditMode"
                  @keydown.enter="toggleEditMode"
                >
                  <component :is="editMode ? 'EditOff20' : 'Edit20'" />
                  <span v-if="editMode" class="pl-spacing-2xs">
                    Editing
                  </span>
                </cv-button>
                <cv-button
                  v-if="!editMode"
                  kind="ghost"
                  @click.exact="switchTab('news')"
                  @keydown.exact="switchTab('news')"
                >
                  <component :is="notificationIcon" />
                </cv-button>
              </div>
              <cv-dropdown
                v-if="windowWidth < $options.breakpoints.lg"
                v-model="activeTabKey"
                class="tab-dropdown"
                theme="light"
                @change="switchTab"
                @click="$emit('dropdown:open')"
              >
                <cv-dropdown-item
                  v-for="(label, path) in $options.tabs"
                  :key="path"
                  :value="path"
                >
                  {{ label }}
                </cv-dropdown-item>
              </cv-dropdown>
            </div>
            <ul v-if="windowWidth >= $options.breakpoints.lg">
              <li v-for="(label, path) in $options.tabs" :key="path">
                <cv-button
                  :class="[
                    path === 'main' ? 'no-border-top' : '',
                    activeTabKey === path ? 'is-active' : '',
                  ]"
                  kind="ghost"
                  @click.exact="switchTab(path)"
                  @keydown.enter="switchTab(path)"
                >
                  {{ label }}
                </cv-button>
              </li>
            </ul>
            <template v-if="editMode">
              <div style="width: 100%; border-top: 1px solid #ccc" />
              <a
                class="cv-button mt-spacing-md mb-spacing-md bx--btn bx--btn--tertiary bx--btn--sm"
                :href="
                  formatLinkUrl(
                    `/content/Linker/edit/source/river/id/${reachId}/`
                  )
                "
                target="_blank"
                >Open Linker</a
              >
            </template>
          </div>
        </aside>
        <main
          class="bx--col-sm-4 bx--col-lg-13 bx--col-max-13 bx--offset-max-1"
        >
          <transition :name="transitionName" mode="out-in">
            <keep-alive exclude="beta-box-edit-modal,geometry-edit-modal">
              <router-view />
            </keep-alive>
          </transition>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block.vue";
import {
  MapBanner,
  ReachTitleEditModal,
  GeometryEditModal,
} from "./components";
import { checkWindow } from "@/app/global/mixins";
import { appLocalStorage } from "@/app/global/services";

export default {
  name: "river-detail",
  components: {
    UtilityBlock,
    MapBanner,
    GeometryEditModal,
    ReachTitleEditModal,
  },
  mixins: [checkWindow],
  data: () => ({
    editGeometryModalVisible: false,
    editReachTitleModalVisible: false,
    bookmarked: false,
    transitionName: "fade",
  }),
  tabs: {
    main: "General",
    flow: "Flow",
    map: "Map",
    gallery: "Gallery",
    news: "News",
    accidents: "Accidents",
    credits: "Contributors",
  },
  computed: {
    ...mapState({
      reach: (state) => state.RiverDetail.data,
      loading: (state) => state.RiverDetail.loading,
      alerts: (state) => state.RiverAlerts.data,
      editMode: (state) => state.Global.editMode,
      user: (state) => state.User.data,
    }),
    reachId() {
      return this.$route.params.id;
    },
    notificationIcon() {
      if (this.alerts && this.alerts.length) {
        return "NotificationNew20";
      }
      return "Notification20";
    },
    activeTabKey() {
      if (this.$route.name) {
        return this.$route.name.replace("-tab", "");
      }
      return "";
    },
  },
  watch: {
    reachId() {
      this.loadReachData();
    },
  },
  methods: {
    toggleBookmark() {
      let bookmarks = appLocalStorage.getItem("wh2o-river-bookmarks");

      if (bookmarks && bookmarks.length) {
        const index = bookmarks.indexOf(Number(this.$route.params.id));
        if (index === -1) {
          this.bookmarked = true;
          appLocalStorage.setItem("wh2o-river-bookmarks", [
            ...bookmarks,
            Number(this.$route.params.id),
          ]);
        } else {
          this.bookmarked = false;
          bookmarks.splice(index, 1);
          appLocalStorage.setItem("wh2o-river-bookmarks", bookmarks);
        }
      } else {
        this.bookmarked = true;
        appLocalStorage.setItem("wh2o-river-bookmarks", [
          Number(this.$route.params.id),
        ]);
      }
    },
     loadReachData() {
      this.$store.dispatch("RiverDetail/setRefId", this.reachId);
      this.$store.dispatch('RiverEvents/getProperty', this.reachId)
      this.$store.dispatch("RiverDetail/getProperty", this.reachId);
      this.$store.dispatch("RiverAlerts/getProperty", this.reachId);
      this.$store.dispatch("RiverGages/getProperty", this.reachId);
      this.$store.dispatch("RiverRapids/getProperty", this.reachId);
      this.$store.dispatch("GageMetrics/getProperty", this.reachId);
    },
    toggleEditMode() {
      if (this.user) {
        this.$store.dispatch("Global/toggleEditMode", !this.editMode);
      } else {
        this.$store.dispatch("Global/sendToast", {
          title: "Must log in to edit",
          kind: "error",
        });
      }
    },
    switchTab(key) {
      if (key !== this.activeTabKey) {
        const path = `/river-detail/${this.$route.params.id}/${key}`;
        if (this.$route.path !== path) {
          this.$router.replace(path);
        }
      }
    },
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;
      if (transitionName === "slide") {
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
        transitionName = toDepth < fromDepth ? "slide-left" : "slide-right";
      }

      this.transitionName = transitionName || "fade";

      next();
    });
  },
  mounted() {
    this.loadReachData();

    let bookmarks = appLocalStorage.getItem("wh2o-river-bookmarks");

    if (bookmarks && bookmarks.includes(Number(this.$route.params.id))) {
      this.bookmarked = true;
    }
  }
};
</script>
