<template>
  <div>
    <cv-file-uploader
      ref="fileUploader"
      data-modal-primary-focus
      helper-text="10mb max"
      accepts=".jpg,.png"
      class="mb-spacing-md"
      :disabled="isFormPending"
      :clear-on-reselect="true"
      @change="setFile"
    />
    <cv-text-input
      v-model="internalPost.title"
      class="mb-spacing-md"
      label="Title"
      required
      :disabled="isFormPending"
    />
    <cv-text-area
      v-model="internalPost.detail"
      label="Detail"
      :class="{ 'mb-spacing-md': !parentIsModal }"
      :disabled="isFormPending"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "@vue/composition-api";
import { PostType } from "../../../../../../components/models/post/types";
import { PhotoFactory } from "../../../../../../components/models/post";
import { FileAttachmentType } from "@/app/views/river-detail/shared/components/lib/types";
import isEqual from "lodash/isEqual";
import { cloneDeep } from "@apollo/client/utilities";
// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
  name: "photo-post-form",
  props: {
    value: {
      type: Object as PropType<PostType>,
      required: true,
      default: () => PhotoFactory.new(),
    },
    isFormPending: {
      type: Boolean,
      required: false,
      default: false,
    },
    parentIsModal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, ctx) {
    const internalPost = ref(cloneDeep(props.value));
    watch(
      () => props.value,
      () => {
        if (!isEqual(props.value, internalPost.value))
          internalPost.value = cloneDeep(props.value);
      },
      { immediate: true }
    );
    watch(
      () => internalPost.value,
      () => {

        !isEqual(props.value, internalPost.value) &&
          ctx.emit("input", cloneDeep(internalPost.value));
      },
      { deep: true }
    );

    async function setFile(input: Array<FileAttachmentType>) {
      ctx.emit("setFile", input);
    }

    return { setFile, internalPost };
  },
});
</script>
