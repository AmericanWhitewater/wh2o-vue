<template>
  <section v-if="data && releases && releases.length" class='releases-table mt-lg mb-lg'>
    <hr>
    <h2 class="mb-sm">
      Upcoming Dam Releases
    </h2>
    <p v-if="!upcomingReleases.length">None listed.</p>
    <a class="bx--link" @click.exact="calendarView">
        Switch to Calendar View
    </a>
    <table v-if="upcomingReleases && upcomingReleases.length" class="bx--data-table mb-spacing-md">
      <thead>
        <tr>
          <th>
            Title
          </th>
          <th>
            Date
          </th>
          <th>
            Start Time
          </th>
          <th>
            End Time
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(release, index) in upcomingReleases.slice(0,resultOffset)" :key="index">
          <td>
            <a v-if="release.url" :href="release.url" target="_blank" rel="noopener">{{ release.title }}</a>
            <span v-else>{{ release.title }}</span>
          </td>
          <td>
            {{formatDate(release.event_date, 'LL')}}
          </td>
          <td>
            {{ release.start_time }}
          </td>
          <td>
            {{ release.end_time }}
          </td>
        </tr>
      </tbody>
    </table>
    <cv-button v-if="upcomingReleases.length > resultOffset"
                kind="secondary"
                size="small"
                @click.exact="resultOffset += 12"
                @keydown.enter="resultOffset += 12">
      Show More
    </cv-button>
  </section>
</template>
<script>
import {mapState} from "vuex"
export default {
  name: "releases-table",
  data: () => ({
    resultOffset: 12
  }),
  computed: {
    ...mapState({
      data: state => state.RiverDamReleases.data,
    }),
    releases() {
      return this.$store.getters['RiverDamReleases/releases'];
    },
    upcomingReleases() {
      return this.$store.getters['RiverDamReleases/upcomingReleases'];
    },
    reachId() {
      return this.$route.params.id
    }
  },
  methods: {
    calendarView(){
      this.$emit("calendarView")
    }
  },

};
</script>
<style lang="scss">
  a {
    cursor:pointer;    
  }
</style>