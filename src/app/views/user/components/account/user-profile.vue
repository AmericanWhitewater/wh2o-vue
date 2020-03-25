<template>
  <div class="user-profile">
    <template v-if="loading">
      loading
    </template>
    <template v-else-if="data">
      {{ data }}
    </template>
    <template v-else>
      error
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'user-profile',
  computed: {
    ...mapState({
      data: state => state.userState.userData.data,
      loading: state => state.userState.userData.loading,
      error: state => state.userState.userData.error
    })
  }
}
</script>

<style lang="scss">
.user-profile {
}
</style>
