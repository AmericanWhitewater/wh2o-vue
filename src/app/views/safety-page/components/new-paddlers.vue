<template>
  <div class="new-paddlers">
    <layout name="layout-two-thirds">
      <template #main>
        <hr>
        <h1>New Paddlers</h1>
      </template>
      <template #sidebar>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </template>
    </layout>
  </div>
</template>

<script>
import { Layout } from '@/app/global/layout'
export default {
  name: 'NewPaddlers',
  components: {
    Layout
  },
  metaInfo () {
    return {
      title: 'New Paddlers - American Whitewater'
    }
  }
}
</script>

<style>

</style>
