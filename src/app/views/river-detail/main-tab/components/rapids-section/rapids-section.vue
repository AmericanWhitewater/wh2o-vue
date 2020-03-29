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
    <cv-modal
      :visible="newRapidModalVisible"
      @primary-click="notifyUser"
      @secondary-click="cancelNewRapid"
    >
      <template slot="title">
        New Rapid
      </template>
      <template slot="content">
        <cv-file-uploader
          ref="fileUploader"
          label="Choose files to upload"
          helper-text="Max file size 10mb - PNG, JPG"
          accept=".jpg,.png"
          theme="light"
          multiple
          class="mb-spacing-md"
        />
        <cv-text-input
          v-model="formData.name"
          label="Name"
          class="mb-spacing-md"
        />
        <cv-text-input
          v-model="formData.distance"
          label="Distance"
          class="mb-spacing-md"
        />
        <cv-text-input
          v-model="formData.class"
          label="Class"
          class="mb-spacing-md"
        />
        <cv-text-area
          v-model="formData.description"
          label="Description"
          theme="light"
          class="mb-spacing-md"
        />
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        Submit
      </template>
    </cv-modal>
  </section>
</template>
<script>
import { RapidItem } from './components'
import { checkWindow } from '@/app/global/mixins'
import { globalAppActions } from '@/app/global/state'
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
      if (this.rapids) {
        const rapids = this.rapids
        return rapids.sort((a, b) => (a.distance > b.distance ? 1 : -1))
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
    },
    cancelNewRapid () {
      this.newRapidModalVisible = false
    },
    notifyUser () {
      this.newRapidModalVisible = false
      this.$store.dispatch(globalAppActions.SEND_TOAST, {
        title: 'Rapid Created',
        kind: 'success',
        override: true,
        contrast: false,
        action: false,
        autoHide: true
      })
    }
  }
}
</script>
