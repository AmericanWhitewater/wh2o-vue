<template>
  <div class="page-not-found bg-topo">
    <layout name="layout-full-width">
      <template #main>
        <header>
          <h1 class="mb-spacing-md">
            404
          </h1>
          <p class="mb-spacing-md">
            Sorry, the page you are looking for is missing
          </p>
          <cv-search />
        </header>
      </template>
    </layout>
  </div>
</template>

<script>
import { Layout } from '@/app/global/layout'
export default {
  name: 'app-page-not-found',
  components: {
    Layout
  }
}
</script>

<style lang="scss" scoped>
.page-not-found {
  @include full-page-height;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  header {
    text-align: center;
  }
}
</style>
