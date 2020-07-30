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
        <template v-if="user && comment.user.uid === user.uid">
          <cv-button
            size="small"
            kind="secondary"
            @click.exact="$emit('comment:edit', comment)"
            @keydown.enter="$emit('comment:edit', comment)"
          >
            Edit
          </cv-button>
          <cv-button
            size="small"
            kind="danger"
            class="mb-spacing-xs"
            @click.exact="deleteCommentModalVisible = true"
            @keydown.enter="deleteCommentModalVisible = true"
          >
            Delete
          </cv-button>
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
    <cv-modal
      :visible="deleteCommentModalVisible"
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
import { globalAppActions } from '@/app/global/state'
import { httpClient } from '@/app/global/services'
export default {
  name: 'comment',
  components: {
    UserAvatar
  },
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
    user () {
      return this.$store.state.userState.userData.data
    },
    reachId () {
      return this.$route.params.id
    }
  },
  methods: {
    formatURI (input) {
      if (input) {
        return `https://americanwhitewater.org${input}`
      }

      return null
    },
    deleteComment (commentId) {
      this.deleteCommentModalVisible = false
      httpClient
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
            this.$store.dispatch(globalAppActions.SEND_TOAST, {
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
