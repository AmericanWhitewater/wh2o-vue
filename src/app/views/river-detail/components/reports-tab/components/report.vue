<template>
  <div v-if="data.detail" class="mb-sm report bx--tile">
    <div class="bx--row">
      <div class="bx--col-sm-12 bx--col-md-1">
        <user-avatar
          theme="light"
          :image-u-r-i="formatURI(data.user.image.uri.big)"
          :username="data.user.uname"
        />
      </div>
      <div class="bx--col-sm-3 bx--col-lg-11">
        <h5 class="mr-spacing-sm" v-text="data.user.uname" />
        <h6
          class="date mb-spacing-xs"
          v-text="formatDate(data.post_date, 'll')"
        />
        <hr v-if="!editMode" >
        <template v-if="editMode">
          <cv-button
            v-if="canEdit(data)"
            size="small"
            kind="secondary"
            @click.exact="$emit('report:edit', data)"
            @keydown.enter="$emit('report:edit', data)"
          >
            Edit
          </cv-button>
          <cv-button
            v-if="canDelete(data)"
            size="small"
            kind="danger"
            class="mb-spacing-xs"
            @click.exact="deleteCommentModalVisible = true"
            @keydown.enter="deleteCommentModalVisible = true"
          >
            Delete
          </cv-button>
          <hr v-if="editMode" >
        </template>
      </div>
    </div>
    <div class="bx--row">
      <div class="bx--col bx--offset-md-1">
        <div class="detail" v-html="data.detail" />
      </div>
    </div>
    <cv-modal
      ref="modalWrapper"
      :visible="deleteCommentModalVisible"
      @modal-shown="setModalOffset"
      @secondary-click="deleteCommentModalVisible = false"
      @modal-hidden="deleteCommentModalVisible = false"
      @primary-click="handleDelete(data.id)"
    >
      <template slot="title"> Confirm Delete </template>
      <template slot="content">
        Are you sure you want to delete this data? This cannot be undone.
      </template>
      <template slot="secondary-button"> Cancel </template>
      <template slot="primary-button"> Submit </template>
    </cv-modal>
  </div>
</template>
<script>
import UserAvatar from "@/app/global/components/user-avatar/user-avatar";
import {
  shadowDomFixedHeightOffset,
  objectPermissionsHelpersMixin,
} from "@/app/global/mixins";
import {deleteComment} from "@/app/services";
import { baseUrl } from "@/app/environment";

export default {
  name: "report",
  components: {
    UserAvatar,
  },
  mixins: [shadowDomFixedHeightOffset, objectPermissionsHelpersMixin],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    deleteCommentModalVisible: false,
    editCommentModalVisible: false,
    formData: {
      detail: "",
    },
  }),
  computed: {
    editMode() {
      return this.$store.state.Global.editMode;
    },
    user() {
      return this.$store.state.User.data;
    },
    reachId() {
      return this.$route.params.id;
    },
  },
  methods: {
    formatURI(input) {
      if (input) {
        return `${baseUrl}${input}`;
      }
      return null;
    },
    async handleDelete(commentId) {
      this.deleteCommentModalVisible = false;

      try {
        const result = await deleteComment(commentId);

        if (!result.errors) {
          this.$store.dispatch("Global/sendToast", {
            title: "Report Removed",
            kind: "success",
            override: true,
            contrast: false,
            action: false,
            autoHide: true,
          });
          this.$emit("data:delete", this.data.id);
        } else {
          this.$store.dispatch("Global/sendToast", {
            title: "Delete Failed",
            kind: "error",
            override: true,
            contrast: false,
            action: false,
            autoHide: true,
          });
        }
      } catch (error) {
        this.$store.dispatch("Global/sendToast", {
          title: "Delete Failed",
          kind: "error",
          override: true,
          contrast: false,
          action: false,
          autoHide: true,
        });
      }
    },
  },
  mounted() {
    this.formData.detail = this.data.detail;
  },
};
</script>
