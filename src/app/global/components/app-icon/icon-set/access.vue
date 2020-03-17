<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  ><title
    v-if="title"
    v-text="title"
  /><g fill="currentColor"><polygon
    fill="currentColor"
    points="16,0 10,0 16,6 "
  /> <polygon points="16,10 16,16 10,16 " /> <path
    fill="currentColor"
    d="M10.828,6.586l2.879-2.879c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0L9.414,5.172L10.828,6.586z "
  /> <path
    fill="currentColor"
    d="M5.172,9.414l-4.879,4.879c-0.391,0.391-0.391,1.023,0,1.414C0.488,15.902,0.744,16,1,16 s0.512-0.098,0.707-0.293l4.879-4.879L5.172,9.414z"
  /> <path d="M14,15c-0.256,0-0.512-0.098-0.707-0.293l-13-13c-0.391-0.391-0.391-1.023,0-1.414 s1.023-0.391,1.414,0l13,13c0.391,0.391,0.391,1.023,0,1.414C14.512,14.902,14.256,15,14,15z" /></g></svg>
</template>

<script>
export default {
  name: 'access',
  props: {
    title: {
      type: String,
      required: false
    }
  }
}
</script>

<style>

</style>
