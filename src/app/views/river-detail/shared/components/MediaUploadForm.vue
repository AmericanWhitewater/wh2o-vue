<template>
  <div class="media-upload-form">
    <h2 v-if="title" class="mb-spacing-md" v-text="title" />
    <div class="grid">
      <div class="bx--row">
        <div class="bx--col-lg-2 tab-bg">
          <div class="overflow">
            <div
              :class="[
                { 'tab-on': currentTab < 0 },
                { 'tab-off': currentTab >= 0 },
              ]"
              @click="currentTab = -1"
            >
              Overview
            </div>
            <div
              v-for="(photo, index) in post.photos"
              :key="photo.id"
              :class="[
                { 'tab-off': currentTab !== index },
                { 'tab-on': currentTab === index },
              ]"
              @click="currentTab = parseInt(index)"
            >
              <photo-image :photo="photo" />
            </div>
          </div>
        </div>

        <div class="bx--col-lg-14">
          <photo-post-form
            v-if="currentTab < 0"
            :value="post"
            :is-form-pending="formPending"
            :parent-is-modal="parentIsModal"
            @input="updatePost"
            @setFile="setNewFileLocal"
          />
          <photo-form
            v-if="currentTab >= 0"
            :value="currentPhoto"
            :is-form-pending="formPending"
            :rapids="rapids"
            @input="updatePhoto"
            @setFileForPhoto="setFileFileForPhotoLocal"
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

  setup(props, context) {
    // management functions come from usePost.
    const postManager = usePost();
    //ui tracked here and defaults set with the following computed fields
    const post = ref(postManager.currentPost.value);
    const currentTab = ref<number>(-1);
    const user = computed(
      () => context.root.$store.state.userState.userData.data as UserType
    );
    const fieldsDisabled = computed(() => {
      return !user.value || postManager.formPending.value;
    });
    const parentIsModal = computed(() => {
      return !!context?.parent?.$refs.modalDialog;
    });
    const rapids = computed(
      () => context.root.$store.state.riverDetailState.rapidsData.data
    );
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

    const reach_id = computed(() => {
      return context.root.$route.params.id;
    });

    postManager.setPostDefaults({
      user_id: user.value?.uid,
      user_name: user.value?.uname,
      gauge_id: 0,
      reach_id: parseInt(reach_id.value),
    });

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
        postManager.resetForm();
        currentTab.value = -1;
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

    watch(
      () => props.primaryClickTimestamp,
      () => submitPost()
    );

    function updatePhoto(p: PhotoType) {
      postManager.setActivePhotoFields(p);
    }

    watch(
      () => currentTab.value,
      () =>
        postManager.switchActivePhoto(
          postManager.currentPost.value.photos[currentTab.value].id
        )
    );
    function updatePost(p: PostType) {
      postManager.setActivePostFields(p);
    }

    watch(
      () => postManager.currentPost.value,
      () => {
        if (!isEqual(post.value, postManager.currentPost.value)) {
          post.value = cloneDeep(postManager.currentPost.value);
        }
      },
      { deep: true }
    );
    watch(
      () => props.value,
      () => postManager.setActivePostFields(props.value as PostType)
    );
    onMounted(() => postManager.resetForm());
    return {
      ...postManager,
      post,
      currentTab,
      rapids,
      updatePost,
      parentIsModal: parentIsModal,
      fieldsDisabled,
      setNewFileLocal,
      setFileFileForPhotoLocal,
      updatePhoto,
      currentPost: computed(
        () => postManager.currentPost.value ?? PostFactory.new()
      ),
    };
  },
});
</script>
<style lang="scss">
.tab-on {
  background: white;
  border-right: none;
}
.tab-off {
  background: grey;
}

.tab-bg {
  background: #537653;
  padding: 0;
}

.tab-on,
.tab-off {
  height: 100px;
  border: darkgray solid 1px;
  padding-left: 10px;
  padding-top: 10px;
  margin-top: 10px;
}
</style>
<docs>

## note

keep `data-modal-primary-focus` on file uploader component otherwise buttons will be focused.
primary objective to upload, keep attention at top of screen.

</docs>
