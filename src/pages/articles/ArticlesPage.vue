<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Articles</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/articles/create">
        Create Article
      </v-btn>
    </div>
    <v-card>
      <!-- users list -->
      <v-row dense class="pa-2 align-center">
        <v-col cols="6">
          <v-menu offset-y left>
            <template v-slot:activator="{ on }">
              <transition name="slide-fade" mode="out-in">
                <v-btn v-show="selectedUsers.length > 0" v-on="on">
                  Actions
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </transition>
            </template>
            <v-list dense>
              <v-list-item>
                <v-list-item-title>Verify</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Disable</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        </v-col>
        <v-col cols="6" class="d-flex text-right align-center">
          <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            class="flex-grow-1 mr-md-2"
            solo
            hide-details
            dense
            clearable
            placeholder="e.g. filter for id, email, name, etc"
            @keyup.enter="searchUser(searchQuery)"
          ></v-text-field>
          <v-btn
            :loading="loading"
            icon
            small
            class="ml-2"
            @click="handleRefresh"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        v-model="selectedUsers"
        show-select
        :headers="headers"
        :items="articles ? articles : []"
        :search="searchQuery"
        class="flex-grow-1"
      >
        <template v-slot:item.title="{ item }">
          <div>{{ item.title }}</div>
        </template>

        <template v-slot:item.author="{ item }">
          <div>{{ item.author }}</div>
        </template>

        <template v-slot:item.posted="{ item }">
          <div>{{ item.posted | formatDate('ll') }}</div>
        </template>

        <template v-slot:item.action="{item }">
          <div class="actions">
            <v-btn icon :to="`/articles/edit/${item.articleid}`">
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ArticlesPage',
  data() {
    return {
      breadcrumbs: [{
        text: 'Articles',
        disabled: false,
        href: '#'
      }, {
        text: 'List'
      }],

      searchQuery: '',
      selectedUsers: [],
      headers: [
        { text: 'Title', align: 'left', value: 'title' },
        { text: 'Author', align: 'left', value: 'author' },
        { text: 'Posted', value: 'posted' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },
  computed: {
    ...mapState({
      articles: (state) => state.Articles.data,
      loading: (state) => state.Articles.loading
    })
  },
  created() {
    if (!this.articles) {
      this.$store.dispatch('Articles/getProperty', {
        url: '/articles'
      })
    }
  },
  methods: {
    searchUser() {},
    open() {},
    handleRefresh() {
      this.$store.dispatch('Articles/getProperty', {
        url: '/articles'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
