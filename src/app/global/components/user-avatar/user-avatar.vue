<template>
  <div :class="[theme, 'user-avatar']">
    <template v-if="avatarURI">
      <img
        :src="avatarURI"
        alt=""
      >
    </template>
    <template v-else>
      <h2>{{ letter }}</h2>
    </template>
  </div>
</template>
<script>
export default {
  name: 'user-avatar',
  props: {
    avatarURI: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      required: false,
      validator: val => ['light', 'dark'].indexOf(val) > -1
    }
  },
  computed: {
    letter () {
      if (this.username) {
        return this.username.charAt(0).toUpperCase()
      }
      return null
    }
  }
}
</script>
<style lang="scss">
.user-avatar {
  height: 75px;
  min-width: 75px;
  width: 75px;
  background-color: $ui-02;
  align-items: center;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;

  &.light {
    background-color: $ui-02;
  }
  &.dark {
    background-color: $ui-04;
  }

  img {
    border-radius: inherit;
    display: inline-flex;
    height: inherit;
    width: inherit;
    border-style: none;
    overflow-wrap: break-word;
    white-space: normal;
    text-align: center;
    line-height: normal;
    object-fit: cover;
  }
}
</style>
<docs>

</docs>
