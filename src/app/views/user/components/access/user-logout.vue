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
  name: 'UserLogout',
  components: {
    LoadingBlock
  },
  created () {
    appLocalStorage.setItem('wh2o-registered', false)
    this.$store.dispatch(userActions.RESET_USER)
  },
  mounted () {
    const self = this
    setTimeout(() => {
      self.$router.replace('/')
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.user-logout {

}
</style>
