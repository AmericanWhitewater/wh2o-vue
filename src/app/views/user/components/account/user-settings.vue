<template>
  <div class="user-settings">
    <utility-block
      state="content"
      title="Settings Unavailable"
      text="Please try again later"
    />
  </div>
</template>

<script>
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
export default {
  name: 'user-settings',
  components: {
    UtilityBlock
  }
}
</script>

<style lang="scss">
.user-settings {
}
</style>
