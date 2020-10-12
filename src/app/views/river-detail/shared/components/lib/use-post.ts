import { computed, ref } from "@vue/composition-api";
import { cloneDeep } from "@apollo/client/utilities";
import {
  FileInputSectionType,
  FileInputType,
  PhotoFactory,
  PhotoType,
  PostFactory,
  PostRepository,
  PostType,
  PostTypeEnum,
} from "@bit/aw.models.post";
import { FileAttachmentType } from "@/app/views/river-detail/shared/components/lib/types";
import genid from "@bit/aw.utility.genid";
import { addOrUpdate } from "@/aw/utility/array";

export interface PostDefaultsType {
  reach_id: number;
  gauge_id: number;
  user_id: number;
  user_name: string;
}

export class UsePostException extends Error {}

export function usePost() {
  //** set the defaults that we will use when posting the form.
  let postDefaults: PostDefaultsType = {
    reach_id: 0,
    gauge_id: 0,
    user_id: 0,
    user_name: "",
  };

  //** represents active post -- holds a place holder until initialized
  const internalPost = ref<PostType>(PostFactory.new());

  //** represents active photo -- at first holds a placeholder
  const internalPhoto = ref<PhotoType>(PhotoFactory.new());

  //** boolean is the form doing IO on this post?
  const formPending = ref<boolean>(false);

  //** form data for current photo

  /**
   * Resets the photo info for next photo, if you need a new photo
   * this clears the "active" form.
   */
  function newActivePhoto() {
    formPending.value = false;
    internalPhoto.value = PhotoFactory.new();
    internalPhoto.value.id = genid();
    internalPhoto.value.post_id = internalPost.value.id;
    internalPhoto.value.author = postDefaults.user_name;
  }

  /**
   * Finds the photo in the post and updates the fields.
   */
  function updatePhotoInPost(p: PhotoType) {
    addOrUpdate((a) => a.id == p.id, internalPost.value.photos, cloneDeep(p));
  }

  /**
   * changes the photo we are editing to the ID given
   * @param id
   */
  function switchActivePhoto(id: string) {
    const photo = internalPost.value.photos.find((x) => x.id == id);
    // internalPhoto starts disconnected, becomes connected with a photo upload

    if (id == internalPhoto.value.id && !photo) {
      internalPost.value.photos.push(cloneDeep(internalPhoto.value));
    } else {
      //id specified neither a disconnected photo or existing id.
      if (!photo) {
        throw new UsePostException(`Cannot make invalid photo ID active ${id}`);
      }
      // only need to switch the edit form if it is not currently active.
      internalPhoto.value = cloneDeep(photo);
    }
  }

  /**
   * Saves the current photo, updates current form fields,
   * switching photo to the active form if necessary.
   * @param p
   */
  function setActivePhotoFields(p: PhotoType) {
    updatePhotoInPost(p);
    switchActivePhoto(p.id);
  }

  /**
   * Sets the defaults for the form based on the environment.
   * @param defaults
   */
  function setPostDefaults(defaults: PostDefaultsType) {
    postDefaults = defaults;
    internalPost.value = {
      ...internalPost.value,
      user_id: defaults.user_id,
      reach_id: defaults.reach_id,
      gauge_id: defaults.gauge_id,
    };
    internalPhoto.value = {
      ...internalPhoto.value,
      author: defaults.user_name,
    };
  }

  function setActivePostFields(post: PostType) {
    internalPost.value = { ...post, photos: internalPost.value.photos };
  }

  /**
   * Upload a file from a photo.
   * @param photo
   * @param file
   */
  async function uploadFile({ photo, file }: { photo: PhotoType; file: File }) {
    const photoinput = PhotoFactory.Photo2PhotoInput(photo);
    const input: FileInputType = {
      section_id: photo.id,
      section: FileInputSectionType.POST,
      file: file,
    };

    formPending.value = true;
    try {
      const newphoto = await PostRepository.sendFile({
        id: photo.id,
        photo: photoinput,
        fileinput: input,
      });
      if (newphoto) {
        setActivePhotoFields(newphoto);
      }
    } finally {
      formPending.value = false;
    }
  }

  let photo_num = 0;

  /**
   * Sends a new file to the server as part of the post.
   * Creates the entry for the photo and sets the active form for that photo.
   * @param input
   */
  async function setNewFile(input: Array<FileAttachmentType>) {
    for (let i = 0; i < input.length; i++) {
      const file = input[i];
      const newPhoto = {
        ...PhotoFactory.new(),
        id: genid(),
        caption: `${
          internalPost.value.title ? internalPost.value.title : "Photo"
        } #${++photo_num}`,
      };
      await uploadFile({ photo: newPhoto, file: file.file });
    }
  }

  async function setFileForPhoto({
    photo,
    input,
  }: {
    photo: PhotoType;
    input: FileAttachmentType[];
  }) {
    if (input.length) {
      await uploadFile({ photo: photo, file: input[0].file });
    }
  }

  async function updatePhoto(p: PhotoType) {
    await PostRepository.updatePhoto(p);
  }

  /**
   * Sends the post to the server.
   */
  async function updatePost() {
    formPending.value = true;
    try {
      for (let i = 0; i < internalPost.value.photos.length; i++) {
        await updatePhoto(internalPost.value.photos[i]);
      }
      debugger;
      await PostRepository.updatePost({
        user_id: postDefaults.user_id,
        post: PostFactory.Post2PostInput(internalPost.value),
        id: internalPost.value.id,
        post_type: PostTypeEnum.JOURNAL,
      });
    } finally {
      formPending.value = false;
    }
  }

  /***
   * sets all the ids we need
   */
  function resetForm() {
    const post_id = genid();
    formPending.value = false;
    internalPost.value = { ...PostFactory.new() };
    internalPost.value.id = post_id;
    internalPost.value.reach_id = postDefaults.reach_id;
    internalPost.value.gauge_id = postDefaults.gauge_id;
    internalPost.value.user_id = postDefaults.user_id;

    newActivePhoto();
  }

  return {
    resetForm,
    setNewFile,
    setFileForPhoto,
    formPending: computed(() => formPending.value),
    currentPost: computed(() => internalPost.value),
    currentPhoto: computed(() => internalPhoto.value),
    setActivePhotoFields,
    setPostDefaults,
    setActivePostFields,
    switchActivePhoto,
    updatePost,
  };
}
