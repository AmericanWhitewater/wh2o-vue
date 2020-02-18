<template>
  <div class="accident-database bx--grid">
    <page-header title="Accident Database" />
    <div class="bx--row pt-lg">
      <div class="bx--col-sm-12 bx--col-md-4 bx--col-lg-6">
        <p class="mb-spacing-md">
          To access an accident report, visit the Accidents Tab on a river
          detail page. Or, click the button below for a preselected report.
        </p>
        <cv-button @click="viewAccidentDetail">
          Report Demo
        </cv-button>
      </div>
    </div>
  </div>
</template>
<script>
import { PageHeader } from '@/app/global/components'
import { accidentDatabaseActions, accidentDetailActions } from './shared/state'

export default {
  name: 'AccidentDatabase',
  components: {
    PageHeader
  },
  computed: {
    loading () {
      return this.$store.state.accidentDatabaseState.accidentDatabaseData
        .loading
    },
    accidents () {
      return this.$store.state.accidentDatabaseState.accidentDatabaseState.data
    }
  },
  created () {},
  methods: {
    viewAccidentDetail () {
      this.$store.dispatch(
        accidentDetailActions.GET_ACCIDENT_DETAIL_DATA,
        '3452'
      )
      this.$router.push('/accident-database/3088')
    },
    loadAccidents () {
      this.$store.dispatch(accidentDatabaseActions.GET_ACCIDENT_DATABASE_DATA)
    }
  }
}
</script>
<style lang="scss">
.accident-database {
  padding-bottom: $layout-lg;
  .spacer {
    margin-bottom: $layout-sm;
  }
  .news-tile {
    padding: 0;
    @include ease;
    &:hover {
      @include layer("raised");
    }
    img {
      height: 150px;
      width: 100%;
      object-fit: cover;
    }
    .content-area {
      padding: $spacing-sm;
      p {
        margin-bottom: $spacing-sm;
      }
    }
  }
}
</style>
