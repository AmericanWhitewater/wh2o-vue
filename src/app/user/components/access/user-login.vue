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
      class="mb-spacing-lg"
      label="Password"
      type="password"
    />
    <cv-button kind="primary" small @click="submitLogin" v-text="'Login'" />
  </div>
</template>
<script>
import { userActions } from "../../shared/state";
export default {
  name: "UserLogin",
  data: () => ({
    userName: "",
    passWord: ""
  }),
  metaInfo() {
    return {
      title: "Login - American Whitewater"
    };
  },
  methods: {
    submitLogin() {
      this.$store.dispatch(userActions.USER_LOGIN, {
        username: this.userName,
        password: this.passWord
      });
      this.$router.replace("/user/account/1");
    }
  }
};
</script>
<style lang="scss"></style>
