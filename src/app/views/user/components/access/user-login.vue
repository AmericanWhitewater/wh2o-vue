<template>
  <section class="login">
    <main>
      <cv-text-input
        ref="username"
        v-model="formData.username"
        class="mb-spacing-sm"
        placeholder="Username"
        type="text"
        theme="light"
        :disabled="formPending"
      >
        <template
          v-if="usernameError"
          slot="invalid-message"
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
        :disabled="formPending"
        @keydown.enter="submitLogin"
      >
        <template
          v-if="passwordError"
          slot="invalid-message"
        >
          password error
        </template>
      </cv-text-input>
      <cv-button
        kind="primary"
        small
        class="mb-sm"
        :disabled="loginDisabled || formPending"
        @click.exact="submitLogin"
        @keydown.enter="submitLogin"
        v-text="'Submit'"
      />
    </main>
    <footer class="login-footer">
      <cv-link to="/user/access/forgot">
        Forgot Password
      </cv-link>
    </footer>
  </section>
</template>
<script>
import { appLocalStorage } from '@/app/global/services'
import { userLogin } from './services/user-login'
import {
  clientId,
  clientSecret
} from '@/app/environment'
/**
 * @displayName User Login
 */
export default {
  name: 'user-login',
  data: () => ({
    formPending: false,
    formError: false,
    formData: {
      grant_type: 'password',
      username: '',
      password: '',
      client_id: null,
      client_secret: null,
      scope: '*'
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
    user () {
      return this.$store.state.User.data
    },
    loginDisabled () {
      if (!this.formData.username || !this.formData.password) {
        return true
      }
      return false
    }
  },
  watch: {
    user (v) {
      if (v.uid) {
        this.$store.dispatch('Global/sendToast', {
          title: 'Welcome back!',
          kind: 'info',
          autoHide: true
        })
        setTimeout(() => {
          this.$router.push('/user/account/1/bookmarks')
        }, 500)
      }
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
        try {
          const input = JSON.stringify(this.formData)

          const result = await userLogin(input)

          if ('access_token' in result) {
            appLocalStorage.setItem('wh2o-auth', result.access_token)
            this.$store.dispatch('User/getProperty')
          }
        } catch (error) {
          this.formError = true
        } finally {
          this.formPending = false
        }
      }
    }
  },
  created () {
    this.formData.client_id = clientId
    this.formData.client_secret = clientSecret
  },
  mounted () {
    this.$refs.username.$refs.input.focus()
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
