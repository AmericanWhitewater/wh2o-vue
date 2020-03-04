<template>
  <section class="rapids-section">
    <hr>
    <h2 class="mb-spacing-md">
      Rapids
    </h2>
    <template v-if="!loading && sortedRapids">
      <div>
        <cv-button
          kind="tertiary"
          size="small"
          label="Grid View"
          class="mr-spacing-sm"
          @click.prevent="viewMode = 'grid'"
        >
          <Grid16 />
        </cv-button>
        <cv-button
          kind="tertiary"
          size="small"
          label="List View"
          @click.prevent="viewMode = 'list'"
        >
          <List16 />
        </cv-button>
      </div>

      <div class="bx--row">
        <rapid-item
          v-for="(rapid, index) in sortedRapids"
          :key="index"
          :rapid="rapid"
          :expanded="index === 0 ? true : false"
          :mode="viewMode"
        />
      </div>
    </template>
    <template v-if="!loading && !sortedRapids">
      This reach has no rapid data.
    </template>
    <template v-if="error">
      <div class="">
        error
      </div>
    </template>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import { RapidItem } from './components'

export default {
  name: 'RapidsSection',
  components: {
    RapidItem
  },
  data: () => ({
    viewMode: 'list'
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.rapidsData.loading,
      error: state => state.riverDetailState.rapidsData.error,
      rapids: state => state.riverDetailState.rapidsData.data
    }),
    sortedRapids () {
      if (this.rapids) {
        const rapids = this.rapids
        return rapids.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
      }
      return null
    }
  }
}
</script>
