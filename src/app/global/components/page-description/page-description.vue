<template>
  <section class="page-description">
    <div class="page-description-content">
      <layout name="layout-two-thirds">
        <template #main>
          <p>{{ description }}</p>
        </template>
      </layout>
    </div>
  </section>
</template>

<script>
import { Layout } from '@/app/global/layout'
export default {
  name: 'page-description',
  components: {
    Layout
  },
  props: {
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.page-description {
  min-height: 250px;
  display: flex;
  align-items: center;
  p {
    @include carbon--type-style("expressive-heading-03");
  }
}
</style>
