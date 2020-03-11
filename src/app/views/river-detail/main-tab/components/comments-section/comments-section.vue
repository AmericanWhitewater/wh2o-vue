<template>
  <section class="comments-section">
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
    <template v-if="comments && !loading">
      <div

        class="comment-wrapper"
      >
        <div
          v-for="(c,i) in comments.slice(0,5)"
          :key="i"
          class="bx--tile mb-sm comment"
        >
          <div
            class="bx--row "
          >
            <div class=" bx--col-sm-12 bx--col-lg-3">
              <img
                class="mb-spacing-md"
                :src="`https://americanwhitewater.org${c.user.image.uri.big}`"
                alt=""
              >
            </div>
            <div class="bx--col-sm-12 bx--col-lg-11">
              <h5
                class="mr-spacing-sm"
                v-text="c.user.uname"
              />
              <span
                class="date"
                v-text="formatDate(c.post_date)"
              />
              <hr class="ui-01">
              <div
                class="detail"
                v-text="c.detail"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <loading-block v-if="loading" />
    <error-block v-if="!loading && error" />
    <cv-modal
      :visible="newCommentModalVisible"
      @modal-hidden="cancelComment"
      @primary-click="cancelComment"
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
import Moment from 'moment'
import { commentsActions } from '@/app/views/river-detail/shared/state'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'
import { mapState } from 'vuex'

export default {
  name: 'CommentsSection',
  components: {
    LoadingBlock,
    ErrorBlock
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
    formatDate (date) {
      return Moment(date).format('ll')
    },
    cancelComment () {
      this.newCommentModalVisible = false
    }
  },
  created () {
    this.$store.dispatch(commentsActions.FETCH_COMMENTS_DATA, this.reachId)
  }
}
</script>

<style lang="scss">
.comment {
 .detail {
    @include carbon--type-style('body-long-01')
 }
 .date {
   @include carbon--type-style('label-01')
 }
}
</style>
