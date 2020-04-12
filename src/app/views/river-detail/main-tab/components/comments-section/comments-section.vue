<template>
  <section
    v-view.once="loadComments"
    class="comments-section"
  >
    <hr>
    <h2 class="mb-spacing-md">
      Comments
    </h2>
    <cv-button
      id="new-comment"
      kind="secondary"
      size="small"
      class="mb-spacing-lg"
      @click.exact="newCommentModalVisible = true"
      @keydown.enter="newCommentModalVisible = true"
    >
      New Comment
    </cv-button>
    <template v-if="loading">
      <utility-block state="loading" />
    </template>
    <template v-else-if="comments">
      <template v-if="comments.length > 0">
        <div class="comment-wrapper">
          <comment
            v-for="(c, i) in sortedComments"
            :key="i"
            :comment="c"
            @comment:delete="loadComments"
            @comment:edit="loadComments"
          />
        </div>
      </template>
      <template v-else>
        <utility-block
          state="content"
          text="No comments"
        />
      </template>
    </template>
    <template v-else>
      <utility-block state="error" />
    </template>
    <cv-modal
      :visible="newCommentModalVisible"
      size="large"
      @secondary-click="cancelNewComment"
      @primary-click="submitComment"
      @modal-hidden="newCommentModalVisible = false"
    >
      <template slot="title">
        New Comment
      </template>
      <template slot="content">
        <cv-text-area
          ref="message"
          v-model="formData.detail"
          label="Message"
          class="mb-spacing-md"
        />
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        Submit
      </template>
    </cv-modal>
  </section>
</template>

<script>
import { commentsActions } from '@/app/views/river-detail/shared/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { globalAppActions } from '@/app/global/state'
import { mapState } from 'vuex'
import { httpClient } from '@/app/global/services'
import { Comment } from './components'
export default {
  name: 'comments-section',
  components: {
    UtilityBlock,
    Comment
  },
  data: () => ({
    newCommentModalVisible: false,
    formData: {
      detail: ''
    },
    layoutOptions: {
      sidebar: {
        left: true
      }
    }
  }),
  computed: {
    ...mapState({
      comments: state => state.riverDetailState.commentsData.data,
      loading: state => state.riverDetailState.commentsData.loading,
      error: state => state.riverDetailState.commentsData.error,
      user: state => state.userState.userData.data
    }),
    reachId () {
      return this.$route.params.id
    },
    sortedComments () {
      if (this.comments) {
        return this.comments.sort((a, b) => (a.post_date < b.post_date ? 1 : -1))
      }
      return null
    }
  },
  methods: {

    loadComments () {
      this.$store.dispatch(commentsActions.FETCH_COMMENTS_DATA, this.reachId)
    },
    profilePreview (userid) {
      return userid
    },
    formatInitials (userName) {
      // helper to get the first and last initials for comment
      const splitName = userName.split(' ')
      const firstInitial = splitName[0].charAt(0)
      const lastInitial = splitName[splitName.length - 1].charAt(0)
      const initials = firstInitial + lastInitial
      return initials
    },
    cancelNewComment () {
      this.newCommentModalVisible = false
    },
    notifyUser () {
      this.newCommentModalVisible = false
      this.$store.dispatch(globalAppActions.SEND_TOAST, {
        title: 'Comment Added',
        kind: 'success',
        override: true,
        contrast: false,
        action: false,
        autoHide: true
      })
    },
    /**
     * @todo move this to the store.
     */
    submitComment () {
      if (this.user) {
        this.newCommentModalVisible = false

        const today = new Date()

        // We save the user input in case of an error
        const data = {
          id: this.$randomId,
          post: {
            user_id: this.user.uid,
            detail: this.formData.detail,
            post_date: today.toISOString(),
            post_type: 'COMMENT',
            reach_id: this.reachId
          }
        }

        httpClient
          .post('/graphql', {
            query: `
          mutation ($id:ID!, $post: PostInput!) {
              post:postUpdate(id: $id, post:$post)  {
              id
        }
        }`,
            variables: data
          })
          .then(r => {
            this.formData.detail = ''
            if (!r.errors) {
              this.$store.dispatch(globalAppActions.SEND_TOAST, {
                title: 'Comment Submitted',
                kind: 'success',
                override: true,
                contrast: false,
                action: false,
                autoHide: true
              })
              this.$store.dispatch(
                commentsActions.FETCH_COMMENTS_DATA,
                this.reachId
              )
            }
          })
          .catch(e => {
            this.formData.detail = ''
            // eslint-disable-next-line no-console
            console.log('e :', e)
          })
      }
    }
  }
}
</script>

<style lang="scss">
.comment {
  padding: $spacing-md;
  &:hover {
    @include layer("raised");
  }

  .detail {
    @include carbon--type-style("body-long-01");
  }
  .date {
    @include carbon--type-style("label-01");
  }
}
</style>
