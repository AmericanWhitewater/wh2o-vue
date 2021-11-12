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
                <cv-button v-if="user && user.uid" @click="openImageModal">
                  Upload
                </cv-button>
              </div>
            </div>
          </div>
          <div class="bx--row">
            <div class="bx--col">
              <image-gallery
                :images="media"
                gallery-type="gallery-tab"
                @photoModified="loadMedia"
              />
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
    <image-update-modal
      ref="imageUpdateModal"
      section="GALLERY"
      includePostFields
    />
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
import ImageGallery from "@/app/views/river-detail/components/image-gallery/image-gallery.vue";
import { Layout } from "@/app/global/layout";
import { ImageUpdateModal, TablePagination } from "@/app/global/components";

export default {
  name: "gallery-tab",
  components: {
    UtilityBlock,
    Layout,
    ImageGallery,
    TablePagination,
    ImageUpdateModal,
  },
  data: () => ({
    selectedRapids: [],
    currentlyLoadedImagesFor: null,
  }),
  computed: {
    ...mapState({
      loading: (state) => state.RiverGallery.loading,
      error: (state) => state.RiverGallery.error,
      pagination: (state) => state.RiverGallery.pagination,
      rapids: (state) => state.RiverRapids.data,
      user: (state) => state.User.data,
    }),
    ...mapGetters({
      media: "RiverGallery/media",
    }),
    reachId() {
      return this.$route.params.id;
    },
  },
  methods: {
    loadRapids(routeId) {
      this.$store.dispatch("RiverRapids/getProperty", routeId);
    },
    loadMedia(val) {
      this.loadRapids(this.reachId);

      const data = {
        reach_id: this.reachId,
        per_page: val ? val.length : 10,
        page: val ? val.page : 1,
      };

      this.$store.dispatch("RiverGallery/getProperty", data);

      this.currentlyLoadedImagesFor = this.reachId;
    },
    async openImageModal() {
      const ok = await this.$refs.imageUpdateModal.show();

      if (ok) {
        this.loadMedia();
      }
    },
  },
  // this ensures that gallery images are retrieved when you move between
  // rivers even though the gallery tab component is cached
  activated() {
    if (this.reachId !== this.currentlyLoadedImagesFor) {
      this.loadMedia();
    }
  },
};
</script>
