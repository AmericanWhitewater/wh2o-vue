<template>
  <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-8">
    <h2>{{ gage.gauge_name }}</h2>
    <cv-button
      kind="secondary"
      small
      @click="back"
    >
      back
    </cv-button>
  </div>
</template>
<script>
import { EventBus } from '@/app/global/services/event-bus/event-bus'

export default {
  name: 'GageDetail',
  props: {
    gage: {
      type: Object,
      required: true
    }
  },
  methods: {
    back () {
      EventBus.$emit('gage-detail-toggle', false)
    }
  }
}
</script>
<style lang="scss"></style>
