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
      :disabled="loading"
      @click.exact="openModal"
      @keydown.enter="openModal"
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
            v-for="(c, i) in comments"
            :key="i"
            :comment="c"
            @comment:delete="loadComments"
            @comment:edit="editComment"
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
    <template v-else-if="error">
      <utility-block state="error" />
    </template>
    <post-update-modal
      :visible="postUpdateModalVisible"
      kind="COMMENT"
      title="New Comment"
      :reach-id="$route.params.id"
      :post="activeEditComment"
      @update:submitted="postUpdateModalVisible = false"
      @update:success="handleSuccess"
      @update:cancelled="handleCancel"
    >
      <template #form-fields="formData">
        <cv-text-area
          v-model="formData.formData.post.detail"
          label="Message"
          theme="light"
          class="mb-spacing-md"
        />
      </template>
    </post-update-modal>
  </section>
</template>

<script>
import { commentsActions } from '@/app/views/river-detail/shared/state'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import PostUpdateModal from '@/app/global/components/post-update-modal/post-update-modal'
import { globalAppActions } from '@/app/global/state'
import { mapState } from 'vuex'
import { Comment } from './components'
export default {
  name: 'comments-section',
  components: {
    UtilityBlock,
    Comment,
    PostUpdateModal
  },
  data: () => ({
    activeEditComment: null,
    postUpdateModalVisible: false,
    formData: {
      detail: ''
    }
  }),
  computed: {
    ...mapState({
      comments: state => state.RiverComments.data,
      loading: state => state.RiverComments.loading,
      error: state => state.RiverComments.error,
      user: state => state.User.data
    })
  },
  methods: {
    openModal () {
      if (!this.user) {
        this.$store.dispatch('Global/sendToast', {
          title: 'Please Log In',
          kind: 'info'
        })
      } else {
        this.postUpdateModalVisible = true
      }
    },
    editComment (post) {
      this.postUpdateModalVisible = true
      this.activeEditComment = post
    },
    loadComments () {
      this.$store.dispatch('RiverComments/getProperty', this.$route.params.id)
    },
    handleCancel () {
      this.postUpdateModalVisible = false
      this.activeEditComment = Object.assign({}, {})
    },
    handleSuccess () {
      this.loadComments()
      this.postUpdateModalVisible = false
      this.$store.dispatch('Global/sendToast', {
        title: this.activeEditComment ? 'Comment Edited' : 'Comment Added',
        kind: 'success'
      })
    }
  }
}
</script>
