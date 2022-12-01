<template>
  <cv-button
    kind="secondary"
    size="small"
    :class="buttonClass"
    @keydown.enter="goToLogin"
    @click.exact="goToLogin"
  >
    {{ buttonText }}
  </cv-button>
</template>

<script>
import { laravelDeploy } from "@/app/environment"

export default {
  name: "edit-mode-toggle",
  props: {
    buttonText: {
      type: String,
      default: "Log in"
    },
    buttonClass: {
      type: String
    }
  },
  methods: {
    goToLogin() {
      if (laravelDeploy) {
        this.goToLink('/content/User/login');
      } else {
        this.$router.push('/user/access/login');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
