<template>
  <div class="register">
    <cv-text-input
      v-model="newUser.email"
      class="mb-spacing-sm"
      label="Email"
      type="text"
    />
    <p
      class="bx--type--caption mb-spacing-md text-underline cursor-pointer"
      @click="termsVisible = true"
    >
      Click to view terms &amp; conditions
    </p>
    <div class="mb-spacing-lg">
      <cv-checkbox
        v-model="newUser.termsConfirmed"
        label="I agree to the terms"
        value="terms"
      />
    </div>

    <div class="mb-spacing-lg">
      <cv-inline-notification
        v-if="confirmationError"
        kind="error"
        title="Confirmation of Terms required."
      />
    </div>
    <cv-button
      kind="primary"
      :disabled="newUser.email.length === 0"
      small
      @click="submitRegistration"
      v-text="'Register'"
    />
    <cv-modal
      :visible="termsVisible"
      @modal-hidden="termsVisible = false"
    >
      <template slot="label">
        Effective 01-01-2020
      </template>
      <template slot="title">
        Terms of Use
      </template>
      <template slot="content">
        <h2>Cookies</h2>
        <p>
          This app uses cookies to save bookmarked rivers.
        </p>
        <h2>Privacy</h2>
        <p>
          We will never sell your information.
        </p>
        <h2>Disclaimer</h2>
        <p>
          This app is not an official American Whitewater app. All flow data, river data, and blog posts are courtesy of American Whitewater.
        </p>
      </template>
      <template slot="primary-button">
        Close
      </template>
    </cv-modal>
  </div>
</template>
<script>

import { appLocalStorage } from '@/app/global/services'

export default {
  name: 'UserRegister',
  data: () => ({
    termsVisible: false,
    confirmationError: false,
    newUser: {
      email: '',
      termsConfirmed: false
    }
  }),
  methods: {
    viewTerms () {
      alert('view terms clicked')
    },
    submitRegistration () {
      if (!this.newUser.termsConfirmed) {
        this.confirmationError = true
      } else {
        appLocalStorage.setItem('wh2o-registered', true)
        this.$router.replace('/user/account/1/bookmarks')
      }
    }
  }
}
</script>
<style lang="scss">
.register {
  h2, p {
  margin-bottom:1.25rem;
  }
}
</style>
