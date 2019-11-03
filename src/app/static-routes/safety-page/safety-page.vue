<template>
  <div class="safety">
    <div class="bx--grid">
      <page-header title="Safety" />
      <div class="spacer" />
      <div class="bx--row pt-lg">
        <div class="bx--col-sm-12 bx--col-md-8 bx--col-lg-10">
          <p class="mb-spacing-md">
            To access an accident report, visit the Accidents Tab on a river detail page. Or, click the button below for a preselected report.
          </p>
          <cv-button @click="viewAccidentDetail">
            Report Demo
          </cv-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PageHeader } from "@/app/global/components";
import { accidentDetailActions } from "@/app/accident-database/shared/state";
export default {
  name: "AccidentDatabase",
  components: {
    PageHeader
  },
  computed: {
    
  },
  methods: {
    viewAccidentDetail() {
    this.$store.dispatch(accidentDetailActions.GET_ACCIDENT_DETAIL_DATA, '3452')
      this.$router.push(`/accident-database/3088`)
    }
  }
};
</script>
<style lang="scss">
</style>
