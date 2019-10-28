<template>
  <div class="error-block">
    <error-outlined />
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
  </div>
</template>
<script>
import error_outlined32 from "@carbon/icons-vue/es/error--outline/32";
export default {
  name: "ErrorBlock",
  props: {
    title: {
      type: String,
      required: false,
      default: "Whoops"
    },
    text: {
      type: String,
      required: false,
      default: "Something went wrong"
    }
  },
  components: {
    "error-outlined": error_outlined32
  }
};
</script>
<style lang="scss" scoped>
.error-block {
  width: 100%;
  background-color: $ui-02;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  flex-flow: column nowrap;
}
</style>
