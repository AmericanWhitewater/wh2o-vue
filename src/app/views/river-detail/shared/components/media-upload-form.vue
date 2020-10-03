<template>
  <div class="media-upload-form">
    <h2
      v-if="title"
      class="mb-spacing-md"
      v-text="title"
    />
    <template v-if="previewUrls.length">
      <img
        v-for="(item, k) in previewUrls"
        :key="k"
        :src="`${item}`"
        class="mb-spacing-sm"
      >
    </template>
    <cv-file-uploader
      v-if="!previewUrls.length"
      ref="fileUploader"
      data-modal-primary-focus
      helper-text="10mb max"
      accepts=".jpg,.png"
      class="mb-spacing-md"
      :disabled="formPending || !user"
      @change="setFile"
    />
    <cv-text-input
      v-model="formData.photo.author"
      class="mb-spacing-md"
      label="Author"
      required
      :disabled="formPending || !user"
    />
    <cv-text-input
      v-model="formData.photo.subject"
      class="mb-spacing-md"
      label="Subject"
      :disabled="formPending || !user"
    />
    <cv-text-input
      v-model="formData.photo.caption"
      class="mb-spacing-md"
      label="Caption"
      :disabled="formPending || !user"
    />
    <cv-dropdown
      v-if="rapids && rapids.length"
      v-model="formData.photo.poi_id"
      :disabled="formPending || !user"
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
    <cv-text-area
      v-model="formData.photo.description"
      label="Description"
      :class="{ 'mb-spacing-md': !parentIsModal }"
      :disabled="formPending || !user"
    />
  </div>
</template>

<script lang="ts">
import { globalAppActions } from '@/app/global/state'

import genid from '@bit/aw.utility.genid'
import {computed, defineComponent, onMounted, reactive, ref, watch} from '@vue/composition-api'
import {
  PhotoFactory,
  PostRepository,
  PostTypeEnum,
  FileInputSectionType,
  PostInputType, PostFactory,
  FileInputType, PhotoInputType
} from '@bit/aw.models.post'
import {configBaseURL} from "@/aw/global/config";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
  name: 'media-upload-form',
  props: {
    section: {
      type: String,
      required: true,
      validator: (val: string) =>
        ['RAPID', 'POST', 'GALLERY', 'REACH'].indexOf(val) > -1
    },
    primaryClickTimestamp: {
      type: Number,
      required: false,
      default: null
    },
    title: {
      type: String,
      required: false
    }
  },


  setup (props, context) {
    const formPending = ref<boolean>(false)

    const postFormData = reactive<{ id: string; post: PostInputType }>({ id: genid(), post: PostFactory.newInputType() })
    const previewUrls = ref<string[]>([])
    const formData = reactive<{ id: string; photo: PhotoInputType; fileinput: FileInputType }>({
      id: genid(),
      fileinput: {

        section: FileInputSectionType.POST,
        section_id: genid(),
        file: undefined
      },
      photo: PhotoFactory.newInputType()
    })
    /**
     * Resets the photo info for next photo
     */
    function nextPhoto()
    {
      formPending.value = false;
      formData.photo={...PhotoFactory.newInputType(),post_id:postFormData.id}
      formData.id=genid()

    }


    /***
     * sets all the ids we need
     */
    function resetForm()
    {
      formPending.value = false;
      postFormData.id = genid()
      postFormData.post = PostFactory.newInputType();
      formData.fileinput={section:FileInputSectionType.POST, section_id:postFormData.id, file:undefined}
      nextPhoto();
    }

    const rapids = computed(() => {
      return context.root.$store.state.riverDetailState.rapidsData.data
    })
    const user = computed(() => {
      return context.root.$store.state.userState.userData.data
    })
    const fieldsDisabled = computed(() => {
      return !user.value || formPending.value
    })
    const parentIsModal = computed(() => {

      return !!context?.parent?.$refs.modalDialog
    })

    async function uploadFile () {
      formPending.value = true

      try {
        const photo = await PostRepository.sendFile({ id: formData.id, photo: formData.photo, fileinput: formData.fileinput })
        if (photo) {

          postFormData.id = photo.post_id
          postFormData.post.post_date = photo.photo_date
          postFormData.post.reach_id = parseInt(context.root.$route.params.id)
          let photo_url =photo.image.uri?.big;
          if(photo_url )
          {
            if(!photo_url.match(/http/gi))
            {
              photo_url = new URL(photo_url,configBaseURL()).toString()
            }
           previewUrls.value.push(photo_url)
          }
        }
      } catch (err) {

        context.emit('form:error')
        // @ts-ignore
        context.root.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Upload Failed',
          kind: 'error'
        })
      }
      formPending.value = false

    }

    function setFile (input: Array<{file: File}>) {
      if (input && input.length) {
        formData.fileinput.file = input[0].file
        uploadFile()
      }
    }


    async function submitPost () {
      formPending.value = true
      try {
        await PostRepository.updatePost({
          user_id: user.value.uid,
          post: postFormData.post,
          post_type: PostTypeEnum.JOURNAL
        })
        context.emit('form:success')
        // @ts-ignore
        context.root.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Media Uploaded',
          kind: 'success'
        })
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log('error :>> ', error)
        context.emit('form:error')
        // @ts-ignore
        context.root.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Upload Failed',
          kind: 'error'
        })
      } finally {
        formPending.value = false
      }
    }

    function setInitialFormData () {
      formData.photo.photo_date = new Date()

      if (user.value && user.value.uname) {
        formData.photo.author = user.value.uname
      }

      formData.fileinput.section = FileInputSectionType.POST
      formData.fileinput.section_id = genid()
    }

    watch(
      () => props.primaryClickTimestamp, () => {
        submitPost()
      })

    function created () {
      setInitialFormData()
    }

    onMounted(()=>resetForm())

    return ({
      previewUrls,
      setFile,
      formData,
      user,
      formPending,
      resetForm,

      rapids,
      created,
      submitPost,
      fieldsDisabled,
      postFormData,
      parentIsModal

    })
  }
}

)
</script>
<docs>

## note

keep `data-modal-primary-focus` on file uploader component otherwise buttons will be focused.
primary objective to upload, keep attention at top of screen.

</docs>
