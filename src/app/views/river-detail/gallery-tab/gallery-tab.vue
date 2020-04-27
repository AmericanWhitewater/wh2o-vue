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
                  @click.exact="mediaUploadModalVisible = true"
                  @keydown.enter="mediaUploadModalVisible = true"
                >
                  Upload Media
                </cv-button>
                <cv-multi-select
                  v-if="multiSelectOptions"
                  v-model="selectedRapids"
                  auto-filter
                  filterable
                  label="Selected Rapids"
                  inline
                  :initial-value="multiSelectOptions"
                  :options="multiSelectOptions"
                  selection-feedback="top-after-reopen"
                />
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
              <cv-pagination :number-of-items="pagination.total" />
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
      section="GALLERY"
      @upload:cancelled="mediaUploadModalVisible = false"
    />
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { MediaUploadModal, ImageGallery } from '../shared/components'
import { Layout } from '@/app/global/layout'
import { rapidsActions, galleryActions } from '@/app/views/river-detail/shared/state'
export default {
  name: 'gallery-tab',
  components: {
    UtilityBlock,
    MediaUploadModal,
    Layout,
    ImageGallery
  },
  data: () => ({
    selectedRapids: [],
    mediaUploadModalVisible: false
  }),

  computed: {
    ...mapState({
      loading: state => state.riverDetailState.galleryData.loading,
      error: state => state.riverDetailState.galleryData.error,
      photos: state => state.riverDetailState.galleryData.data?.data,
      pagination: state => state.riverDetailState.galleryData.pagination,
      rapids: state => state.riverDetailState.rapidsData.data
    }),
    ...mapGetters(['media']),
    multiSelectOptions () {
      if (this.rapids) {
        return this.rapids.map(rapid => {
          return {
            name: rapid.name,
            label: rapid.name,
            value: rapid.id
          }
        })
      }
      return null
    }
  },
  watch: {
    rapids: {
      immediate: true,
      handler (val) {
        this.formatMultiSelectModel(val)
      }
    }
  },
  methods: {
    loadRapids () {
      this.$store.dispatch(rapidsActions.FETCH_RAPIDS_DATA, this.$route.params.id)
    },
    formatMultiSelectModel (rapids) {
      this.selectedRapids = rapids ? rapids.map(r => r.id) : null
    },
    loadMedia (val) {
      const data = {
        reach_id: this.$route.params.id,
        per_page: val ? val.length : 10,
        page: val ? val.page : 1
      }
      this.$store.dispatch(galleryActions.FETCH_GALLERY_DATA, data)
    }
  },
  created () {
    this.loadMedia()
    if (!this.rapids) {
      this.loadRapids()
    }
  }
}
</script>
<style lang="scss">
.gallery-tab {
  .toolbar-wrapper {
    display: flex;
    justify-content: space-between;
    align-items:center;
    margin-bottom: $layout-sm;
  }
  padding-top: 2rem;
  // give the photoswipe thumbnails some style
  img[itemprop="thumbnail"] {
    height: 200px;
    object-fit: cover;
    @include carbon--breakpoint("md") {
      width: 250px;
      height: 250px;
    }
    @include carbon--breakpoint("lg") {
      width: 350px;
      height: 250px;
    }
  }
}
</style>
