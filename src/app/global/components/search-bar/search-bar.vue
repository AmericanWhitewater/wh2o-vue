<template>
  <div class="search-bar">
    <cv-search
      v-model="searchTerm"
      :size="size"
      theme="light"
      @keydown.enter="$emit('search:submitted', searchTerm)"
    />
    <cv-button
      :size="size"
      :disabled="!searchTerm.length"
      @click.exact="$emit('search:submitted', searchTerm)"
      @keydown.enter="$emit('search:submitted', searchTerm)"
      v-text="'submit'"
    />
  </div>
</template>
<script>
export default {
  name: 'search-bar',
  props: {
    size: {
      type: String,
      default: 'small',
      validator: val => ['small', 'large', 'xl'].indexOf(val) > -1
    }
  },
  data: () => ({
    searchTerm: ''
  })
}
</script>
<style lang="scss" scoped>
.search-bar {
  display: flex;
  width:100%;
}
</style>
