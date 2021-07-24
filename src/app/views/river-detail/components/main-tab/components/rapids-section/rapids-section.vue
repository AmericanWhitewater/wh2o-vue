<template>
  <section class="rapids-section mb-xl">
    <hr>
    <h2 class="mb-spacing-md">River Features</h2>
    <cv-button
      v-if="editMode"
      id="new-rapid"
      class="mr-spacing-sm mb-sm"
      size="small"
      :disabled="loading"
      kind="secondary"
      @click.exact="openModal"
      @keydown.enter="openModal"
    >
      Add Feature
    </cv-button>
    <template v-if="loading">
      <utility-block state="loading" />
    </template>

    <template v-else-if="rapids && !error">
      <template v-if="rapids.length > 0">
        <div class="bx--row">
          <rapid-item
            v-for="(rapid, index) in rapids"
            :key="index"
            :rapid="rapid"
            :first-p-o-i="index === 0 ? true : false"
            @rapid:edit="triggerEdit"
            @rapid:delete="triggerDelete"
            @rapid:imageSelect="triggerImageSelect"
          />
        </div>
      </template>
      <template v-else>
        <utility-block state="content" text="No rapids have been added" />
      </template>
    </template>
    <template v-else>
      <utility-block state="error" />
    </template>
    <rapid-edit-modal
      v-if="editMode"
      :key="currentlyEditingRapid ? currentlyEditingRapid.id : reachId"
      :rapid-id="currentlyEditingRapid ? currentlyEditingRapid.id : null"
      :rapid-modal-visible="rapidModalVisible"
      @edit:cancelled="closeEditModal()"
      @edit:success="closeEditModal()"
    />
    <confirm-delete-modal v-if="editMode" ref="confirmDeleteModal" />
    <image-selector-modal v-if="editMode" ref="imageSelectorModal" />
  </section>
</template>
<script>
import { RapidItem, RapidEditModal } from "./components";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
import ConfirmDeleteModal from "@/app/global/components/confirm-delete-modal/confirm-delete-modal.vue";
import ImageSelectorModal from "@/app/global/components/image-selector-modal/image-selector-modal.vue";
import { mapState } from "vuex";

export default {
  name: "rapids-section",
  components: {
    RapidItem,
    UtilityBlock,
    RapidEditModal,
    ConfirmDeleteModal,
    ImageSelectorModal,
  },
  data: () => ({
    rapidModalVisible: false,
    currentlyEditingRapid: null,
    formData: {
      files: [],
      name: "",
      distance: "",
      class: "",
      description: "",
      geom: {},
    },
  }),
  computed: {
    ...mapState({
      loading: (state) => state.RiverRapids.loading,
      error: (state) => state.RiverRapids.error,
      rapids: (state) => state.RiverRapids.data,
      user: (state) => state.User.data,
      editMode: (state) => state.Global.editMode,
    }),
    reachId() {
      return this.$route.params.id;
    },
  },
  methods: {
    triggerEdit(rapid) {
      this.currentlyEditingRapid = rapid;
      this.rapidModalVisible = true;
    },
    async triggerDelete(rapid) {
      const ok = await this.$refs.confirmDeleteModal.show({
        title: "Delete Rapid",
        message: `Are you sure you want to delete "${rapid.name}"?`,
      });
      if (ok) {
        this.deleteRapid(rapid);
      }
    },
    async triggerImageSelect(rapid) {
      // need to pass images and selected image as props
      const selectedImage = await this.$refs.imageSelectorModal.show({
        title: "Select an image",
        selectedImage: rapid.photo,
      });
      if (selectedImage && rapid) {
        // do image selection update
        // TBD once associating a photo with a rapid is made clear
        // await this.$store.dispatch("RiverRapids/updateRapid", {
        //   id: rapid.id,
        //   ...this.formData,
        // });
        // console.log(rapid);
        // console.log("saving rapid with image");
      }
    },
    openModal() {
      if (this.user) {
        this.rapidModalVisible = true;
      } else {
        this.$store.dispatch("Global/sendToast", {
          title: "Must Log In",
          kind: "error",
          override: true,
          contrast: false,
          action: false,
          autoHide: true,
        });
      }
    },
    deleteRapid(rapid) {
      this.$store.dispatch("RiverRapids/deleteRapid", rapid.id);
    },
    closeEditModal() {
      // ensure that actual modal hide() lifecycle completes
      // basically, if the key changes too quickly, the modal hide()
      // action doesn't complete so this class "bx--body--with-modal-open"
      // doesn't get removed from the body *which prevents scrolling*
      this.rapidModalVisible = false;
      this.$nextTick(() => {
        this.currentlyEditingRapid = null;
      });
    },
  },
};
</script>
