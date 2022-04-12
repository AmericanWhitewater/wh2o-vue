<template>
  <cv-modal
    ref="modalWrapper"
    size="medium"
    @primary-click="_confirm()"
    @modal-hidden="_cancel()"
    @modal-shown="setModalOffset"
  >
    <template slot="title"> Select an Image </template>
    <template slot="content">
      <template v-if="loading">
        <utility-block state="loading" class="mb-sm" />
      </template>
      <div v-else-if="images && images.length" class="flex-row bx--row">
        <div
          v-for="(image, index) in images"
          :key="index"
          :class="'flex-cell' + isSelectedClass(image)"
          @click="selectImage(image)"
        >
          <div class="imagebox">
            <img
              :src="imageURI(image, 'thumb')"
              :alt="image.subject || image.caption || image.poi_name"
              class="image-thumbnail"
            >
          </div>
          <div class="caption">
            {{ image.subject || image.caption || image.poi_name }}
          </div>
        </div>
      </div>
      <template v-else>
        <utility-block
          state="content"
          text="No images - add some in the gallery tab"
        />
      </template>
      <div class="bx--row">
        <div class="bx--col">
          <table-pagination
            v-if="images && images.length"
            :number-of-items="pagination.total"
            :page="pagination.currentPage"
            :pagination="pagination.perPage"
            @change="changePage"
          />
        </div>
      </div>
    </template>
    <template slot="secondary-button"> Cancel </template>
    <template slot="primary-button"> OK </template>
  </cv-modal>
</template>
<script>
import { shadowDomFixedHeightOffset, assetUrl } from "@/app/global/mixins";
import { mapState } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
import TablePagination from "@/app/global/components/table-pagination/table-pagination";

// modal open/close modelled on https://stackabuse.com/how-to-create-a-confirmation-dialogue-in-vue-js/
export default {
  name: "image-selector-modal",
  components: {
    TablePagination,
    UtilityBlock,
  },
  mixins: [shadowDomFixedHeightOffset, assetUrl],
  data: () => ({
    resolvePromise: undefined,
    rejectPromise: undefined,
    selectedImage: null,
  }),
  computed: {
    ...mapState({
      loading: (state) => state.RiverGallery.loading,
      pagination: (state) => state.RiverGallery.pagination,
      images: (state) => state.RiverGallery.data,
    }),
    reachId() {
      return this.$route.params.id;
    },
  },
  methods: {
    show(opts) {
      this.changePage({
        perPage: 10,
        page: 1,
      });

      this.$refs.modalWrapper.show();

      if (opts.selectedImage) {
        this.selectedImage = opts.selectedImage;
      }

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve;
        this.rejectPromise = reject;
      });
    },
    changePage(newPaginator) {
      this.$store.dispatch("RiverGallery/getProperty", {
        id: this.reachId,
        perPage: newPaginator.length,
        page: newPaginator.page,
      });
    },
    selectImage(image) {
      this.selectedImage = image;
    },
    isSelectedClass(image) {
      if (this.selectedImage && this.selectedImage.id === image.id) {
        return " selected";
      } else {
        return "";
      }
    },
    _confirm() {
      // return selected image
      this.resolvePromise(this.selectedImage);
      this.$refs.modalWrapper.hide();
    },
    _cancel() {
      this.resolvePromise(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  width: 100%;
  margin: 20px;
}
.flex-cell {
  display: flex;
  flex-flow: column;
  justify-content: center;
  flex: 0 1 150px;
  height: 100px;
  text-align: center;
  transition: 0.5s;
}
.image-thumbnail {
  max-height: 60px;
  max-width: 90%;
}
.flex-cell:hover,
.flex-cell.selected {
  background-color: gray;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s;
  .caption {
    color: white;
  }
}
.flex-row {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.caption {
  padding: 2px;
  color: #757575;
  font-size: 11px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.imagebox {
  word-wrap: break-word;
}
</style>