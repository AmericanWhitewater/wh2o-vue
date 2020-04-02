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
      kind="secondary"
      size="small"
      class="mb-spacing-lg"
      @click.exact="newCommentModalVisible = true"
    >
      New Comment
    </cv-button>
    <template v-if="loading">
      <utility-block state="loading" />
    </template>
    <template v-else-if="comments">
      <div class="comment-wrapper">
        <div
          v-for="(c, i) in comments.slice(0, 5)"
          :key="i"
          class="mb-md comment"
        >
          <div class="bx--row ">
            <div class="pl-sm bx--col-auto">
              <user-avatar
                :image-u-r-i="formatURI(c.user.image.uri.big)"
                :username="c.user.uname"
              />
            </div>
            <div class="bx--col-sm-12 bx--col-lg-11">
              <h5
                class="mr-spacing-sm"
                v-text="c.user.uname"
              />
              <h6
                class="date mb-spacing-xs"
                v-text="formatDate(c.post_date, 'll')"
              />
              <div
                class="detail"
                v-html="c.detail"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <utility-block state="error" />
    </template>
    <cv-modal
      :visible="newCommentModalVisible"
      @modal-hidden="cancelComment"
      @primary-click="notifyUser"
    >
      <template slot="title">
        New Comment
      </template>
      <template slot="content">
        <cv-text-area />
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
import UserAvatar from '@/app/global/components/user-avatar/user-avatar'
import { globalAppActions } from '@/app/global/state'
import { mapState } from 'vuex'

export default {
  name: 'comments-section',
  components: {
    UtilityBlock,
    UserAvatar
  },
  data: () => ({
    newCommentModalVisible: false,
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
      error: state => state.riverDetailState.commentsData.error
    }),
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
    cancelComment () {
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
    }
  }
}
</script>

<style lang="scss">
.comment {
  padding: $spacing-md;
  &:hover {
    @include layer('raised')
  }

  .detail {
    @include carbon--type-style("body-long-01");
  }
  .date {
    @include carbon--type-style("label-01");
  }
}

</style>
