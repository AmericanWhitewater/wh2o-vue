<template>
  <div class="gallery-tab">
    <layout name="layout-full-width">
      <template #main>
        <template v-if="loading">
          <utility-block
            state="loading"
            class="mb-sm"
          />
        </template>
        <template v-else-if="media">
          <div class="bx--row">
            <div class="bx--col">
              <div class="toolbar-wrapper">
                <cv-button
                  size="small"
                  :disabled="!user"
                  @click.exact="mediaUploadModalVisible = true"
                  @keydown.enter="mediaUploadModalVisible = true"
                >
                  Upload Media
                </cv-button>
              </div>
            </div>
          </div>
          <div class="bx--row">
            <div class="bx--col">
              <image-gallery :images="media" />
            </div>
          </div>
          <div class="bx--row">
            <div class="bx--col">
              <table-pagination
                :number-of-items="pagination.total"
                :page="pagination.currentPage"
                :pagination="pagination"
                @change="loadMedia"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <utility-block
            state="content"
            title="No Media"
            text="if you have media for this reach, please share"
            class="mb-sm"
          />
        </template>
      </template>
    </layout>
    <media-upload-modal
      :visible="mediaUploadModalVisible"
      section="POST"
      @form:cancelled="mediaUploadModalVisible = false"
      @form:success="mediaUploadModalVisible = false"
      @form:error="mediaUploadModalVisible = false"
    />
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { MediaUploadModal, ImageGallery } from '../shared/components'
import { Layout } from '@/app/global/layout'
import { TablePagination } from '@/app/global/components'
import { rapidsActions, galleryActions } from '@/app/views/river-detail/shared/state'
export default {
  name: 'gallery-tab',
  components: {
    UtilityBlock,
    MediaUploadModal,
    Layout,
    ImageGallery,
    TablePagination
  },
  data: () => ({
    selectedRapids: [],
    mediaUploadModalVisible: false,
    currentlyLoadedImagesFor: null
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.galleryData.loading,
      error: state => state.riverDetailState.galleryData.error,
      photos: state => state.riverDetailState.galleryData.data?.data,
      pagination: state => state.riverDetailState.galleryData.pagination,
      rapids: state => state.riverDetailState.rapidsData.data,
      user: state => state.userState.userData.data
    }),
    ...mapGetters(['media']),
    reachId () {
      return this.$route.params.id
    }
  },
  watch: {
    reachId: {
      immediate: true,
      handler: function (val) {
        this.loadRapids(val)
      }
    }
  },
  methods: {
    loadRapids (routeId) {
      this.$store.dispatch(rapidsActions.FETCH_RAPIDS_DATA, routeId)
    },
    formatMultiSelectModel (rapids) {
      this.selectedRapids = rapids ? rapids.map(r => r.id) : null
    },
    loadMedia (val) {
      const data = {
        reach_id: this.reachId,
        per_page: val ? val.length : 10,
        page: val ? val.page : 1
      }
      this.$store.dispatch(galleryActions.FETCH_GALLERY_DATA, data)
      this.currentlyLoadedImagesFor = this.reachId
    }
  },
  created () {
    this.loadMedia()
  },
  // this ensures that gallery images are retrieved when you move between
  // rivers even though the gallery tab component is cached
  activated () {
    if (this.reachId !== this.currentlyLoadedImagesFor) {
      this.loadMedia()
    }
  }
}
</script>
