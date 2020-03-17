<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <title
      v-if="title"
      v-text="title"
    />
    <g fill="#232323">
      <path
        fill="#232323"
        d="M15.7653856,0.2346146C12.4518032-0.8197008,6.1000485,1.4653728,0,11.4814663 c0.7344549,0.7344542,1.5143322,1.5143318,2.2592671,2.2592669S3.7840793,15.2655449,4.5185342,16 C14.534627,9.899951,16.8197002,3.548197,15.7653856,0.2346146z"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'surf',
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
