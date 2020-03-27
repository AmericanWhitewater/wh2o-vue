<template>
  <section class="login">
    <main>
      <cv-text-input
        v-model="formData.username"
        class="mb-spacing-sm"
        placeholder="Email Address"
        type="email"
        theme="light"
      >
        <template
          v-if="usernameError"
          #invalid-message
        >
          email error
        </template>
      </cv-text-input>
      <cv-text-input
        v-model="formData.password"
        class="mb-spacing-lg"
        placeholder="Password"
        type="password"
        theme="light"
        @keydown.enter="submitLogin"
      >
        <template
          v-if="passwordError"
          #invalid-message
        >
          password error
        </template>
      </cv-text-input>
      <cv-button
        kind="primary"
        small
        class="mb-sm"
        :disabled="loginDisabled"
        @click.exact="submitLogin"
        v-text="'Submit'"
      />
    </main>
    <footer class="login-footer">
      <cv-link to="/user/access/forgot">
        Forgot Password
      </cv-link>
      <div class="">
        <cv-button
          kind="tertiary"
          size="small"
        >
          <LogoFacebook24 />
        </cv-button>
      </div>
    </footer>
  </section>
</template>
<script>
import { globalAppActions } from '@/app/global/state'
import { appLocalStorage, httpClient } from '@/app/global/services'
import { userActions } from '../../../shared/state'
import {
  apiBaseUrl,
  clientId,
  clientSecret
} from '@/app/environment/environment'
/**
 * @displayName User Login
 */
export default {
  name: 'user-login',
  data: () => ({
    formData: {
      grant_type: 'password',
      username: '',
      password: '',
      client_id: 6,
      client_secret: null,
      scope: ''
    },
    usernameError: false,
    passwordError: false
  }),
  metaInfo () {
    return {
      title: 'Login - American Whitewater'
    }
  },
  computed: {
    loginDisabled () {
      if (!this.formData.username || !this.formData.password) {
        return true
      }
      return false
    }
  },
  methods: {
    /**
     * @temp until we get graphql wired
     * @todo form validation. Look at vuelidate
     * @link https://vuelidate.js.org/
     *
     */
    async submitLogin () {
      if (!this.formData.username) {
        this.usernameError = true
      } else {
        this.usernameError = false
      }

      if (!this.formData.password) {
        this.passwordError = true
      } else {
        this.passwordError = false
      }

      if (!this.passwordError && !this.usernameError) {
        const url = apiBaseUrl + 'oauth/authorize'
        const input = JSON.stringify(this.formData)
        const result = await httpClient.post(url, input).catch(e => {
          /* eslint-disable-next-line no-console */
          console.log('e :', e)
        })
        if (result) {
          this.$store.dispatch(userActions.USER_LOGIN, {
            admin: 'admin'
          })
          appLocalStorage.setItem('wh2o-registered', true)
          this.$gtag.event('login', { method: 'Google' })
          this.$router.replace('/user/account/1/bookmarks')
          this.$store.dispatch(globalAppActions.SEND_TOAST, {
            title: 'Welcome back!',
            kind: 'info',
            contrast: false,
            action: false,
            autoHide: true
          })
        }
      }
    }
  },
  created () {
    this.formData.client_id = clientId
    this.formData.client_secret = clientSecret
  }
}
</script>
<style lang="scss">
.login {
  footer.login-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
