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
      class="bx--type--caption mb-spacing-md"
      @click="viewTerms"
    >
      Click to view terms &amp; conditions
    </p>
    <cv-checkbox
      v-model="newUser.termsConfirmed"
      class="mb-spacing-md"
      label="I agree to the terms"
      value="terms"
    />
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
  name: "UsersRegister",
  data: () => {
    return {
      newUser: {
        userName: "",
        passWord: "",
        termsConfirmed: false
      }
    };
  },
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
