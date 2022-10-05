<template>
  <div class="gallery-tab">
    <layout name="layout-full-width">
      <template #main>
        <template v-if="loading">
          <utility-block state="loading" class="mb-sm" />
        </template>
        <template v-else-if="galleryPhotos">
          <div class="bx--row">
            <div class="bx--col">
              <div class="toolbar-wrapper">
                <cv-button
                  v-if="user && user.uid"
                  @click.exact="$router.push({ name: 'new-report' })"
                >
                  + Upload Photos
                </cv-button>
              </div>
            </div>
          </div>
          <div class="bx--row">
            <div class="bx--col">
              <image-gallery
                :images="galleryPhotos"
                :imageIndex="galleryIndex"
                :detailImage="detailImage"
                @photoModified="loadMedia"
                @navigateToImage="navigateToImage"
              />
            </div>
          </div>
          <div class="bx--row">
            <div class="bx--col">
              <table-pagination
                :number-of-items="pagination.total"
                :page="pagination.currentPage"
                :perPage="pagination.perPage"
                @change="changePage"
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
  </div>
</template>
<script>
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
import ImageGallery from "./image-gallery/image-gallery.vue";
import { Layout } from "@/app/global/layout";
import { TablePagination } from "@/app/global/components";

export default {
  name: "gallery-tab",
  components: {
    UtilityBlock,
    Layout,
    ImageGallery,
    TablePagination,
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
      galleryPhotos: (state) => state.RiverGallery.data,
      galleryIndex: (state) => state.RiverGallery.galleryIndex,
      user: (state) => state.User.data,
    }),
    reachId() {
      return this.$route.params.id;
    },
    detailImageId() {
      return this.$route.params.imageId;
    },
    detailImage() {
      return this.galleryPhotos.find(
        (image) => image.id === this.detailImageId
      );
    },
  },
  watch: {
    // when the index loads, if we are viewing a specific image, navigate to the
    // correct gallery page for that image
    galleryIndex() {
      if (this.detailImageId) {
        this.loadPageOfImageId(this.detailImageId);
      }
    },
  },
  methods: {
    loadPageOfImageId(imageId) {
      const imageIndex = this.galleryIndex.indexOf(imageId);
      const page = Math.ceil((imageIndex + 1) / this.pagination.perPage);
      this.changePage({
        length: this.pagination.perPage,
        page: page,
      });
    },
    changePage(newPaginator) {
      this.$store.dispatch("RiverGallery/getProperty", {
        id: this.reachId,
        perPage: newPaginator.length,
        page: newPaginator.page,
      });
    },
    loadMedia() {
      // ensure reach rapids are loaded so images can display their info
      this.$store.dispatch("RiverRapids/getProperty", this.reachId);

      // load image index
      this.$store.dispatch("RiverGallery/getIndex", this.reachId);

      this.$store.dispatch("RiverGallery/getProperty", {
        id: this.reachId,
      });

      // get list of reports that users can assign images to
      this.$store.dispatch("RiverGallery/getAvailableReports", this.reachId);

      this.currentlyLoadedImagesFor = this.reachId;
    },
    navigateToImage(image) {
      if (image) {
        // if we're not currently on the image's page, load it
        if (!this.galleryPhotos.filter((img) => img.id === image.id).length) {
          this.loadPageOfImageId(image.id);
        }
        this.$router.push({
          name: "gallery-detail",
          params: { imageId: image.id },
        });
      } else {
        this.$router.push({ name: "gallery-tab" });
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
