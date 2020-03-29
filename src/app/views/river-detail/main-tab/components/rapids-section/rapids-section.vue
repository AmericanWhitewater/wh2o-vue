<template>
  <section
    v-view.once="loadRapids"
    class="rapids-section mb-xl"
  >
    <hr>
    <h2 class="mb-spacing-md">
      Rapids
    </h2>
    <template v-if="loading">
      <utility-block state="loading" />
    </template>

    <template v-else-if="sortedRapids">
      <div class="">
        <cv-button
          class="mr-spacing-sm mb-sm"
          size="small"
          kind="secondary"
          @click.exact="newRapidModalVisible = true"
        >
          Add Rapid
        </cv-button>
      </div>

      <div class="bx--row">
        <rapid-item
          v-for="(rapid, index) in sortedRapids"
          :key="index"
          :rapid="rapid"
          :first-p-o-i="index === 0 ? true : false"
        />
      </div>
    </template>
    <template v-else>
      <utility-block state="error" />
    </template>
  </section>
</template>
<script>
import { RapidItem } from './components'
import { checkWindow } from '@/app/global/mixins'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { mapState } from 'vuex'
import { rapidsActions } from '../../../shared/state'

export default {
  name: 'rapids-section',
  components: {
    RapidItem,
    UtilityBlock
  },
  mixins: [checkWindow],
  data: () => ({
    formData: {
      files: [],
      name: '',
      distance: '',
      class: '',
      description: ''
    }
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.rapidsData.loading,
      error: state => state.riverDetailState.rapidsData.error,
      rapids: state => state.riverDetailState.rapidsData.data
    }),
    sortedRapids () {
      if (this.rapids) {
        return this.rapids.sort((a, b) => (a.distance > b.distance ? 1 : -1))
      }
      return null
    }
  },
  methods: {
    loadRapids () {
      this.$store.dispatch(
        rapidsActions.FETCH_RAPIDS_DATA,
        this.$route.params.id
      )
    }
  }
}
</script>
