<template>
  <div class="user-gages">
    <error-block
      title="Alerts Unavailable"
      text="Please try again later"
    />
  </div>
</template>

<script>
import { ErrorBlock } from '@/app/global/components'
export default {
  name: 'UserGages',
  components: {
    ErrorBlock
  }
}
</script>

<style lang="scss">
.user-gages {
}
</style>
