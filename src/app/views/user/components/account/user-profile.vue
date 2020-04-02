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
              :image-u-r-i="`https://americanwhitewater.org/${data.image.uri.big || data.image.uri.medium}`"
              :username="data.uname"
            />
          </div>
          <div class="bx--col">
            <h2 v-text="data.uname" />
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
export default {
  name: 'user-profile',
  components: {
    UserAvatar,
    UtilityBlock
  },
  computed: {
    ...mapState({
      data: state => state.userState.userData.data,
      loading: state => state.userState.userData.loading,
      error: state => state.userState.userData.error
    })
  }
}
</script>
