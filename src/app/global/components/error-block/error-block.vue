<template>
  <div
    class="error-block"
    :style="`height:${height}px`"
  >
    <error-outlined />
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
  </div>
</template>
<script>
import error_outlined32 from "@carbon/icons-vue/es/error--outline/32";
export default {
  name: "ErrorBlock",
  components: {
    "error-outlined": error_outlined32
  },
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
    },
    height: {
      type: String,
      default: "350"
    }
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
