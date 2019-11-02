<template>
  <div class="login">
    <cv-text-input
      v-model="userName"
      class="mb-spacing-sm"
      label="Username or Email"
      type="text"
    />
    <cv-text-input
      v-model="passWord"
      class="mb-spacing-sm"
      label="Password"
      type="password"
    />
    <cv-button
      kind="primary"
      small
      @click="submitLogin"
      v-text="'Login'"
    />
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
