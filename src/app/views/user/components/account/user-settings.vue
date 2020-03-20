<template>
  <div class="user-settings">
    <error-block
      title="Settings Unavailable"
      text="Please try again later"
    />
  </div>
</template>

<script>
import { ErrorBlock } from '@/app/global/components'
export default {
  name: 'user-settings',
  components: {
    ErrorBlock
  }
}
</script>

<style lang="scss">
.user-settings {
}
</style>
