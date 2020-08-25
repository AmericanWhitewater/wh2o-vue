<template>
  <div class="page-banner">
    <header>
      <div>
        <h4>{{ subtitle }}</h4>
        <h1>{{ title }}</h1>
      </div>
      <div>
        <slot />
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: 'page-banner',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },
    loading: {
      type: Boolean,
      required: false
    }
  }
}
</script>
