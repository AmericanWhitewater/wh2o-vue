<template>
  <div class="user-alerts">
    <utility-block
      state="content"
      title="Alerts Unavailable"
      text="Please try again later"
    />
  </div>
</template>

<script>
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
export default {
  name: 'user-alerts',
  components: {
    UtilityBlock
  }
}
</script>

<style lang="scss">
.user-alerts {
}
</style>
