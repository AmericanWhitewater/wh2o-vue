<template>
  <div style="width:100%;" class=''>
    <h1>Events</h1>
    <v-container>
      <v-row>
        <v-col>
          <v-sheet>
      <template v-if="data">

    <v-card v-for="(event, index) in data.rows" :key="index" class="mb-5" elevation="0">
      <v-card-title>
        {{ event.title }}
      </v-card-title>
      <v-card-text>
        <ul>
          <li>
            {{ event.url }}
          </li>
          <li>
            {{ event.state }}
          </li>
        </ul>
        <p>
          {{ event.description }}
        </p>
      </v-card-text>
    </v-card>

     {{ data.rows[0] }}
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
  name: "EventsPage",
  computed: {
    ...mapState({
      data: state => state.Events.data,
      loading: state => state.Events.loading,
      error: state => state.Events.error,
    })
  },
  methods: {
    ...mapActions({
      load: 'Events/getProperty'
    })
  },
  created() {
    this.load('events')
  }
};
</script>
