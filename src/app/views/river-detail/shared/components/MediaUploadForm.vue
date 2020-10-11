<template>

  <div class="media-upload-form">
    <h2
        v-if="title"
        class="mb-spacing-md"
        v-text="title"
    />
    <div class="grid">
      <div class="bx--row">
        <div class="bx--col-sm-2"/>

        <div class="bx--col-sm-14">
          <photo-post-form
              v-if="selectedTab==-1"
              :value="currentPost" :is-form-pending="formPending"
                           :parent-is-modal="parentIsModal"  @setFile="setNewFile"/>
          <photo-form :value="currentPhoto" @input="updatePhoto" @setFile="setFileForPhoto"/>
        </div>
      </div>
    </div>



  </div>
</template>

<script lang="ts">
import {globalAppActions} from '@/app/global/state'

import genid from '@bit/aw.utility.genid'
import {computed, defineComponent, onMounted, PropType, reactive, ref, watch} from '@vue/composition-api'
import {
  PhotoFactory,
  PostRepository,
  PostTypeEnum,
  FileInputSectionType,
  PostInputType, PostFactory,
  FileInputType, PhotoInputType, PhotoType
} from '@bit/aw.models.post'
import {FileAttachmentType} from "@/app/views/river-detail/shared/components/lib/types";
import {PostType} from "@bit/aw.models.post";
import PhotoForm from "./PhotoForm.vue"
import PhotoPostForm from "@/app/views/river-detail/shared/components/PhotoPostForm.vue";
import {cloneDeep} from "@apollo/client/utilities";
import {usePost} from "@/app/views/river-detail/shared/components/lib/use-post";
import {UserType} from "../../../../../../components/models/user/types";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
      name: 'media-upload-form',
      components: {
        PhotoPostForm,

        PhotoForm,

      },
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
        },
        value: {
          type: Object as PropType<PostType>,
          required: false,
          default: () => PhotoFactory.new()
        }
      },

      setup(props, context) {
        const postManager = usePost();


        const rapids = computed(() => {
          return context.root.$store.state.riverDetailState.rapidsData.data
        })
        const user = computed(() =>
            context.root.$store.state.userState.userData.data as UserType
        )

        postManager.setPostDefaults({user_id: user.value?.uid, user_name: user.value?.uname, reach_id:})


        async function submitPost() {
          formPending.value = true
          try {
            await postManager.updatePost();
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

        watch(
            () => props.primaryClickTimestamp, () => {
              submitPost()
            });


        async function uploadFile({photo, file}: { photo: PhotoType; file: File }) {
          try {
            await postManager.uploadFile({photo, file})
          } catch
              (err) {

            context.emit('form:error')
            // @ts-ignore
            context.root.$store.dispatch(globalAppActions.SEND_TOAST, {
              title: 'Upload Failed',
              kind: 'error'
            })
          }
        }

        const fieldsDisabled = computed(() => {
          return !user.value || formPending.value
        })
        const parentIsModal = computed(() => {

          return !!context?.parent?.$refs.modalDialog
        })


        watch(() => props.value, () => postManager.setActivePost(props.value))
        onMounted(() => postManager.resetForm())
        return ({...postManager, rapids, parentIsModal, fieldsDisabled});
      }
    }
)
</script>
<docs>

## note

keep `data-modal-primary-focus` on file uploader component otherwise buttons will be focused.
primary objective to upload, keep attention at top of screen.

</docs>
