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
    <cv-button
      kind="primary"
      small
      class="mb-sm"
      disabled
      @click="submitLogin"
      v-text="'Login'"
    />
    <div class="bx--row">
      <div class="bx--col">
        <h6 class="mb-2xs">
          Login as:
        </h6>
      </div>
    </div>
    <div class="bx--row ">
      <div class="bx--col">
        <cv-button
          kind="tertiary"
          small
          @click="submitLogin('admin')"
          v-text="'admin'"
        />
      </div>
      <div class="bx--col">
        <cv-button
          kind="tertiary"
          small
          @click="submitLogin('gen')"
          v-text="'gen user'"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { userActions } from "../../shared/state";
/**
 * @displayName User Login
 */
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
    submitLogin(admin) {
      this.$store.dispatch(userActions.USER_LOGIN, {
        username: this.userName,
        password: this.passWord,
        admin: admin === "admin" ? "admin" : null
      });
      this.$router.replace("/user/account/1");
    }
  }
};
</script>
<style lang="scss"></style>
