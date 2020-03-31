<template>
  <div>
    <app-toaster />
    <app-navigation />
    <router-view
      :class="[$route.name !== 'home' ? 'interior' : null, 'app-main-content']"
    />
  </div>
</template>

<script>
import {
  AppToaster,
  AppNavigation
} from './global/components'
export default {
  name: 'app',
  metaInfo: {
    title: 'American Whitewater'
  },
  components: {
    AppNavigation,
    AppToaster
  }
}
</script>
