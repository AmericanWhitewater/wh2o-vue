<template>
  <div class="register">
    <cv-text-input
      v-model="newUser.userName"
      class="mb-spacing-sm"
      label="Email"
      type="text"
    />
    <cv-text-input
      v-model="newUser.passWord"
      class="mb-spacing-sm"
      label="Password"
      type="password"
    />
    <p
      class="bx--type--caption mb-spacing-md text-underline cursor-pointer"
      @click="viewTerms"
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
    <cv-button
      kind="primary"
      small
      @click="submitRegistration"
      v-text="'Register'"
    />
  </div>
</template>
<script>
export default {
  name: "user-register",
  data: () => ({
    newUser: {
      userName: "",
      passWord: "",
      termsConfirmed: false
    }
  }),
  methods: {
    viewTerms() {
      alert("view terms clicked");
    },
    submitRegistration() {
      alert("submitted");
    }
  }
};
</script>
<style lang="scss">
.register {
  p {
    font-size: 0.75rem;
    letter-spacing: 0.32px;
  }
}
</style>
