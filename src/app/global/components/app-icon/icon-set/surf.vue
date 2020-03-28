<template>
  <svg
    id="surf-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  ><title v-if="title">{{ title }}</title><g
    stroke-linecap="square"
    stroke-linejoin="miter"
    stroke-width="2"
    fill="#565656"
    stroke="#565656"
  ><path
    d="M1,27a9.731,9.731,0,0,0,7.5-3.5,9.786,9.786,0,0,0,15,0A9.676,9.676,0,0,0,31,27"
    fill="none"
    stroke="#565656"
    stroke-miterlimit="10"
  /> <path
    d="M1,19H2.364c8.181,0,6.42-8.74,11.612-13.075,5.7-4.758,10.855.677,11.664,1.693C19.976,8.634,21.455,19,29.636,19H31"
    fill="none"
    stroke-miterlimit="10"
  /></g></svg>
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
