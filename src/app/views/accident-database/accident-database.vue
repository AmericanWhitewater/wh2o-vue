<template>
  <div class="accident-database">
    <template v-if="$route.name === 'accident-database'">
      <div class="bx--grid">
        <page-header title="Accident Database" />
      </div>
      <layout name="layout-full-width">
        <template #main>
          <div class="bx--row pt-lg">
            <div class="bx--col-sm-12 bx--col-md-4 bx--col-lg-6">
              <p class="mb-spacing-md">
                To access an accident report, visit the Accidents Tab on a river
                detail page. Or, click the button below for a preselected report.
              </p>
              <cv-button
                class="mr-sm"
                @click="$router.push('/accident-database/accident-detail/3088')"
              >
                Report Demo
              </cv-button>
              <cv-button @click="$router.push('/accident-database/new-report')">
                New Report
              </cv-button>
            </div>
          </div>
        </template>
      </layout>
    </template>
    <router-view />
  </div>
</template>
<script>
import { PageHeader } from '@/app/global/components'
import { accidentDatabaseActions } from './shared/state'
import { Layout } from '@/app/global/layout'
export default {
  name: 'AccidentDatabase',
  components: {
    PageHeader,
    Layout
  },
  metaInfo () {
    return {
      title: 'Accident Database - American Whitewater'
    }
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
  methods: {
    loadAccidents () {
      this.$store.dispatch(accidentDatabaseActions.GET_ACCIDENT_DATABASE_DATA)
    }
  },
  created () {}
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
