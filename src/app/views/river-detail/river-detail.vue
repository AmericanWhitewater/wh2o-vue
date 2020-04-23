<template>
  <div class="river-detail">
    <div class="bleed">
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col">
            <header v-if="!loading && data">
              <h4>{{ data.river }}</h4>
              <h1>{{ data.section }}</h1>
            </header>
            <header v-else>
              <h4>loading</h4>
            </header>
          </div>
        </div>
      </div>
    </div>
    <div class="bx--grid">
      <div class="bx--row">
        <aside class="bx--col-sm-4 bx--col-lg-2 bx--col-max-2">
          <div class="sticky">
            <div class="button-toolbar">
              <cv-button kind="ghost">
                <component :is="notificationIcon" />
              </cv-button>
              <cv-button kind="ghost">
                <Favorite20 />
              </cv-button>
            </div>
            <transition-group
              name="entranceFromTop"
              tag="ul"
            >
              <li
                v-for="(tab, index) in tabs"
                :key="tab.path"
              >
                <cv-button
                  ref="tab-button"
                  :class="activeTabIndex === index ? 'is-active': ''"
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
        <main class="bx--col-sm-4 bx--col-lg-14 bx--col-max-13 bx--offset-max-1">
          <transition
            :name="transitionName"
            mode="out-in"
          >
            <router-view />
          </transition>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { riverDetailActions, alertsActions } from './shared/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block.vue'
export default {
  name: 'river-detail',
  components: {
    UtilityBlock
  },
  data: () => ({
    transitionName: 'fade',
    activeTabIndex: 0,
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
    ]
  }),
  computed: {
    ...mapState({
      data: state => state.riverDetailState.riverDetailData.data,
      error: state => state.riverDetailState.riverDetailData.error,
      loading: state => state.riverDetailState.riverDetailData.loading,
      alerts: state => state.riverDetailState
    }),
    riverId () {
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
    switchTab (index) {
      this.activeTabIndex = index
      this.$router.replace(`/river-detail/${this.riverId}/${this.tabs[index].path}`).catch(() => {})
    }
  },
  created () {
    this.$store.dispatch(riverDetailActions.FETCH_RIVER_DETAIL_DATA, this.riverId)
    this.$store.dispatch(alertsActions.FETCH_ALERTS_DATA, this.$route.params.id)

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
  // mounted() {
  //   console.log('this.$refs :', this.$refs);
  // }
}
</script>
<style lang="scss">
.river-detail {
  .bleed {
    background-color: $ui-02;
    header {
      padding: $spacing-md 0;
    }
  }

  .button-toolbar {
    border-bottom: 3px solid $ui-04;
  }
  aside {
    .bx--toolbar {
      margin:0;
    }
    ul {
      li {
        .bx--btn--ghost {
          width: 100%;

          &.is-active {
              border-color:$brand-01;
              box-shadow: inset 0 0 0 2px #537653, inset 0 0 0 3px #f4f7fb;
          }

        }
      }
    }
  }
}
</style>
