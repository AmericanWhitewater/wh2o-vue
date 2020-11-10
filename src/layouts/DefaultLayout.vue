<template>
  <div
    v-shortkey="['ctrl', '/']"
    class="d-flex flex-grow-1"
    @shortkey="onKeyup"
  >
    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      class="elevation-1"
      :right="true"
      :light="menuTheme === 'light'"
      :dark="menuTheme === 'dark'"
    >
      <template v-slot:prepend>
        <div class="pa-3"></div>
      </template>
      <main-menu :menu="navigation.menu" />
      <template v-slot:append>
        <div class="pa-2 pt-1">
          <v-switch v-model="$vuetify.theme.dark" :label="$vuetify.theme.dark ? 'Light Theme' : 'Dark Theme'" />
          <v-btn block color="primary" tile class="mb-1" to="/admin/users/list" outlined> Admin </v-btn>
          <v-btn block color="primary" tile class="mb-1" :to="`/admin/users/edit/${user.uid}`" > My Account </v-btn>
          <v-btn block color="secondary" outlined tile> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      app
      :color="isToolbarDetached ? 'surface' : undefined"
      :flat="isToolbarDetached"
      :light="toolbarTheme === 'light'"
      :dark="toolbarTheme === 'dark'"
    >
      <v-card
        class="flex-grow-1 d-flex"
        :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']"
        :flat="!isToolbarDetached"
      >
        <div class="d-flex flex-grow-1 align-center">
          <v-text-field
            v-if="showSearch"
            append-icon="mdi-close"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            hide-details
            solo
            flat
            autofocus
            @click:append="showSearch = false"
          />
          <div class="d-flex flex-grow-1 align-center">
            <v-spacer class="d-block d-sm-none"></v-spacer>
            <v-btn class="d-block d-sm-none" icon @click="showSearch = true">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-img
              :src="$vuetify.theme.dark ? '/images/logos/aw-logo-small-light.svg' : '/images/logos/aw-logo-small.png'"
              max-height="25"
              max-width="200"
              class="pa-2"
              contain
              position="left"
              @click="$router.push('/').catch(() => {})"
            />
            <v-spacer></v-spacer>
            <div>
              <v-autocomplete
              @change="handleSelect"
              :search-input.sync="searchTerm"
              @update:search-input="search"
              :loading="searchLoading"
              cache-items
              ref="search"
              class="mx-1 hidden-xs-only"
              :items="autocompleteResults"
              :placeholder="$t('menu.search')"
              prepend-inner-icon="mdi-magnify"
              hide-details
              dense
            />
            </div>
            <toolbar-language />
            <v-btn depressed class="ml-1" @click.stop="drawer = !drawer" tile>
                {{ $t('menu.base') }}
              <v-icon class="ml-1">mdi-menu</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" :fluid="!isContentBoxed">
        <v-layout>
          <slot></slot>
        </v-layout>
      </v-container>
      <v-footer app inset>
        <div class="overline">&copy; 2021 American Whitewater</div>
        <v-spacer></v-spacer>
      </v-footer>
    </v-main>
  </div>
</template>

<script>

/**
 * @note the autocomplete goes nuts with event firing after
 * selecting a result
 */

import { mapState } from "vuex";
import config from "../configs";
import MainMenu from "../components/navigation/MainMenu";
import ToolbarLanguage from "../components/toolbar/ToolbarLanguage";
import {riverSearch} from "@/services"

export default {
  components: {
    MainMenu,
    ToolbarLanguage,
  },
  data: () => ({
    drawer: false,
    showSearch: false,
    navigation: config.navigation,
    searchTerm: "",
    searchLoading: false,
    autocompleteResults: []
  }),
  computed: {
    ...mapState("app", [
      "product",
      "isContentBoxed",
      "menuTheme",
      "toolbarTheme",
      "isToolbarDetached",
    ]),
    user() {
      return this.$store.state.User
    }
  },
  methods: {
    handleSelect(reachId) {
      this.$router.push(`/reach-detail/${reachId}`).catch(()=>{})
      this.searchTerm = ""
    },
    onKeyup(e) {
      this.$refs.search.focus();
    },
    async search(input) {
     
      if(!input) return
      try {
          this.searchLoading = true
          const result = await riverSearch(input)
          if(result.rows) {
            this.autocompleteResults = result.rows.map((rio) => ({
              text: rio.river,
              value: rio.id
            }))
          }
          
        } catch (error) {
          console.log('error :>> ', error);
        } finally {
          this.searchLoading = false
        }
    }
  },
};
</script>
