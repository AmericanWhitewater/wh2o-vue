<template>
  <section
    :class="[{ 'bg-topo': !headerBg.url }, 'bleed river-header']"
    :style="`background-image: url(${headerBg.url})`"
  >
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col-lg-10">
          <div class="outside">
            <div class="inside">
              <template v-if="windowWidth > breakpoints.md">
                <h4>{{ name }}</h4>
                <h1>{{ section }}</h1>
              </template>
              <template v-if="windowWidth < breakpoints.md">
                <h6>{{ name }}</h6>
                <h3>{{ section }}</h3>
              </template>
              <div>
                <cv-button
                  kind="secondary"
                  size="small"
                  class="ml-spacing-sm"
                  @click.exact="toggleBookmark"
                >
                  {{ bookmarked ? 'Remove Bookmark' : 'Add Bookmark' }}
                </cv-button>
              </div>
              <edit-mode-toggle v-if="userIsAdmin" />
            </div>
          </div>
        </div>
        <div class="bx--col">
          <div
            v-show="editMode"
            class="edit-icons"
          >
            <cv-button small>
              Drag Icon
            </cv-button>
            <cv-button small>
              Upload Icon
            </cv-button>
          </div>
        </div>
      </div>
    </div>
    <cv-modal
      v-if="showConfirmation"
      kind="danger"
      :visible="showConfirmation"
    >
      <!-- <template slot="label">label</template> -->
      <template slot="title">
        Are you sure?
      </template>
      <template slot="content">
        <p>This action cannot be undone.</p>
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        OK
      </template>
    </cv-modal>
  </section>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { EditModeToggle } from '@/app/global/components'
import { defaultBannerImage, checkWindow } from '@/app/global/mixins'
import { globalAppActions } from '@/app/global/state'
import { appLocalStorage } from '@/app/global/services'
import { bookmarksActions } from '../shared/state'

export default {
  name: 'RiverHeader',
  components: {
    EditModeToggle
  },
  mixins: [defaultBannerImage, checkWindow],
  props: {
    name: {
      type: String,
      required: true,
      default: null
    },
    section: {
      type: String,
      required: true,
      default: null
    }
  },
  data: () => ({
    showConfirmation: false,
    bookmarked: false
  }),
  computed: {
    ...mapState({
      editMode: state => state.appGlobalState.appGlobalData.editMode,
      user: state => state.userState.userData.data
    }),
    ...mapGetters(['userIsAdmin']),
    reachId () {
      return parseInt(this.$route.params.id, 10)
    }

  },
  methods: {
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
    this.checkBookmarks()
  }
}
</script>
<style lang="scss" scoped>
section {
  &.river-header {
    width: 100%;
    height: 50vh;
    background-size: cover;
    background-position: center center;
    .bx--grid,
    .bx--row,
    .bx--col,
    .outside,
    .inside {
      height: 100%;
    }
    .inside {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-end;
      padding-bottom: $spacing-lg;
    }
    h1,
    h3,
    h6,
    h4 {
      background-color: #fff;
      width: fit-content;
    }
    h1,h3 {
      margin-bottom: $spacing-sm;
      padding: 11px 12px 11px 2rem;
    }
    h4,h6 {
      padding: 11px 12px 0 2rem;
    }
  }
}
.bx--grid {
  padding-left: 0;
}
</style>
