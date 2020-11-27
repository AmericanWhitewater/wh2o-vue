<template>
  <div :class="[theme, 'user-avatar']">
    <template v-if="imageURI">
      <img
        :src="imageURI"
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
    imageURI: {
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
