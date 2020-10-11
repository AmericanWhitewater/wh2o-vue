<template>
  <div class="media-upload-form">
    <h2 v-if="title" class="mb-spacing-md" v-text="title" />
    <div class="grid">
      <div class="bx--row">
        <div class="bx--col-sm-2">
          <button @click="currentTab = -1">Main</button>
          <photo-image
            v-for="(photo, index) in post.photos"
            :key="photo.id"
            :photo="photo"
            @click="currentTab = parseInt(index)"
          />
        </div>

        <div class="bx--col-sm-14">
          <photo-post-form
            v-if="currentTab < 0"
            v-model="post"
            :is-form-pending="formPending"
            :parent-is-modal="parentIsModal"
            @setFile="setNewFileLocal"
          />
          <photo-form
            v-if="currentTab >= 0"
            :value="currentPhoto"
            @input="updatePhoto"
            @setFile="setFileFileForPhotoLocal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { globalAppActions } from "@/app/global/state";
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from "@vue/composition-api";
import {
  PhotoFactory,
  PhotoType,
  PostFactory,
  PostType,
  ReachType,
} from "@bit/aw.models.post";
import { FileAttachmentType } from "@/app/views/river-detail/shared/components/lib/types";
import PhotoForm from "./PhotoForm.vue";
import PhotoPostForm from "@/app/views/river-detail/shared/components/PhotoPostForm.vue";
import { usePost } from "@/app/views/river-detail/shared/components/lib/use-post";
import { UserType } from "../../../../../../components/models/user/types";
import isEqual from "lodash/isEqual";
import PhotoImage from "@/app/views/river-detail/shared/components/PhotoImage.vue";
import { cloneDeep } from "@apollo/client/utilities";
// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
  name: "media-upload-form",
  components: {
    PhotoPostForm,
    PhotoImage,
    PhotoForm,
  },
  props: {
    section: {
      type: String,
      required: true,
      validator: (val: string) =>
        ["RAPID", "POST", "GALLERY", "REACH"].indexOf(val) > -1,
    },
    primaryClickTimestamp: {
      type: Number,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: false,
    },
    value: {
      type: Object as PropType<PostType>,
      required: false,
      default: () => PhotoFactory.new(),
    },
  },
  data:()=>({}),

  setup(props, context) {
    // management functions come from usePost.
    const postManager = usePost();
    //ui tracked here and defaults set with the following computed fields

    const rapids = computed(
      () => context.root.$store.state.riverDetailState.rapidsData.data
    );
    const user = computed(
      () => context.root.$store.state.userState.userData.data as UserType
    );
    const reach = computed(
      () =>
        context.root.$store.state.riverDetailState.riverDetail.data as ReachType
    );

    postManager.resetForm();
    postManager.setPostDefaults({
      user_id: user.value?.uid,
      user_name: user.value?.uname,
      gauge_id: 0,
      reach_id: reach.value.id,
    });

    async function setNewFileLocal(input: Array<FileAttachmentType>) {
      try {
        await postManager.setNewFile(input);
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log("error :>> ", error);
        context.emit("form:error");
        // @ts-ignore
        await context.root.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: "Upload Failed",
          kind: "error",
        });
      }
    }

    async function setFileFileForPhotoLocal({
      photo,
      input,
    }: {
      photo: PhotoType;
      input: FileAttachmentType[];
    }) {
      try {
        await postManager.setFileForPhoto({ photo, input });
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log("error :>> ", error);
        context.emit("form:error");
        // @ts-ignore
        await context.root.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: "Upload Failed",
          kind: "error",
        });
      }
    }

    async function submitPost() {
      try {
        await postManager.updatePost();
        context.emit("form:success");
        // @ts-ignore
        context.root.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: "Media Uploaded",
          kind: "success",
        });
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log("error :>> ", error);
        context.emit("form:error");
        // @ts-ignore
        context.root.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: "Upload Failed",
          kind: "error",
        });
      }
    }
    // not sure why drew has this...
    watch(
      () => props.primaryClickTimestamp,
      () => submitPost()
    );

    const fieldsDisabled = computed(() => {
      return !user.value || postManager.formPending.value;
    });
    const parentIsModal = computed(() => {
      return !!context?.parent?.$refs.modalDialog;
    });

    function updatePhoto(p: PhotoType) {
      postManager.setActivePhotoFields(p);
    }

    const currentTab = ref<number>(-1);
    watch(
      () => currentTab,
      () =>
        postManager.switchActivePhoto(
          postManager.currentPost.value.photos[currentTab.value].id
        )
    );
    const post = ref(postManager.currentPost.value);
    watch(
      () => post.value,
      () =>
        !isEqual(post.value, postManager.currentPost.value) &&
        postManager.setActivePostFields(post.value)
    );
    watch(
      () => postManager.currentPost.value,
      () => (post.value = cloneDeep(postManager.currentPost.value)),
      { immediate: true }
    );
    watch(
      () => props.value,
      () => postManager.setActivePostFields(props.value as PostType)
    );
    context.onMounted(() => postManager.resetForm());
    return {
      ...postManager,
      rapids,
      parentIsModal,
      fieldsDisabled,
      setNewFileLocal,
      setFileFileForPhotoLocal,
      post,
      updatePhoto,
      currentTab,
      currentPost: computed(
        () => postManager.currentPost.value ?? PostFactory.new()
      ),
    };
  },
});
</script>
<docs>

## note

keep `data-modal-primary-focus` on file uploader component otherwise buttons will be focused.
primary objective to upload, keep attention at top of screen.

</docs>
