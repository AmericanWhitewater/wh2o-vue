<template>
  <div class="user-profile">
    <error-block
      title="Preview Unavailable"
      text="Please try again later"
    />
  </div>
</template>

<script>
import { ErrorBlock } from '@/app/global/components'
export default {
  name: 'UserProfile',
  components: {
    ErrorBlock
  }
}
</script>

<style lang="scss">
.user-profile {
}
</style>
