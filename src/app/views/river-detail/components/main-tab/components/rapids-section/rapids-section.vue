<template>
  <section
    class="rapids-section mb-xl"
  >
    <hr>
    <h2 class="mb-spacing-md">
      River Features
    </h2>
    <cv-button
      v-if="editMode"
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
            @rapid:edit="triggerEdit"
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
      v-if="editMode"
      :key="currentlyEditingRapidId || reachId"
      :rapid-id="currentlyEditingRapidId"
      :rapid-modal-visible="rapidModalVisible"
      @edit:cancelled="closeModal"
      @edit:success="closeModal"
    />
  </section>
</template>
<script>
import { RapidItem, RapidEditModal } from './components'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import { mapState } from 'vuex'

export default {
  name: 'rapids-section',
  components: {
    RapidItem,
    UtilityBlock,
    RapidEditModal
  },
  data: () => ({
    rapidModalVisible: false,
    currentlyEditingRapidId: null,
    formData: {
      files: [],
      name: '',
      distance: '',
      class: '',
      description: '',
      geom: {}
    }
  }),
  computed: {
    ...mapState({
      loading: state => state.RiverRapids.loading,
      error: state => state.RiverRapids.error,
      rapids: state => state.RiverRapids.data,
      user: state => state.User.data,
      editMode: state => state.Global.editMode
    }),
    reachId() {
      return this.$route.params.id
    }
  },
  methods: {
    triggerEdit (rapidId) {
      this.currentlyEditingRapidId = rapidId
      this.rapidModalVisible = true
    },
    openModal () {
      if (this.user) {
        this.rapidModalVisible = true
      } else {
        this.$store.dispatch('Global/sendToast', {
          title: 'Must Log In',
          kind: 'error',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      }
    },
    closeModal () {
      this.rapidModalVisible = false
      // ensure that actual modal hide() lifecycle completes
      // basically, if the key changes too quickly, the modal hide()
      // action doesn't complete so this class "bx--body--with-modal-open"
      // doesn't get removed from the body *which prevents scrolling*
      this.$nextTick(() => { this.currentlyEditingRapidId = null })
    }
  }
}
</script>
