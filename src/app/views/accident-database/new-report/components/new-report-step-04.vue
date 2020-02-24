<template>
  <layout name="layout-full-width">
    <template #main>
      <cv-text-input
        label="input label"
      />
    </template>
  </layout>
</template>

<script>
import { Layout } from '@/app/global/layout'
export default {
  name: 'NewReportStep04',
  components: {
    Layout
  }
}
</script>

<style>

</style>
