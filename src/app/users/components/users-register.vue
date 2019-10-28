<template>
  <div class="register">
    <cv-text-input
      class="mb-spacing-sm"
      label="Email"
      type="text"
      v-model="newUser.userName"
    ></cv-text-input>
    <cv-text-input
      class="mb-spacing-sm"
      label="Password"
      type="password"
      v-model="newUser.passWord"
    ></cv-text-input>
    <p class="bx--type--caption mb-spacing-md" @click="viewTerms">
      Click to view terms &amp; conditions
    </p>
    <cv-checkbox
      class="mb-spacing-md"
      label="I agree to the terms"
      value="terms"
      v-model="newUser.termsConfirmed"
    ></cv-checkbox>
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
