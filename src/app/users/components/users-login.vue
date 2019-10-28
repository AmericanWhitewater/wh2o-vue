<template>
  <div class="login">
    <cv-text-input
      class="mb-spacing-sm"
      label="Username or Email"
      type="text"
      v-model="userName"
    ></cv-text-input>
    <cv-text-input
      class="mb-spacing-sm"
      label="Password"
      type="password"
      v-model="passWord"
    ></cv-text-input>
    <cv-button kind="primary" small v-text="'Login'" @click="submitLogin" />
  </div>
</template>
<script>
export default {
  name: "UsersLogin",
  data: () => {
    return {
      userName: "",
      passWord: ""
    };
  },
  methods: {
    submitLogin() {
      alert("login submitted!!!!!!!!!!!!!");
    }
  }
};
</script>
<style lang="scss"></style>
