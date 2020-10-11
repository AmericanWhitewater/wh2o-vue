<template>
  <cv-file-uploader

      ref="fileUploader"
      data-modal-primary-focus
      helper-text="10mb max"
      accepts=".jpg,.png"
      class="mb-spacing-md"
      :disabled="formPending || !user"
      @change="setFile"
  />
  <cv-text-input
      v-model="internalPost.title"
      class="mb-spacing-md"
      label="Title"
      required
      :disabled="isFormPending "
  />
  <cv-text-area
      v-model="internalPost.detail"
      label="Detail"
      :class="{ 'mb-spacing-md': !parentIsModal }"
      :disabled="isFormPending "
  />
</template>
<script lang="ts">
import {defineComponent, PropType} from "@vue/composition-api";
import {PostType} from "../../../../../../components/models/post/types";
import {PhotoFactory} from "../../../../../../components/models/post";
import {FileAttachmentType} from "@/app/views/river-detail/shared/components/lib/types";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
  name: 'photo-post-form',
  props: {
    value: {
     type:Object as PropType<PostType>,
      required:true,
      default:()=>PhotoFactory.new()
    },
    isFormPending: {
      type:Boolean,
      required:false,
      default:false,
    },
    parentIsModal: {
      type:Boolean,
      required:false,
      default:false,
    },

  },
  setup(props,ctx)
  {

    async function setFile(input: Array<FileAttachmentType>)
    {
      ctx.emit('setFile',input);
    }



    return({setFile})
  }
})
</script>
