<template>
  <div class="river-detail">
    <div class="bleed">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col">
            <header
              v-if="loading"
              class="bx--tile"
            >
              <div>
                <cv-skeleton-text />
                <cv-skeleton-text heading />
                <cv-breadcrumb-skeleton no-trailing-slash />
              </div>
            </header>
            <header
              v-else-if="data"
              class="bx--tile"
            >
              <div>
                <h4 v-text="data.river" />
                <h1
                  class="mb-spacing-md"
                  v-text="data.section"
                />
                <cv-breadcrumb no-trailing-slash>
                  <cv-breadcrumb-item>
                    <cv-link to="/river-index">
                      River Index
                    </cv-link>
                  </cv-breadcrumb-item>
                  <cv-breadcrumb-item>
                    <cv-link href="#0">
                      River Id: {{ data.id }}
                    </cv-link>
                  </cv-breadcrumb-item>
                </cv-breadcrumb>
              </div>
              <div v-if="data.photo">
                <img
                  class="reach--photo"
                  :src="`https://americanwhitewater.org/${data.photo.image.uri.big}`"
                  @click.exact="switchTab('gallery')"
                  @keydown.exact="switchTab('gallery')"
                >
              </div>
            </header>
            <utility-block
              v-if="loading"
              height="400"
              state="loading"
              theme="dark"
              hide-text
            />
            <transition
              :name="transitionName"
              mode="out-in"
            >
              <page-banner
                v-if="activeTabKey !== 'map' && !loading && data"
                :title="data.river"
                :subtitle="data.section"
                :geom="data.geom"
                :reach-id="$route.params.id"
                map
              >
                <div
                  v-if="editMode"
                  class="edit-overlay"
                  @click="editGeometryModalVisible = true"
                >
                  <h3>Edit Reach Geometry</h3>
                </div>
              </page-banner>
            </transition>
            <geometry-edit-modal
              v-if="editMode"
              :visible="editGeometryModalVisible"
              @edit:cancelled="editGeometryModalVisible=false"
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
                  id="bookmark-toggle"
                  kind="ghost"
                  @click.exact="toggleBookmark"
                  @keydown.enter="toggleBookmark"
                >
                  <component
                    :is="bookmarked ? 'FavoriteFilled20' : 'Favorite20'"
                  />
                </cv-button>
                <cv-button
                  id="edit-mode-toggle"
                  kind="ghost"
                  @click.exact="toggleEditMode"
                  @keydown.enter="toggleEditMode"
                >
                  <component :is="editMode ? 'EditOff20' : 'Edit20'" />
                </cv-button>
                <cv-button
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
            <ul
              v-if="windowWidth >= $options.breakpoints.lg"
            >
              <li
                v-for="(label, path) in $options.tabs"
                :key="path"
              >
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
          </div>
        </aside>
        <main
          class="bx--col-sm-4 bx--col-lg-13 bx--col-max-13 bx--offset-max-1"
        >
          <transition
            :name="transitionName"
            mode="out-in"
          >
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { riverDetailActions, alertsActions, bookmarksActions, reachGagesActions, metricsActions } from './shared/state'
import { globalAppActions } from '@/app/global/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block.vue'
import PageBanner from '@/app/global/components/page-banner/page-banner'
import GeometryEditModal from './shared/components/geometry-edit-modal/geometry-edit-modal'
import { checkWindow } from '@/app/global/mixins'
import { appLocalStorage } from '@/app/global/services'
export default {
  name: 'river-detail',
  components: {
    UtilityBlock,
    PageBanner,
    GeometryEditModal
  },
  mixins: [checkWindow],
  data: () => ({
    editGeometryModalVisible: false,
    bookmarked: false,
    transitionName: 'fade'
  }),
  tabs: {
    main: 'General',
    flow: 'Flow',
    map: 'Map',
    gallery: 'Gallery',
    news: 'News',
    accidents: 'Accidents',
    credits: 'Contributors'
  },
  computed: {
    ...mapState({
      data: state => state.riverDetailState.riverDetailData.data,
      loading: state => state.riverDetailState.riverDetailData.loading,
      alerts: state => state.riverDetailState.alertsData.data,
      editMode: state => state.appGlobalState.appGlobalData.editMode,
      user: state => state.userState.userData.data
    }),
    reachId () {
      return this.$route.params.id
    },
    notificationIcon () {
      if (this.alerts && this.alerts.length) {
        return 'NotificationNew20'
      }
      return 'Notification20'
    },
    activeTabKey () {
      if (this.$route.name) {
        return this.$route.name.replace('-tab', '')
      }
      return ''
    }
  },
  watch: {
    reachId (newId) {
      this.loadReachData()
    }
  },
  methods: {
    loadReachData () {
      this.$store.dispatch(riverDetailActions.FETCH_RIVER_DETAIL_DATA, this.reachId)
      this.$store.dispatch(reachGagesActions.FETCH_GAGES, this.reachId)
      this.$store.dispatch(alertsActions.FETCH_ALERTS_DATA, this.reachId)
      this.$store.dispatch(metricsActions.FETCH_GAGE_METRICS, this.reachId)
    },
    toggleEditMode () {
      if (this.user) {
        this.$store.dispatch(globalAppActions.TOGGLE_EDIT_MODE, !this.editMode)
      } else {
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Must log in to edit',
          kind: 'error'
        })
      }
    },
    switchTab (key) {
      if (key !== this.activeTabKey) {
        const path = `/river-detail/${this.$route.params.id}/${key}`
        if (this.$route.path !== path) {
          this.$router.replace(path)
        }
      }
    },
    toggleBookmark () {
      if (!this.bookmarked) {
        this.$store.dispatch(bookmarksActions.ADD_BOOKMARK, this.reachId)
        this.bookmarked = true
      } else {
        this.$store.dispatch(bookmarksActions.REMOVE_BOOKMARK, this.reachId)
        this.bookmarked = false
      }
      this.$store.dispatch(globalAppActions.SEND_TOAST, {
        title: this.bookmarked ? 'Bookmark Added' : 'Bookmark Removed',
        kind: 'success'
      })
    },
    checkBookmarks () {
      const bookmarks = appLocalStorage.getItem('wh2o-bookmarked-rivers')
      if (bookmarks) {
        const data = bookmarks.find(b => b === this.reachId)
        if (data) {
          this.bookmarked = true
        }
      } else {
        this.bookmarked = false
      }
    }
  },
  created () {
    this.loadReachData()
    this.checkBookmarks()
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName
      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right'
      }

      this.transitionName = transitionName || 'fade'

      next()
    })
  }
}
</script>
<style lang="scss">
.river-detail {
  .reach--photo {
    height: 100px;
    width: 100px;
    object-fit: cover;
    object-position: center;
    cursor: pointer;
  }

  .accent-wrapper {
    position: relative;
    display: none;

    @include carbon--breakpoint("lg") {
      display: block;
    }

    .accent {
      @include carbon--type-style("code-02");
      width: 100%;
      transform: rotate(90deg);
    }
  }
  .bleed {
    header {
      padding: $spacing-lg;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        @include carbon--breakpoint("sm") {
          @include carbon--type-style("productive-heading-03");
        }
        @include carbon--breakpoint("md") {
          @include carbon--type-style("productive-heading-04");
        }
      }
      h4 {
        @include carbon--breakpoint("sm") {
          @include carbon--type-style("productive-heading-02");
          margin-bottom: $spacing-xs;
        }
        @include carbon--breakpoint("md") {
          @include carbon--type-style("productive-heading-03");
        }
      }
    }
  }
  .controls-wrapper {
    margin-top: 1rem;
    @include layer("raised");
  }

  .button-toolbar {
    border-bottom: 3px solid $ui-04;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include carbon--breakpoint("lg") {
      .button-wrapper {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        .bx--btn {
          flex-grow: 1;
          justify-content: center;
        }
      }
    }
    .bx--form-item {
      max-width: 139px;
      .bx--dropdown {
        border-bottom: 0;
      }
    }
  }
  aside {
    .bx--toolbar {
      margin: 0;
    }
    ul {
      li {
        .bx--btn--ghost {
          width: 100%;

          &.is-active {
            border-color: $brand-01;
            box-shadow: inset 4px 0 0 0 #537653;
          }
          &.no-border-top {
            border-top: 0;
          }
        }
      }
    }
  }
}
</style>
