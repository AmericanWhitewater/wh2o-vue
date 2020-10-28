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
                <v-list-item-title>
                  {{ $t(item.text) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <h3 class="mb-1">{{ $t('common.description') }}</h3>
        <p v-if="reach" v-text="reach.description" />
        <rapids-section :reach-id="$route.params.id" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { ReachMap, RapidsSection } from './components'
export default {
  name: 'ReachDetail',
  components: {
    ReachMap,
    RapidsSection
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
      { text: 'general', icon: 'mdi-folder' },
      { text: 'flow', icon: 'mdi-chart-line' },
      { text: 'gallery', icon: 'mdi-camera' },
      { text: 'map', icon: 'mdi-map' },
      { text: 'news', icon: 'mdi-note' },
      { text: 'accidents', icon: 'mdi-hospital-box-outline' },
      { text: 'credits', icon: 'mdi-account-multiple' }
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
