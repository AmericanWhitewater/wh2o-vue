<template>
  <div class="river-detail">
    <div class="bleed">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col">
            <header v-if="!loading && data">
              <div>
                <h4>{{ data.river }}</h4>
                <h1>{{ data.section }}</h1>
              </div>
              <div>
                <cv-interactive-tooltip>
                  <template slot="label">
                    <span class="accent-wrapper">
                      <label class="accent">
                        ID – {{ data.id }}
                      </label>
                    </span>
                  </template>
                  <template slot="content">
                    <div />
                  </template>
                </cv-interactive-tooltip>
              </div>
            </header>
            <header v-else>
              <div>
                <cv-skeleton-text />
                <cv-skeleton-text heading />
              </div>
            </header>
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
                  kind="ghost"
                  @click.exact="toggleBookmark"
                >
                  <component :is="bookmarked ? 'FavoriteFilled20' : 'Favorite20'" />
                </cv-button>
                <cv-button
                  kind="ghost"
                  @click.exact="toggleEditMode"
                >
                  <component :is="editMode ? 'EditOff20' : 'Edit20'" />
                </cv-button>
                <cv-button
                  kind="ghost"
                  @click.exact="switchTab(4)"
                  @keydown.exact="switchTab(4)"
                >
                  <component :is="notificationIcon" />
                </cv-button>
              </div>
              <cv-dropdown
                v-if="windowWidth < $options.breakpoints.lg"
                v-model="activeTabIndex"
                class="tab-dropdown"
                theme="light"
                @change="switchTab"
                @click="$emit('dropdown:open')"
              >
                <cv-dropdown-item
                  v-for="(tab, index) in $options.tabs"
                  :key="index"
                  :value="index.toString()"
                >
                  {{ tab.label }}
                </cv-dropdown-item>
              </cv-dropdown>
            </div>
            <transition-group
              v-if="windowWidth >= $options.breakpoints.lg"
              name="entranceFromTop"
              tag="ul"
            >
              <li
                v-for="(tab, index) in $options.tabs"
                :key="tab.path"
              >
                <cv-button
                  ref="tab-button"
                  :class="[index === 0 ? 'no-border-top' : '', activeTabIndex === index.toString() ? 'is-active' : '']"

                  kind="ghost"
                  @click.exact="switchTab(index)"
                  @keydown.enter="switchTab(index)"
                >
                  {{ tab.label }}
                </cv-button>
              </li>
            </transition-group>
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
import { checkWindow } from '@/app/global/mixins'
import { appLocalStorage } from '@/app/global/services'
export default {
  name: 'river-detail',
  components: {
    UtilityBlock
  },
  mixins: [checkWindow],
  data: () => ({
    bookmarked: null,
    transitionName: 'fade',
    activeTabIndex: '0'
  }),
  tabs: [
    {
      path: 'main',
      label: 'General'
    },
    {
      path: 'flow',
      label: 'Flow'
    },
    {
      path: 'map',
      label: 'Map'
    },
    {
      path: 'gallery',
      label: 'Gallery'
    },
    {
      path: 'news',
      label: 'News'
    },
    {
      path: 'accidents',
      label: 'Accidents'
    },
    {
      path: 'credits',
      label: 'Contributors'
    }
  ],
  computed: {
    ...mapState({
      data: state => state.riverDetailState.riverDetailData.data,
      error: state => state.riverDetailState.riverDetailData.error,
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
    }

  },
  methods: {
    toggleEditMode () {
      if (this.user) {
        this.$store.dispatch(globalAppActions.TOGGLE_EDIT_MODE, !this.editMode)
      } else {
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Must log in to edit',
          kind: 'error',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      }
    },
    switchTab (index) {
      this.activeTabIndex = index.toString()
      this.$router.replace(`/river-detail/${this.$route.params.id}/${this.$options.tabs[index].path}`)
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
        kind: 'success',
        contrast: false,
        action: false,
        coreAction: true
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
    this.switchTab(0)

    this.$store.dispatch(riverDetailActions.FETCH_RIVER_DETAIL_DATA, this.$route.params.id)
    this.$store.dispatch(reachGagesActions.FETCH_GAGES, this.$route.params.id)
    this.$store.dispatch(alertsActions.FETCH_ALERTS_DATA, this.$route.params.id)
    this.$store.dispatch(metricsActions.FETCH_GAGE_METRICS, this.$route.params.id)

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
  .accent-wrapper {
    position: relative;

    display: none;

    @include carbon--breakpoint('lg') {
      display: block;
    }

    .accent {
      // position: absolute;
      @include carbon--type-style('code-02');
      width:100%;
      transform: rotate(90deg);
    }
  }
  .bleed {
    background-color: $ui-02;
    header {
      padding: $spacing-sm $spacing-md;
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
          margin-bottom:$spacing-xs;
        }
        @include carbon--breakpoint("md") {
          @include carbon--type-style("productive-heading-03");
        }
      }
    }
  }
  .controls-wrapper {
    margin-top:1rem;
    @include layer('raised')
  }

  .button-toolbar {
    border-bottom: 3px solid $ui-04;
    display: flex;
    align-items: center;
    justify-content: space-between;

   @include carbon--breakpoint('lg') {
      .button-wrapper {
      display: flex;
      width:100%;
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
              border-top:0;
            }
        }
      }
    }
  }
}
</style>
