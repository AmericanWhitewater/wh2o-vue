<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Accidents</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/accident-detail/0?new=true">
        New Accident Report
      </v-btn>
    </div>
    <v-card>
      <!-- users list -->
      <v-row dense class="pa-2 align-center">
        <v-col cols="6">
          <v-menu offset-y left>
            <template v-slot:activator="{ on }">
              <transition name="slide-fade" mode="out-in">
                <v-btn v-show="selectedReaches.length > 0" v-on="on">
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
        v-model="selectedReaches"
        show-select
        :headers="headers"
        :items="accidents && accidents.length ? accidents : []"
        :search="searchQuery"
        class="flex-grow-1"
      >
        <template v-slot:item.uid="{ item }">
          <div class="font-weight-bold"># <copy-label :text="item.uid + ''" /></div>
        </template>

        <template v-slot:item.email="{ item }">
          <div class="d-flex align-center py-1">
            <div class="ml-1 caption font-weight-bold">
              <copy-label :text="item.email" />
            </div>
          </div>
        </template>

        <template v-slot:item.verifydate="{ item }">
          <v-icon v-if="item.verifydate" small color="success">
            mdi-check-circle
          </v-icon>
          <v-icon v-else small>
            mdi-circle-outline
          </v-icon>
        </template>

        <!-- <template v-slot:item.disabled="{ item }">
          <div>{{ item.disabled.toString() | capitalize }}</div>
        </template> -->

        <template v-slot:item.role="{ item }">
          <v-chip
            label
            small
            class="font-weight-bold"
            :color="item.role === 'ADMIN' ? 'primary' : undefined"
          >{{ item.role | capitalize }}</v-chip>
        </template>

        <template v-slot:item.created_at="{ item }">
          <div>{{ item.created_at | formatDate('ll') }}</div>
        </template>

        <template v-slot:item.updated_at="{ item }">
          <div>{{ item.updated_at | formatDate('lll') }}</div>
        </template>

        <template v-slot:item.action="{item }">
          <div class="actions">
            <v-btn icon :to="`/accident-detail/${item.id}`">
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
import CopyLabel from '../../components/common/CopyLabel'

export default {
  name: 'AccidentsPage',
  components: {
    CopyLabel
  },
  data() {
    return {
      breadcrumbs: [{
        text: 'Accidents',
        disabled: false,
        href: '#'
      }, {
        text: 'List'
      }],

      searchQuery: '',
      selectedReaches: [],
      headers: [
        { text: 'River', align: 'left', value: 'river' },
        { text: 'Section', align: 'left', value: 'section' },
        { text: 'Cause', value: 'cause' },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },
  computed: {
    ...mapState({
      accidents: (state) => state.Accidents.data,
      loading: (state) => state.Accidents.loading
    })
  },
  created() {
    if (!this.reaches) {
      this.$store.dispatch('Accidents/getProperty', {
        url: '/accidents'
      })
    }
  },
  methods: {
    searchUser() {},
    open() {},
    handleRefresh() {
      this.$store.dispatch('Reaches/getProperty', {
        url: '/accidents'
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
