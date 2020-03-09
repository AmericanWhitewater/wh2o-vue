<template>
  <div class="login">
    <cv-text-input
      v-model="email"
      class="mb-spacing-sm"
      placeholder="Email Address"
      type="email"
      theme="light"
      @keydown.enter="submitLogin"
    />
    <cv-button
      v-if="email.length > 0"
      kind="primary"
      small
      class="mb-sm"
      :disabled="email.length === 0"
      @click="submitLogin"
      v-text="'Login'"
    />
  </div>
</template>
<script>
import { userActions } from '../../shared/state'
import { globalAppActions } from '@/app/global/state'
import { appLocalStorage } from '@/app/global/services'
/**
 * @displayName User Login
 */
export default {
  name: 'UserLogin',
  data: () => ({
    email: 'betaTester@aw.org'
  }),
  metaInfo () {
    return {
      title: 'Login - American Whitewater'
    }
  },
  methods: {
    submitLogin () {
      if (this.email === 'wh2o-admin') {
        this.$store.dispatch(userActions.USER_LOGIN, {
          admin: 'admin'
        })
      } else {
        this.$store.dispatch(userActions.USER_LOGIN, {
          admin: null
        })
      }
      appLocalStorage.setItem('wh2o-registered', true)
      this.$store.dispatch(globalAppActions.SEND_TOAST, {
        title: 'Welcome back!',
        kind: 'info',
        contrast: false,
        action: false,
        autoHide: true
      })
      this.$router.push('/user/account/1/bookmarks')
    }
  }
}
</script>
<style lang="scss"></style>
