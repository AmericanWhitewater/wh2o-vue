<template>
  <section class="bx--grid river-detail">
    <transition name="fade">
      <template v-if="loading">
        <cv-loading
          active
          overlay
          small
        />
      </template>
    </transition>
    <template v-if="!loading">
      <template v-if="river">
        <river-header
          :name="river.river"
          :section="river.section"
          :background-image="bgImage"
        />
        <div class="tabs-wrapper">
          <cv-overflow-menu>
            <cv-overflow-menu-item>Link Resources</cv-overflow-menu-item>
            <cv-overflow-menu-item>Share Reach</cv-overflow-menu-item>
            <cv-overflow-menu-item @click="reachDeleteModalVisible = true">
              Remove from Index
            </cv-overflow-menu-item>
          </cv-overflow-menu>
          <cv-tabs
            aria-label="navigation tab label"
            no-default-to-first
            @tab-selected="switchTab($event)"
          >
            <cv-tab
              v-for="(tab, index) in tabs"
              :id="'tab-' + index + 1"
              :key="tab"
              no-default-to-first
              :label="tab"
            />
          </cv-tabs>
        </div>
        <router-view />
      </template>
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
            <h4>{{ river.river + ' ' + river.section }}</h4>
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
    </template>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import RiverHeader from './river-header/river-header'
import {
  actionsTypes,
  rapidsActions
} from './shared/state'

export default {
  name: 'RiverDetail',
  components: {
    'river-header': RiverHeader
  },
  data: () => ({
    reachDeleteModalVisible: false,
    reachDeleteConfirmInput: null,
    selected: true,
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
      editMode: state => state.riverDetailState.riverDetailData.mode,
      media: state => state.riverDetailState.galleryData.data
    }),
    riverId () {
      return this.$route.params.id
    },

    riverTitle () {
      if (this.river) {
        return this.river.river
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
  methods: {
    deleteReach () {
      /* eslint-disable-next-line no-console */
      console.log('perform this action')
    },
    switchTab (index) {
      /**
       * cv-tabs emits indexof tab on click, use that to push to the correct tab
       * use $router.replace to avoid making log into history
       */
      this.$router.replace(
        `/river-detail/${this.riverId}/${this.tabs[index].toLowerCase()}`
      )
    },
    /**
     * @temp
     */
    resetStores () {
      this.$store.dispatch(actionsTypes.INITIAL_STATE)
      this.$store.dispatch(rapidsActions.INITIAL_STATE)
    }
  },
  created () {
    this.$store.dispatch(actionsTypes.FETCH_RIVER_DETAIL_DATA, this.riverId)
  },
  mounted () {
    this.$store.dispatch(rapidsActions.FETCH_RAPIDS_DATA, this.riverId)
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
    next()
  }
}
</script>

<style lang="scss">
.river-detail {
  margin-bottom: $layout-xl;
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

      .bx--tabs__nav, .bx--tabs-trigger {

        width:50%;
           @include MQ(MD) {
        width: auto;
      }
      }

    }
  }
  a.bx--tabs__nav-link {
    width: 6rem;
    &:focus {
      width: 6rem;
    }
  }
  .bx--loading-overlay {
    top: $desktop-nav-height;
    height: calc(100vh - 75px);
  }
}
.bx--dropdown {
  background-color: $ui-03 !important;
}

.river-detail .tabs-wrapper .bx--tabs {
  border-bottom: 0;
}

.confirm-delete-warning-text {
  background-color: rgba($danger, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height:3rem;
}
</style>
