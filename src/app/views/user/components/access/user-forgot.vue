<template>
  <div class="user-forgot">
    <cv-text-input
      ref="username"
      v-model="username"
      class="mb-spacing-lg"
      placeholder="Username or Email Address"
      type="text"
      theme="light"
      :disabled="formPending"
      @input="message = ''"
    >
      <template
        v-if="errorMsg"
        slot="invalid-message"
      >
        {{ errorMsg }}
      </template>
    </cv-text-input>
    <cv-button
      kind="primary"
      small
      class="mb-spacing-md"
      :disabled="username.length < 3 || formPending"
      @click.exact="submitForm"
      @keydown.enter="submitForm"
      v-text="'Submit'"
    />
  </div>
</template>

<script>
import { httpClient } from '@/app/global/services'
export default {
  name: 'user-forgot',
  data: () => ({
    username: '',
    formPending: false,
    message: null,
    status: null
  }),
  computed: {
    errorMsg () {
      if (this.message === "We can't find a user with that e-mail address.") {
        return "We can't find a user with that e-mail address."
      }
      return null
    }
  },
  methods: {
    async submitForm () {
      this.formPending = true
      await httpClient.post('/graphql', {
        query: `
          mutation {
            forgotPassword(input: {email: "${this.username}"}) {
              message
              status
            }
          }`
      }).then(r => {
        this.formPending = false
        this.message = r.data.data.forgotPassword.message
        this.username = ''
      }).catch(() => {
        this.formPending = false
      })
    }
  },
  mounted () {
    this.$refs.username.$refs.input.focus()
  }
}
</script>
