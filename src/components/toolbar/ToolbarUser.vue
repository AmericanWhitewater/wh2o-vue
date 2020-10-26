<template>
  <v-menu offset-y left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon class="elevation-2" v-on="on">
        <v-badge
          color="success"
          dot
          bordered
          offset-x="10"
          offset-y="10"
        >
          <v-avatar size="40">
            {{ user && user.uname.charAt(0).toUpperCase() }}
          </v-avatar>
        </v-badge>
      </v-btn>
    </template>

    <!-- user menu list -->
    <v-list dense nav>
      <v-list-item
        v-for="(item, index) in menu"
        :key="index"
        :to="item.link"
        :exact="item.exact"
        :disabled="item.disabled"
        link
      >
        <v-list-item-icon>
          <v-icon small :class="{ 'grey--text': item.disabled }">{{
            item.icon
          }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{
            item.key ? $t(item.key) : item.text
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1"></v-divider>

      <v-list-item @click.exact="handleLogout" @keydown.enter="handleLogout">
        <v-list-item-icon>
          <v-icon small>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t("menu.logout") }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import config from '../../configs'
import { mapState } from 'vuex'
/*
|---------------------------------------------------------------------
| Toolbar User Component
|---------------------------------------------------------------------
|
| Quickmenu for user menu shortcuts on the toolbar
|
*/
import { localStoreWorker } from '@/services'
export default {
  name: 'ToolbarUser',
  data() {
    return {
      menu: config.toolbar.user
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.User.data
    })
  },
  methods: {
    handleLogout() {
      localStoreWorker.remove('wh2o-admin-auth')
      this.$store.dispatch('User/setProperty', null)
      this.$router.replace('/auth/signin')
    }
  }
}
</script>
