<template>
  <a href="/login">
    <cv-button kind="secondary" size="small" :class="buttonClass">
      {{ buttonText }}
    </cv-button>
  </a>
</template>

<script>
export default {
  name: "edit-mode-toggle",
  props: {
    buttonText: {
      type: String,
      default: "Log in",
    },
    buttonClass: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped></style>
