<template>
  <div style="width:100%;" class=''>
    <h1>Affiliates</h1>
    <v-container>
      <v-row>
        <v-col>
          <v-sheet>
      <template v-if="data">
    <v-card v-for="(affiliate, index) in data" :key="index" class="mb-5" elevation="0">
      <v-card-title>
        {{ affiliate.last }}
      </v-card-title>
      <v-card-text>
        <ul>
          <li>
            {{ affiliate.url }}
          </li>
          <li>
            {{ affiliate.conemail }}
          </li>
        </ul>
        <p>
          {{ affiliate.abstract }}
        </p>
      </v-card-text>
    </v-card>
    </template>
    </v-sheet>
        </v-col>
      </v-row>
    </v-container>
   
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "AffiliatesPage",
  computed: {
    ...mapState({
      data: state => state.Affiliates.data,
      loading: state => state.Affiliates.loading,
      error: state => state.Affiliates.error,
    })
  },
  methods: {
    ...mapActions({
      load: 'Affiliates/getProperty'
    }),
  },
  created() {
    this.load('affiliates')
  }
};
</script>
