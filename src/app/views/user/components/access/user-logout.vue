<template>
  <div class="user-logout">
    <utility-block
      state="loading"
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
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { userActions } from '@/app/views/user/shared/state'
import { appLocalStorage } from '@/app/global/services'
export default {
  name: 'user-logout',
  components: {
    UtilityBlock
  },
  created () {
    appLocalStorage.removeItem('wh2o-auth')
    this.$store.dispatch(userActions.LOGOUT)
  },
  mounted () {
    setTimeout(() => {
      this.$router.replace('/user/access/login')
    }, 1000)
  }
}
</script>
