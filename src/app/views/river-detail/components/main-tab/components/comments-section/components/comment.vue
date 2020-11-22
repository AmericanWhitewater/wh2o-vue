<template>
  <div
    class="mb-sm comment"
  >
    <div class="bx--row">
      <div class="bx--col-sm-12 bx--col-md-1">
        <user-avatar
          :image-u-r-i="formatURI(comment.user.image.uri.big)"
          :username="comment.user.uname"
        />
      </div>
      <div class="bx--col-sm-3 bx--col-lg-11">
        <h5
          class="mr-spacing-sm"
          v-text="comment.user.uname"
        />
        <h6
          class="date mb-spacing-xs"
          v-text="formatDate(comment.post_date, 'll')"
        />
        <hr v-if="!editMode" >
        <template v-if="editMode">
          <cv-button
            v-if="canEdit(comment)"
            size="small"
            kind="secondary"
            @click.exact="$emit('comment:edit', comment)"
            @keydown.enter="$emit('comment:edit', comment)"
          >
            Edit
          </cv-button>
          <cv-button
            v-if="canDelete(comment)"
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
      <div class="bx--col bx--offset-md-1 ">
        <div
          class="detail"
          v-html="comment.detail"
        />
      </div>
    </div>
    <!-- <div class="bx--row">
      <div class="bx--col bx--offset-md-6">
        <a href="#">Report Comment</a>
      </div>
    </div> -->
    <cv-modal
      ref="modalWrapper"
      :visible="deleteCommentModalVisible"
      @modal-shown="setModalOffset"
      @secondary-click="deleteCommentModalVisible = false"
      @modal-hidden="deleteCommentModalVisible = false"
      @primary-click="deleteComment(comment.id)"
    >
      <template slot="title">
        Confirm Delete
      </template>
      <template slot="content">
        Are you sure you want to delete this comment? This cannot be undone.
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        Submit
      </template>
    </cv-modal>
  </div>
</template>
<script>
import UserAvatar from '@/app/global/components/user-avatar/user-avatar'
import { shadowDomFixedHeightOffset, objectPermissionsHelpersMixin } from '@/app/global/mixins'
import http from '@/app/http'
import { baseUrl } from '@/app/environment'

export default {
  name: 'comment',
  components: {
    UserAvatar
  },
  mixins: [shadowDomFixedHeightOffset, objectPermissionsHelpersMixin],
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    deleteCommentModalVisible: false,
    editCommentModalVisible: false,
    formData: {
      detail: ''
    }
  }),
  computed: {
    editMode() {
      return this.$store.state.Global.editMode
    },
    user () {
      return this.$store.state.User.data
    },
    reachId () {
      return this.$route.params.id
    }
  },
  methods: {
    formatURI (input) {
      if (input) {
        return `${baseUrl}${input}`
      }
      return null
    },
    deleteComment (commentId) {
      this.deleteCommentModalVisible = false
      http
        .post('/graphql', {
          query: `
            mutation ($post_id:ID!){postDelete(id:$post_id){id}}
          `,
          variables: {
            post_id: commentId
          }
        })
        .then(r => {
          if (!r.errors) {
            this.$store.dispatch('Global/sendToast', {
              title: 'Comment Removed',
              kind: 'success',
              override: true,
              contrast: false,
              action: false,
              autoHide: true
            })
            this.$emit('comment:delete', this.comment.id)
          }
        })
        .catch(e => {
          // eslint-disable-next-line no-console
          console.log('e :', e)
        })
    }
  },
  mounted () {
    this.formData.detail = this.comment.detail
  }
}
</script>
