<template>
  <div class="gallery-tab">
    <layout name="layout-full-width">
      <template #main>
        <template v-if="loading">
          <utility-block state="loading" class="mb-sm" />
        </template>
        <template v-else-if="media">
          <div class="bx--row">
            <div class="bx--col">
              <div class="toolbar-wrapper">
                <cv-button
                  size="medium"
                  :disabled="!canUserPost"
                  @click="mediaUploadModalVisible = true"
                >
                  Upload
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
      @form:success="uploadSuccessAction"
      @form:error="mediaUploadModalVisible = false"
    />
  </div>
</template>
<script lang="ts">
import { mapGetters, mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block.vue";
import { ImageGallery } from "../shared/components";
import { Layout } from "@/app/global/layout";
import { TablePagination } from "@/app/global/components";
import {
  galleryActions,
  rapidsActions,
} from "@/app/views/river-detail/shared/state";
import { PostRepository } from "@bit/aw.models.post";
import { defineComponent } from "@vue/composition-api";
import { PermissionResultType } from "@bit/aw.models.permission";
import MediaUploadModal from "@/app/views/river-detail/shared/components/MediaUploadModal.vue";
import { Vue } from "vue/types/vue";
interface PageOptions {
  page: number;
  length: number;
}

interface RiverDetailState
{
  galleryData: GalleryState;
  rapidsData: Record<string,unknown>;
}

interface UserState

  {userData: Record<string,unknown>}


interface StateType
{
  userState: UserState;

  riverDetailState: RiverDetailState;

}
interface GalleryState
{
  loading: boolean;
  error: string;
  data: Record<string,unknown>;
  pagination: PageOptions;
}

/**
 * hybridized ts-js
 */

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
  name: "gallery-tab",
  components: {
    UtilityBlock,
    Layout,
    ImageGallery,
    TablePagination,
    MediaUploadModal,
  },
  data: () => ({
    selectedRapids: [],
    mediaUploadModalVisible: false,
    currentlyLoadedImagesFor: "",
    lastFetchOptions: { page: 1, length: 10 } as PageOptions,
    canUserPost: false,
  }),
  computed: {

    ...mapState({
      //@ts-ignore
      loading: (state: StateType) => state.riverDetailState.galleryData.loading,
      error: (state: StateType) => state.riverDetailState.galleryData.error,
      photos: (state: StateType) => state.riverDetailState.galleryData.data?.data,
      pagination: (state: StateType) => state.riverDetailState.galleryData.pagination,
      rapids: (state: StateType) => state.riverDetailState.rapidsData.data,
      user: (state: StateType) => state.userState.userData.data,
    }),
    ...mapGetters(["media"]),
    reachId() {
      return ((this as unknown) as Vue).$route.params.id;
    },
  },
  methods: {
    /**
     * Close the form and refresh the contents of the gallery to show the new upload.
     */
    uploadSuccessAction() {
      this.mediaUploadModalVisible = false;
      this.loadMedia();
    },
    loadRapids(routeId) {
      this.$store.dispatch(rapidsActions.FETCH_RAPIDS_DATA, routeId);
    },
    async loadMedia(val?: PageOptions) {
      // not used currently but needed for `rapids` in the media upload modal when we add that
      this.loadRapids(this.reachId);

      this.canUserPost =
        (await PostRepository.getPostCreatePermission({
          reach_id: this.reachId,
        })) == PermissionResultType.ALLOW;
      if (!val) val = { page: 0, length: 10 };

      const data = {
        reach_id: this.reachId,
        per_page: val ? val.length : this.lastFetchOptions.length,
        page: val ? val.page : this.lastFetchOptions.page,
      };
      this.lastFetchOptions = val;
      this.$store.dispatch(galleryActions.FETCH_GALLERY_DATA, data);
      this.currentlyLoadedImagesFor = this.reachId;
    },
  },
  // this ensures that gallery images are retrieved when you move between
  // rivers even though the gallery tab component is cached
  activated() {
    if (this.reachId !== this.currentlyLoadedImagesFor) {
      this.lastFetchOptions = { page: 1, length: 10 };
      this.loadMedia();
    }
  },
});
</script>
