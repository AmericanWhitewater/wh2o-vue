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

                <h4 class="mb-spacing-md" v-text="reachSubtitle" />
              </div>
              <div>
                <div class="bx--row">
                  <cv-button
                    v-if="editMode"
                    id="edit-title"
                    size="small"
                    kind="secondary"
                    @click="editReachTitleModalVisible = true"
                  >
                    Edit
                  </cv-button>
                </div>
                <div class="bx--row">
                  <cv-button
                    v-if="editMode && canDelete(reach)"
                    size="small"
                    kind="danger"
                    @click.exact="deleteReachModalVisible = true"
                    @keydown.enter="deleteReachModalVisible = true"
                  >
                    Delete
                  </cv-button>
                  <cv-modal
                    ref="modalWrapper"
                    :visible="deleteReachModalVisible"
                    @modal-shown="setModalOffset"
                    @secondary-click="deleteReachModalVisible = false"
                    @modal-hidden="deleteReachModalVisible = false"
                    @primary-click="handleDelete(reach.id)"
                  >
                    <template slot="title"> Confirm Delete </template>
                    <template slot="content">
                      Are you sure you want to delete this reach?
                    </template>
                    <template slot="secondary-button"> Cancel </template>
                    <template slot="primary-button"> Submit </template>
                  </cv-modal>
                </div>

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
            <div>
              <transition :name="transitionName" mode="out-in">
                <map-banner
                  v-if="activeTabKey !== 'map' && !loading && reach"
                  :title="reach.river"
                  :subtitle="reachSubtitle"
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
            </div>
            <geometry-edit-modal
              v-if="editMode && !loading"
              :visible="editGeometryModalVisible"
              @edit:cancelled="editGeometryModalVisible = false"
            />
            <edit-revision-modal ref="editRevisionModal" />
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
                      id="edit-mode-toggle1"
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
                  id="edit-mode-toggle2"
                  :kind="editMode ? 'primary' : 'ghost'"
                  @click.exact="toggleEditMode"
                  @keydown.enter="toggleEditMode"
                >
                  <component :is="editMode ? 'EditOff20' : 'Edit20'" />
                  <span v-if="editMode" class="pl-spacing-2xs"> Editing </span>
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
              <cv-select
                v-if="windowWidth < $options.breakpoints.lg"
                v-model="activeTabKey"
                class="tab-dropdown cv-select-without-label"
                theme="light"
                label=""
                @change="switchTab"
                @click="$emit('dropdown:open')"
              >
                <cv-select-option
                  v-for="(label, path) in $options.tabs"
                  :key="path"
                  :value="path"
                >
                  {{ label }}
                </cv-select-option>
              </cv-select>
            </div>
            <ul v-if="windowWidth >= $options.breakpoints.lg">
              <li v-for="(label, path) in $options.tabs" :key="path">
                <cv-button
                  :class="[
                    path === 'main' ? 'no-border-top' : '',
                    pathIsActiveTab(path) ? 'is-active' : '',
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
                class="
                  cv-button
                  mt-spacing-md
                  mb-spacing-md
                  bx--btn bx--btn--tertiary bx--btn--sm
                "
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
import EditRevisionModal from "./components/credits-tab/components/edit-revision-modal";
import {
  checkWindow,
  shadowDomFixedHeightOffset,
  objectPermissionsHelpersMixin,
} from "@/app/global/mixins";
import { appLocalStorage } from "@/app/global/services";

export default {
  name: "river-detail",
  components: {
    UtilityBlock,
    MapBanner,
    GeometryEditModal,
    ReachTitleEditModal,
    EditRevisionModal,
  },
  mixins: [
    checkWindow,
    objectPermissionsHelpersMixin,
    shadowDomFixedHeightOffset,
  ],
  data: () => ({
    editGeometryModalVisible: false,
    editReachTitleModalVisible: false,
    deleteReachModalVisible: false,
    bookmarked: false,
    transitionName: "fade",
  }),
  tabs: {
    main: "General",
    flow: "Flow",
    map: "Map",
    reports: "Trip Reports",
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
      credits: (state) => state.RiverCredits.data,
    }),
    reachSubtitle() {
      let subtitle = "";
      subtitle += this.reach.section;
      if (this.reach.altname) {
        subtitle += ` (${this.reach.altname})`;
      }
      return subtitle;
    },
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
    // this function monitors reach revisions
    // when a new revision is made, it prompts the user to populate
    // a revision comment
    credits(newCredits, oldCredits) {
      if (
        newCredits &&
        oldCredits &&
        newCredits.length - oldCredits.length === 1
      ) {
        this.triggerEditRevision(newCredits[0]);
      }
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
    pathIsActiveTab(path) {
      return (
        path === this.activeTabKey ||
        (path === "reports" && this.activeTabKey.includes("report"))
      );
    },
    loadReachData() {
      this.$store.dispatch("RiverDetail/setRefId", this.reachId);
      this.$store.dispatch("RiverEvents/getProperty", this.reachId);
      this.$store.dispatch("RiverDetail/getProperty", this.reachId);
      this.$store.dispatch("RiverCredits/getProperty", this.reachId);
      this.$store.dispatch("RiverAlerts/getProperty", this.reachId);
      this.$store.dispatch("RiverGages/getProperty", this.reachId);
      this.$store.dispatch("RiverRapids/getProperty", this.reachId);
      this.$store.dispatch("RiverReports/getProperty", this.reachId);
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
    async handleDelete(reachId) {
      this.$store.dispatch("RiverDetail/deleteReach", reachId);
      this.deleteCommentModalVisible = false;
      this.$router.push("/river-index");
    },
    async triggerEditRevision(version) {
      const newRevisionComment = await this.$refs.editRevisionModal.show({
        version: version,
      });
      if (newRevisionComment && version) {
        await this.$store.dispatch("RiverCredits/updateProperty", {
          id: this.reachId,
          comment: newRevisionComment,
          revision: version.revision,
        });
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
  },
};
</script>
