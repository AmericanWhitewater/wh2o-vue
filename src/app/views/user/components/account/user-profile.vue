<template>
  <div class="user-profile">
    <template v-if="loading">
      <utility-block
        state="loading"
        text="loading profile"
      />
    </template>
    <template v-else-if="data">
      <cv-tile>
        <div class="bx--row pl-spacing-md pt-spacing-sm pb-spacing-sm">
          <div class="bx--col-auto">
            <user-avatar
              :avatar-u-r-i="`${baseUrl}${data.image.uri.big || data.image.uri.medium}`"
              :username="data.name"
            />
          </div>
          <div class="bx--col">
            <h2 v-text="data.name" />
            <h3 v-text="data.email" />
          </div>
        </div>
      </cv-tile>
    </template>
    <template v-else>
      <utility-block
        state="error"
        text="failed to load profile"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserAvatar from '@/app/global/components/user-avatar/user-avatar'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { baseUrl } from '../../../../environment'

export default {
  name: 'user-profile',
  components: {
    UserAvatar,
    UtilityBlock
  },
  data: () => ({
    baseUrl: baseUrl
  }),
  computed: {
    ...mapState({
      data: state => state.User.data,
      loading: state => state.User.loading,
      error: state => state.User.error
    })
  }
}
</script>
