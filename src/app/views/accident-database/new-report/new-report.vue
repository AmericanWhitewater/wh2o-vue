<template>
  <div>
    <layout
      name="layout-full-width"
      class="mb-lg"
    >
      <template #main>
        <hr>
        <h1 class="mb-spacing-md">
          New Accident Report
        </h1>
        <p>Thank you for taking the time to submit an accident report.</p>
      </template>
    </layout>
    <layout
      name="layout-two-thirds"
      :options="{sidebar:{left:true}}"
    >
      <template #sidebar>
        <cv-tile>
          <cv-progress
            :steps="steps"
            :vertical="true"
          />
        </cv-tile>
      </template>
      <template #main>
        <cv-tile>
          <router-view />
        </cv-tile>
      </template>
    </layout>
  </div>
</template>

<script>
import { Layout } from '@/app/global/layout'
export default {
  name: 'NewReport',
  components: {
    Layout
  },
  data: () => ({
    steps: [
      'Step One',
      'Step Two',
      'Step Three',
      'Review & Submit'
    ]
  })
}
</script>

<style>

</style>
