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
import { appLocalStorage } from '@/app/global/services'
import { userActions } from '@/app/views/user/shared/state'
export default {
  name: 'app',
  metaInfo: {
    title: 'American Whitewater'
  },
  components: {
    AppNavigation,
    AppToaster
  },
  methods: {
    /**
     * until login form is wired properly,
     * generate access token in postman/insomnia
     * and add that to env temp_user_access_token
     *
     */
    initTempAuth () {
      const tempToken = process.env.VUE_APP_TEMP_USER_ACCESS_TOKEN || false

      appLocalStorage.setItem('wh2o-auth', tempToken)

      const userLoggedIn = appLocalStorage.getItem('wh2o-auth')

      if (userLoggedIn) {
        this.$store.dispatch(userActions.FETCH_USER_DATA)
      }
    }
  }
}
</script>
