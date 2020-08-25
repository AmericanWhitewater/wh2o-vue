<template>
  <div id="nwi-state-list">
    <hr>
    <h2 class="mb-spacing-sm">
      US States
    </h2>
  </div>
</template>

<script>
import { riverIndexActions } from '../shared/state'

export default {
  name: 'nwi-state-list',
  components: {},

  created () {
    this.$store.dispatch(riverIndexActions.FETCH_STATES)
  }
}
</script>
