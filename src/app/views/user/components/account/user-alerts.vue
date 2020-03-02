<template>
  <div class="user-alerts">
    <error-block
      title="Alerts Unavailable"
      text="Please try again later"
    />
  </div>
</template>

<script>
import { ErrorBlock } from '@/app/global/components'
export default {
  name: 'UserAlerts',
  components: {
    ErrorBlock
  }
}
</script>

<style lang="scss">
.user-alerts {
}
</style>
