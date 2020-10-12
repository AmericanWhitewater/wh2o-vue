<template>
  <div>
    <photo-image :photo="internalPhoto" />
    <!--cv-file-uploader

      ref="fileUploader"
      data-modal-primary-focus
      helper-text="10mb max"
      accepts=".jpg,.png"
      class="mb-spacing-md"
      :disabled="isFormPending "
      @change="setFile"
    / -->
    <input type="file" @change="setFile" >
    <cv-text-input
      v-model="internalPhoto.caption"
      class="mb-spacing-md"
      label="Caption"
      :disabled="isFormPending"
    />
    <cv-text-area
      v-model="internalPhoto.description"
      label="Description"
      :class="{ 'mb-spacing-md': !parentIsModal }"
      :disabled="isFormPending"
    />

    <cv-text-input
      v-model="internalPhoto.author"
      class="mb-spacing-md"
      label="Author"
      required
      :disabled="isFormPending"
    />
    <cv-text-input
      v-model="internalPhoto.subject"
      class="mb-spacing-md"
      label="Subject"
      :disabled="isFormPending"
    />

    <cv-dropdown
      v-if="rapids && rapids.length"
      v-model="internalPhoto.poi_id"
      :disabled="isFormPending"
      class="mb-spacing-md"
      label="Rapid"
    >
      <cv-dropdown-item
        v-for="(rapid, index) in rapids"
        :key="index"
        :value="rapid.id"
      >
        {{ rapid.name }}
      </cv-dropdown-item>
    </cv-dropdown>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch,
} from "@vue/composition-api";
import { PhotoType, PhotoFactory } from "@bit/aw.models.post";
import { cloneDeep } from "@apollo/client/utilities";
import isEqual from "lodash/isEqual.js";
import PhotoImage from "./PhotoImage.vue";
import { FileAttachmentType } from "@/app/views/river-detail/shared/components/lib/types";
// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
  components: {
    PhotoImage,
  },
  props: {
    value: {
      type: Object as PropType<PhotoType>,
      required: true,
      default: () => PhotoFactory.new(),
    },
    rapids: {
      type: Array as PropType<{ id: string; name: string }[]>,
      required: true,
      default: () => [],
    },
    isFormPending: { type: Boolean, required: true, default: false },
  },

  setup(props, ctx) {
    const internalPhoto = ref(PhotoFactory.new());
    watch(
      () => props.value,
      () => (internalPhoto.value = cloneDeep(props.value)),
      { immediate: true }
    );

    watch(
      () => internalPhoto.value,
      () =>{

        !isEqual(internalPhoto.value, props.value) && ctx.emit("input", cloneDeep(internalPhoto.value))
      },{deep:true}

    );

    function setFile(a: InputEvent) {

      const files = (a.target as HTMLInputElement)?.files;
      const input: FileAttachmentType[] = [];
      if (files) {
        for (let i = 0; i < files?.length; i++) {
          if (files[i]) {
            input.push({file: files[i]});
          }
        }
      }

      ctx.emit("setFileForPhoto", { photo: internalPhoto.value, input });
    }

    return { internalPhoto, parentIsModal: false, setFile };
  },
});
</script>
