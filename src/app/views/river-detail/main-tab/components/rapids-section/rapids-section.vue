<template>
  <section
    v-view.once="loadRapids"
    class="rapids-section mb-xl"
  >
    <hr>
    <h2 class="mb-spacing-md">
      Rapids
    </h2>
    <cv-button
      id="new-rapid"
      class="mr-spacing-sm mb-sm"
      size="small"
      :disabled="loading"
      kind="secondary"
      @click.exact="openModal"
      @keydown.enter="openModal"
    >
      New Rapid
    </cv-button>
    <template v-if="loading">
      <utility-block state="loading" />
    </template>

    <template v-else-if="rapids && !error">
      <template v-if="rapids.length > 0">
        <div class="bx--row">
          <rapid-item
            v-for="(rapid, index) in rapids"
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
import { rapidsActions } from '@/app/views/river-detail/shared/state'
import { globalAppActions } from '@/app/global/state'

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
      rapids: state => state.riverDetailState.rapidsData.data,
      user: state => state.userState.userData.data
    })
  },
  methods: {
    openModal () {
      if (this.user) {
        this.newRapidModalVisible = true
      } else {
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Must Log In',
          kind: 'error',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      }
    },
    loadRapids () {
      this.$store.dispatch(
        rapidsActions.FETCH_RAPIDS_DATA,
        this.$route.params.id
      )
    }
  }
}
</script>
