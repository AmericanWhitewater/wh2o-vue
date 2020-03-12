<template>
  <div class="user-profile">
    <error-block
      title="Profile Unavailable"
      text="Please try again later"
    />
  </div>
</template>

<script>
import { ErrorBlock } from '@/app/global/components'
export default {
  name: 'user-profile',
  components: {
    ErrorBlock
  }
}
</script>

<style lang="scss">
.user-profile {
}
</style>
