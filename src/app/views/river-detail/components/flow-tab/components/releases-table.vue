<template>
  <section v-if="data && releases && releases.length" class='releases-table mt-lg mb-lg'>
    <hr>
    <h2 class="mb-sm">
      Dam Releases
    </h2>
    <div class="bx--data-table-container mb-spacing-md">
      <table class="bx--data-table">
        <thead>
          <tr>
            <th>
              Date
            </th>
            <th>
              Start Time
            </th>
            <th>
              End Time
            </th>
            <th>
              Min
            </th>
            <th>
              Max
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(release, index) in releasesFromTodayThenPast.slice(0,resultOffset)" :key="index">
            <td>
              {{formatDate(release.event_date, 'LL')}}
            </td>
            <td>
              {{ release.start_time }}
            </td>
            <td>
              {{ release.end_time }}
            </td>
            <td v-text="`${release.min} ${getMetricLabel(release.metric_id)}`"/>
            <td v-text="`${release.max} ${getMetricLabel(release.metric_id)}`"/>
          </tr>
        </tbody>
      </table>
    </div>
    <cv-button kind="secondary"
                :disabled="resultOffset >= releases.length"
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
      data: state => state.RiverEvents.data,
      metrics: state => state.RiverGages.data.metrics,
    }),
    releases() {
      return this.$store.getters['RiverEvents/releaseDates']
    },

    releasesFromTodayThenPast()
    {

      return this.$store.getters['RiverEvents/releasesFromTodayThenPast'];
    },

    reachId() {
      return this.$route.params.id
    }
  },
  methods: {
    getMetricLabel(id) {
      if(!this.metrics || !id) return ''

      return this.metrics.find(item => item.id === id.toString()).unit
    }
  }
};
</script>

