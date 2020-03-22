<template>
  <section class="bx--grid river-detail">
    <transition
      name="fade"
      mode="out-in"
    >
      <error-block
        v-if="error && !loading"
        title="River Detail Unavailable"
        text="Sorry for the inconvenience, our team has been notified."
      />
    </transition>
    <transition
      name="fade"
      mode="out-in"
    >
      <cv-loading
        v-if="loading && !error"
        small
        overlay
      />
    </transition>
    <template v-if="!loading && river">
      <river-header
        :name="river.river"
        :section="river.section"
        :background-image="bgImage"
      />
      <div class="tabs-wrapper">
        <cv-overflow-menu>
          <cv-overflow-menu-item v-if="userIsAdmin">
            Link Resources
          </cv-overflow-menu-item>
          <cv-overflow-menu-item @click.exact="reachShareModalVisible = true">
            Share Reach
          </cv-overflow-menu-item>
          <cv-overflow-menu-item
            v-if="userIsAdmin"
            @click.exact="reachDeleteModalVisible = true"
          >
            Remove from Index
          </cv-overflow-menu-item>
        </cv-overflow-menu>
        <cv-tabs
          aria-label="navigation tab label"
          :no-default-to-first="windowWidth > breakpoints.md"
          @tab-selected="switchTab($event)"
        >
          <cv-tab
            v-for="(tab, index) in tabs"
            :id="'tab-' + index + 1"
            :key="tab"
            :label="tab"
          />
        </cv-tabs>
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>
      <cv-modal
        :visible="reachDeleteModalVisible"
        kind="danger"
        size="small"
        :primary-button-disabled="deleteReachPrimaryButtonDisabled"
        auto-hide-off
        @modal-hidden="reachDeleteConfirmInput = null"
        @primary-click="deleteReach"
        @secondary-click="reachDeleteModalVisible = false"
        @modal-hide-request="reachDeleteModalVisible = false"
      >
        <template slot="title">
          Confirm Delete
        </template>
        <template slot="content">
          <p class="mb-sm">
            Deleting {{ river.river + river.section }} will permanently remove
            the reach from the river index. This cannot be undone.
          </p>
          <div class="confirm-delete-warning-text mb-sm">
            <h4>{{ river.river + " " + river.section }}</h4>
          </div>
          <cv-text-input
            v-model="reachDeleteConfirmInput"
            theme="light"
            label="Type reach name and section to confirm"
          />
        </template>
        <template slot="secondary-button">
          Cancel
        </template>
        <template slot="primary-button">
          Delete
        </template>
      </cv-modal>
      <cv-modal
        :visible="reachShareModalVisible"
        size="small"
        auto-hide-off
        @modal-hidden="reachShareModalVisible = false"
        @primary-click="reachShareModalVisible = false"
        @secondary-click="reachShareModalVisible = false"
        @modal-hide-request="reachShareModalVisible = false"
      >
        <template slot="title">
          Share
        </template>
        <template slot="content">
          <social-sharing
            :url="shareMeta.url"
            :title="shareMeta.title"
            :description="shareMeta.description"
            :quote="shareMeta.quote"
            :hashtags="shareMeta.hashtags"
            twitter-user="AmerWhitewater"
            inline-template
          >
            <div>
              <network network="facebook">
                <cv-button
                  kind="tertiary"
                  class="mb-spacing-md mr-spacing-sm"
                >
                  Facebook
                </cv-button>
              </network>
              <network network="twitter">
                <cv-button
                  kind="tertiary"
                  class="mb-spacing-md mr-spacing-sm"
                >
                  Twitter
                </cv-button>
              </network>
              <network network="linkedin">
                <cv-button
                  kind="tertiary"
                  class="mb-spacing-md mr-spacing-sm"
                >
                  LinkedIn
                </cv-button>
              </network>
              <network network="email">
                <cv-button
                  kind="tertiary"
                  class="mb-spacing-md mr-spacing-sm"
                >
                  Email
                </cv-button>
              </network>
            </div>
          </social-sharing>
        </template>
        <template slot="primary-button">
          Close
        </template>
      </cv-modal>
    </template>
  </section>
</template>
<script>
/**
 * @todo each river detail component should be responsible for handling
 * loading state. Then we can use skeleton text/elements
 *
 */
import { mapState, mapGetters } from 'vuex'
import RiverHeader from './river-header/river-header'
import { actionsTypes, reachGagesActions } from './shared/state'
import { ErrorBlock } from '@/app/global/components'
import { checkWindow } from '@/app/global/mixins'

