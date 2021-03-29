<template>
  <div :class="[{ visible: visible }, 'reach-title-update-modal']">
    <cv-modal
      ref="modalWrapper"
      :visible="visible"
      @modal-shown="setModalOffset"
      @primary-click="submitForm"
      @secondary-click="handleCancel"
      @modal-hidden="handleCancel"
    >
      <template slot="title"> Edit Reach Name </template>
      <template slot="content">
        <cv-text-input
          v-model="formData.river"
          class="mb-spacing-md"
          label="River"
        />
        <cv-text-input
          v-model="formData.section"
          label="Section"
          class="mb-spacing-md"
        />
        <cv-select
          v-model="formData.status"
          label="Status"
          class="mb-spacing-md"
          helper-text="'Published' reaches will appear within 5 minutes of saving. 'Drafts' need to be updated to 'Published' in order to appear."
        >
          <cv-select-option
            v-for="(label, val) in reachPublishedStates"
            :key="val"
            :value="val"
          >
            {{ label }}
          </cv-select-option>
        </cv-select>
      </template>
      <template slot="secondary-button"> Cancel </template>
      <template slot="primary-button"> Submit </template>
    </cv-modal>
  </div>
</template>
<script>
import {
  shadowDomFixedHeightOffset,
  reachPublishedStates,
} from "@/app/global/mixins";
import { mapState } from "vuex";
export default {
  name: "reach-title-edit-modal",
  mixins: [shadowDomFixedHeightOffset, reachPublishedStates],
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    formData: {},
  }),
  computed: {
    ...mapState({
      reach: (state) => state.RiverDetail.data,
    }),
  },
  methods: {
    handleCancel() {
      this.$emit("edit:cancelled");
    },
    submitForm() {
      this.$parent.editReachTitleModalVisible = false;
      // these modals are super problematic. If we don't use nextTick here,
      // the class isn't removed from `body` and you can't scroll
      this.$nextTick(() => {
        this.$store.dispatch("RiverDetail/updateProperty", {
          id: this.$route.params.id,
          reach: {
            river: this.formData.river,
            section: this.formData.section,
            class: this.formData.class,
            length: this.formData.length,
            avggradient: this.formData.avggradient,
            maxgradient: this.formData.maxgradient,
            status: this.formData.status,
          },
        });
      });
    },
  },
  mounted() {
    if (this.reach) {
      this.formData = { ...this.reach };
    }
  },
};
</script>
