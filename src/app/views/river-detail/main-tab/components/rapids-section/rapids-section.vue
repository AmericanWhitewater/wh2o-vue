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

    <template v-else-if="sortedRapids && !error">
      <div class="">
        <cv-button
          id="new-rapid"
          class="mr-spacing-sm mb-sm"
          size="small"
          kind="secondary"
          @click.exact="newRapidModalVisible = true"
          @keydown.enter="newRapidModalVisible = true"
        >
          New Rapid
        </cv-button>
      </div>

      <template v-if="sortedRapids.length > 0">
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
        <utility-block
          state="content"
          text="No rapids have been added"
        />
      </template>
    </template>
    <template v-else>
      <utility-block state="error" />
    </template>
    <rapid-edit-modal
      :visible="newRapidModalVisible"
      @edit:cancelled="newRapidModalVisible=false"
    />
  </section>
</template>
<script>
import { RapidItem, RapidEditModal } from './components'
import { checkWindow } from '@/app/global/mixins'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { mapState } from 'vuex'
import { rapidsActions } from '../../../shared/state'

export default {
  name: 'rapids-section',
  components: {
    RapidItem,
    UtilityBlock,
    RapidEditModal
  },
  mixins: [checkWindow],
  data: () => ({
    newRapidModalVisible: false,
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
      if (this.rapids && this.rapids.length > 0) {
        return this.rapids.sort((a, b) => (a.distance > b.distance ? 1 : -1))
      }
      return []
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