export default {
  name: 'river-detail',
  components: {
    'river-header': RiverHeader,
    ErrorBlock
  },
  mixins: [checkWindow],
  metaInfo () {
    return {
      title: this.riverTitle,
      titleTemplate: '%s | American Whitewater'
    }
  },
  data: () => ({
    reachShareModalVisible: false,
    reachDeleteModalVisible: false,
    reachDeleteConfirmInput: null,
    selected: 'main',
    prevRoute: null,
    tabs: [
      'Main',
      'Flow',
      'Weather',
      'Map',
      'Gallery',
      'News',
      'Accidents',
      'Credits'
    ]
  }),
  computed: {
    ...mapState({
      river: state => state.riverDetailState.riverDetailData.data,
      loading: state => state.riverDetailState.riverDetailData.loading,
      error: state => state.riverDetailState.riverDetailData.error,
      editMode: state => state.riverDetailState.riverDetailData.mode,
      media: state => state.riverDetailState.galleryData.data
    }),
    ...mapGetters(['userIsAdmin']),
    shareMeta () {
      if (this.river) {
        const description = this.formatShareDescription(this.river.description)
        const url = `https://wh2o-vue.herokuapp.com/#/river-detail/${this.river.id}`
        const title = this.river.river
        /**
         * @temp until we can get quote + hashtag wired to db
         */
        const quote = description
        const hashtags = 'whitewater,river,conservation'
        return {
          title,
          url,
          description,
          quote,
          hashtags
        }
      }
      return null
    },
    riverId () {
      return this.$route.params.id
    },
    riverTitle () {
      if (this.river) {
        return this.river.river
      }
      if (this.loading) {
        return 'Loading...'
      }

      if (this.error) {
        return 'Error'
      }
      return null
    },
    bgImage () {
      // if (this.media) {
      //   const img = this.media[Math.floor(Math.random() * this.media.length)]
      //   return `https://prerelease.americanwhitewater.org${img.url}`
      // }
      return null
    },
    deleteConfirmInput01 () {
      if (this.river) {
        const input = this.river.river + ' ' + this.river.section
        return input.replace(/\s+/g, '-').toLowerCase()
      }

      return null
    },
    deleteConfirmInput02 () {
      if (this.reachDeleteConfirmInput) {
        return this.reachDeleteConfirmInput.replace(/\s+/g, '-').toLowerCase()
      }

      return null
    },

    deleteReachPrimaryButtonDisabled () {
      if (this.deleteConfirmInput01 === this.deleteConfirmInput02) {
        return false
      }
      return true
    }
  },
  watch: {
    river (data) {
      if (data) {
        const riverDescription = this.$sanitize(data.description, {
          allowedTags: [],
          allowedAttributes: {}
        })

        document
          .getElementById('meta-description')
          .setAttribute('content', riverDescription.slice(0, 150))
      }
    }
  },
  methods: {
    /**
     * remove html from article abstract
     */
    formatShareDescription (description) {
      if (description) {
        const shareDescription = this.$sanitize(description, {
          allowedTags: [],
          allowedAttributes: {}
        })

        return shareDescription.slice(0, 150) + '...'
      }
      return 'Check this out on American Whitewater.'
    },
    deleteReach () {
      /* eslint-disable-next-line no-console */
      console.log('perform this action')
    },
    switchTab (index) {
      /**
       * cv-tabs emits indexof tab on click, use that to push to the correct tab
       * use $router.replace to avoid making log into history
       */
      if (this.riverId) {
        this.$router
          .replace(
            `/river-detail/${this.riverId}/${this.tabs[index].toLowerCase()}`
          )
          .catch(() => {})
      }
    },
    /**
     * @temp
     */
    resetStores () {
      this.$store.dispatch(actionsTypes.INITIAL_STATE)
    }
  },
  created () {
    this.$store.dispatch(actionsTypes.FETCH_RIVER_DETAIL_DATA, this.riverId)
    this.$store.dispatch(reachGagesActions.FETCH_GAGES, this.riverId)
  },
  beforeRouteLeave (to, from, next) {
    if (this.editMode) {
      // use as a check for unsaved changes
      confirm("you're leaving in edit mode!!!!").then(val => {
        if (val) {
          next()
        } else {
          next(false)
        }
      })
      this.$store.dispatch(actionsTypes.SET_EDIT_MODE, false)
    }
    document
      .getElementById('meta-description')
      .setAttribute('content', 'default description')
    next()
  }
}
</script>

<style lang="scss">
.river-detail {
  margin-bottom: $layout-xl;
  .tabs-wrapper {
    background-color: $ui-02;
    border-bottom: 1px solid #8897a2;
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

      .bx--tabs__nav,
      .bx--tabs-trigger {
        box-shadow: none;
        border-bottom: 1px solid transparent;
        width: auto;
        @include carbon--breakpoint("md") {
          width: auto;
          box-shadow: none;
        }
        &:focus {
          outline-offset: 0;
        }
      }
    }
  }
  a.bx--tabs__nav-link {
    width: 6rem;
    &:focus {
      width: 6rem;
    }
    @media (min-width: 42rem) {
      border-bottom: 0;
    }
  }
  .bx--tabs-trigger-text {
    margin-right: 1rem;
  }
}

.river-detail .tabs-wrapper .bx--tabs {
  border-bottom: 0;
}

.confirm-delete-warning-text {
  background-color: rgba($danger, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 3rem;
}
</style>
