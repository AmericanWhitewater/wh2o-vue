<template>
  <div class="register">
    <cv-text-input
      v-model="formData.name"
      class="mb-spacing-sm"
      label="Full Name"
      type="text"
      theme="light"
    />
    <cv-text-input
      v-model="formData.password"
      class="mb-spacing-sm"
      label="Password"
      type="password"
      theme="light"
    />
    <cv-text-input
      v-model="formData.password_confirmation"
      class="mb-spacing-sm"
      label="Confirm Password"
      type="password"
      theme="light"
    >
      <template
        v-if="passwordMatchError"
        slot="invalid-message"
      >
        Passwords do not match
      </template>
    </cv-text-input>
    <p
      class="mb-spacing-md terms-trigger"
      @click="termsVisible = true"
    >
      Click to view terms of service
    </p>
    <div class="mb-sm">
      <cv-checkbox
        v-model="formData.termsConfirmed"
        label="I agree to the terms"
        value="terms"
      />
    </div>
    <cv-button
      kind="primary"
      :disabled="submitDisabled"
      small
      @click="submitRegistration"
      v-text="'Submit'"
    />
    <cv-modal
      :visible="termsVisible"
      @modal-hidden="termsVisible = false"
    >
      <template slot="label">
        Effective 03-01-2019
      </template>
      <template slot="title">
        Terms of Service
      </template>
      <template slot="content">
        <terms-of-service
          hide-sidebar
          hide-title
        />
      </template>
      <template slot="primary-button">
        Close
      </template>
    </cv-modal>
  </div>
</template>
<script>
import { httpClient } from '@/app/global/services'
import TermsOfService from '@/app/views/static-routes/legal/terms-of-service'
export default {
  name: 'user-register',
  components: {
    TermsOfService
  },
  data: () => ({
    termsVisible: false,
    formPending: false,
    formError: false,
    confirmationError: false,
    passwordMatchError: false,
    termsConfirmed: false,
    formData: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }),
  computed: {
    submitDisabled () {
      if (this.formData.termsConfirmed) {
        return false
      }
      return true
    }
  },
  methods: {
    /**
     * @todo form validation. Look at vuelidate
     * @link https://vuelidate.js.org/
     *
     */
    async submitRegistration () {
      if (!this.termsConfirmed) {
        this.confirmationError = true
      } else {
        this.confirmationError = false
      }

      if (this.formData.password !== this.formData.password_confirmation) {
        this.passwordMatchError = true
      } else {
        this.passwordMatchError = false
      }

      if (!this.confirmationError && !this.passwordMatchError) {
        await httpClient.post('/graphql', {
          query: `
              mutation {
                register(
                  input: {
                    name: "${this.formData.name}", 
                    email: "${this.formData.email}", 
                    password: "${this.formData.password}", 
                    password_confirmation: "${this.formData.password_confirmation}"
                  }) {
                  access_token
                  expires_in
                  refresh_token
                  token_type
                }
              }`
        }).then(r => {
          // eslint-disable-next-line no-console
          console.log('r :', r)

          //  appLocalStorage.setItem('wh2o-registered', true)
          // this.$gtag.event('registration', { method: 'Google' })
          // this.$router.replace('/user/account/1/bookmarks')
        }).catch(e => {
          // eslint-disable-next-line no-console
          console.log('e :', e)
        })
      }
    }
  }
}
</script>
<style lang="scss">
.register {
  h2,
  p {
    margin-bottom: 1.25rem;
  }

  .terms-trigger {
    @include carbon--type-style("code-01");
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
