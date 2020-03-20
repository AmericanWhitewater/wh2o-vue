<template>
  <div class="user-forgot">
    <cv-form>
      <cv-text-input
        v-model="username"
        class="mb-spacing-lg"
        placeholder="Email Address"
        type="email"
        theme="light"
      />
      <cv-button
        kind="primary"
        small
        class="mb-spacing-md"
        :disabled="username.length < 3"
        @click="submitForm"
        v-text="'Submit'"
      />
    </cv-form>
  </div>
</template>

<script>
export default {
  name: 'user-forgot',
  data: () => ({
    username: ''
  }),
  methods: {
    submitForm () {
      // eslint-disable-next-line no-console
      console.log('form submit')
    }
  }
}
</script>

<style lang="scss">
.user-forgot {

}
</style>
