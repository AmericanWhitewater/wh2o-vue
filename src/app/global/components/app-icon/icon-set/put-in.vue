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
      <rect
        x="6"
        y="14"
        fill="#232323"
        width="4"
        height="2"
      />
      <rect
        x="6"
        fill="#232323"
        width="4"
        height="2"
      />
      <rect
        x="14"
        y="6"
        fill="#232323"
        width="2"
        height="4"
      />
      <rect
        y="6"
        fill="#232323"
        width="2"
        height="4"
      />
      <polygon
        data-color="color-2"
        points="12,8 9,8 9,4 7,4 7,8 4,8 8,12 "
      />
      <path
        fill="#232323"
        d="M2,2h2V0H1C0.4,0,0,0.4,0,1v3h2V2z"
      />
      <path
        fill="#232323"
        d="M15,0h-3v2h2v2h2V1C16,0.4,15.6,0,15,0z"
      />
      <path
        fill="#232323"
        d="M14,14h-2v2h3c0.6,0,1-0.4,1-1v-3h-2V14z"
      />
      <path
        fill="#232323"
        d="M2,12H0v3c0,0.6,0.4,1,1,1h3v-2H2V12z"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'put-in',
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
