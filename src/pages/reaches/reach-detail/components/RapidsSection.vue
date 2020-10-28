<template>
  <div class='RapidSection'>
    <h3>{{ $t('rapids') }}</h3>

    <div v-for="(rapid, index) in rapids" :key="index">
      {{rapid }}
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "RapidSection",
  props: {
    reachId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      loading: state => state.Rapids.loading,
      rapids: state => state.Rapids.rapids,
      error: state => state.Rapids.error,
    })
  },
  created() {
    if(!this.rapids) {
      this.$store.dispatch('Rapids/getProperty', {
        url: `/rapids?reachid=${this.reachId}`
      })
    }
  }
};
</script>
