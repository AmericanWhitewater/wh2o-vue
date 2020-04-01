<template>
  <div class="user-logout">
    <loading-block
      height="200"
      text="Goodbye"
    />
  </div>
</template>

<script>
/**
 * @todo need to reset the entire store when user logs out.
 *
 */
import { LoadingBlock } from '@/app/global/components'
import { userActions } from '@/app/views/user/shared/state'
import { appLocalStorage } from '@/app/global/services'
export default {
  name: 'user-logout',
  components: {
    LoadingBlock
  },
  created () {
    appLocalStorage.removeItem('wh2o-auth')
    this.$store.dispatch(userActions.LOGOUT)
  },
  mounted () {
    const self = this
    setTimeout(() => {
      self.$router.replace('/user/access/login')
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.user-logout {
}
</style>
