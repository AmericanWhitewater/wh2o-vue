<template>
  <div class="bx--grid">
    <section
      :class="[{ 'has-bg': bgImg }, 'bleed river-header bg-topo']"
      :style="bgImg ? `background-image:url(${bgImg.url})` : ''"
    >
      <div class="bx--grid bx--no-gutter">
        <div class="bx--row">
          <div class="bx--col-sm-12 bx--col-md-15 bx--col-lg-15 info-section">
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
                  <edit-mode-toggle class="mb-spacing-sm" />

                  <cv-button
                    v-if="!editMode"
                    kind="secondary"
                    size="small"
                    class="ml-spacing-sm"
                    @click.exact="toggleBookmark"
                  >
                    {{ bookmarked ? "Remove Bookmark" : "Add Bookmark" }}
                  </cv-button>
                </div>
              </div>
            </div>
          </div>
          <div
            :class="[
              { edit: editMode },
              'bx--col-sm-12 bx--col-md-1 bx--col-lg-1 edit-section'
            ]"
          >
            <div class="outside">
              <div class="inside">
                <div :class="[{ edit: editMode }, 'edit-actions-wrapper']">
                  <cv-interactive-tooltip
                    v-if="!editMode && bgImg"
                    alignment="center"
                    direction="left"
                  >
                    <template slot="trigger">
                      <div class="icon">
                        <CameraAction24 />
                      </div>
                    </template>
                    <template slot="content">
                      <div class>
                        <h6>Photo</h6>
                        <p>{{ bgImg.credit }}</p>
                      </div>
                    </template>
                  </cv-interactive-tooltip>

                  <template v-if="editMode">
                    <div
                      class="icon mb-spacing-sm edit"
                      @click.exact="uploadModalVisible = true"
                      @keydown.enter="uploadModalVisible = true"
                    >
                      <Upload24 />
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <media-upload-modal
        :visible="uploadModalVisible"
        section="REACH"
        @secondary-click="uploadModalVisible = false"
        @modal-hidden="uploadModalVisible = false"
      />
    </section>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { checkWindow } from '@/app/global/mixins'
import { globalAppActions } from '@/app/global/state'
import { appLocalStorage } from '@/app/global/services'
import { EditModeToggle } from '@/app/global/components'
import { bookmarksActions } from '../shared/state'
import { MediaUploadModal } from '../shared/components'

export default {
  name: 'river-header',
  components: {
    EditModeToggle,
    MediaUploadModal
  },
  mixins: [checkWindow],
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
    uploadModalVisible: false,
    bookmarked: false,
    iconAlways: {
      name: 'CameraAction32',
      functional: false,
      props: {
        title: {
          type: null
        }
      }
    }
  }),
  computed: {
    ...mapState({
      editMode: state => state.appGlobalState.appGlobalData.editMode,
      user: state => state.userState.userData.data,
      river: state => state.riverDetailState.riverDetailData.data
    }),
    ...mapGetters(['userIsAdmin']),
    reachId () {
      return parseInt(this.$route.params.id, 10)
    },
    bgImg () {
      if (this.river && this.river.photo) {
        return {
          url: `https://americanwhitewater.org${this.river.photo.image.uri.big || this.river.photo.image.uri.medium}`,
          credit: this.river.photo.post ? this.river.photo.post.user.uname : 'credit'
        }
      }
      return null
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
<style lang="scss">
section {
  &.river-header {
    width: 100%;
    height: 50vh;

    &.has-bg {
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .edit-actions-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      &.edit {
        flex-flow: column nowrap;
      }
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 32px;
        min-width: 32px;
        padding: $spacing-2xs;
        background-color: $ui-01;
        cursor: pointer;
        &.edit {
          height: 50px;
          width: 50px;
        }
      }
    }
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
    h1,
    h3 {
      margin-bottom: $spacing-sm;
      padding: 11px 12px 11px 2rem;
    }
    h4,
    h6 {
      padding: 11px 12px 0 2rem;
    }
  }

  .info-section {
    order: 2;
    @include carbon--breakpoint("lg") {
      order: 1;
    }
  }

  .edit-section {
    order: 1;
    height: 5rem;

    &.edit {
      height: 10rem;
    }
    @include carbon--breakpoint("lg") {
      height: auto;
      order: 2;
    }
  }
}
</style>
