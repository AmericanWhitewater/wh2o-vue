<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center py-3">
      <div v-if="reach">
        <div class="subtitle-1">{{ reach.section }}</div>
        <div class="display-1">{{ reach.river }}</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
    <v-row>
      <v-col>
        <reach-map />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-list nav dense>
          <v-list-item-group v-model="activeTab" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <p v-if="reach" v-text="reach.description" />
        <!-- <v-card>
          <v-skeleton-loader
            v-bind="attrs"
            type="table-heading, list-item-two-line, image, table-tfoot"
          ></v-skeleton-loader>
        </v-card> -->
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { ReachMap } from './components'
export default {
  name: 'ReachDetail',
  components: {
    ReachMap
  },
  data: () => ({
    activeTab: 'General',
    breadcrumbs: [
      {
        text: 'Reaches',
        to: '/reaches/list',
        exact: true
      },
      {
        text: 'Edit Reach'
      }
    ],
    items: [
      { text: 'General', icon: 'mdi-folder' },
      { text: 'Flow', icon: 'mdi-chart-line' },
      { text: 'Gallery', icon: 'mdi-camera' },
      { text: 'Map', icon: 'mdi-map' },
      { text: 'News', icon: 'mdi-note' },
      { text: 'Accidents', icon: 'mdi-hospital-box-outline' },
      { text: 'Credits', icon: 'mdi-account-multiple' }
    ]
  }),
  computed: {
    ...mapState({
      reach: (state) => state.ReachDetail.data,
      loading: (state) => state.ReachDetail.loading,
      error: (state) => state.ReachDetail.error
    })
  },
  created() {
    this.$store.dispatch('ReachDetail/getProperty', {
      url: `/reach?id=${this.$route.params.id}`
    })
  }
}
</script>
