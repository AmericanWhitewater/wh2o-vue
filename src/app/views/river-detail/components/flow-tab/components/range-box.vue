<template>
  <svg
      :class="colorClass"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
  >
    <g fill="">
      <rect width="16" height="16" rx="1" ry="1" fill=""/>
    </g>
  </svg>
</template>
<script>
export default {
  name: 'range-box',
  props: {
    colorClass: { type: String, required: true}
  }
}
</script>
