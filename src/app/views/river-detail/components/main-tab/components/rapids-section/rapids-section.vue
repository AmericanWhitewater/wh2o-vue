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
      Add Feature
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
            @rapid:delete="triggerDelete"
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
      :key="currentlyEditingRapid ? currentlyEditingRapid.id : reachId"
      :rapid-id="currentlyEditingRapid ? currentlyEditingRapid.id : null"
      :rapid-modal-visible="rapidModalVisible"
      @edit:cancelled="closeModal('edit')"
      @edit:success="closeModal('edit')"
    />
    <confirm-delete-modal
      v-if="editMode"
      :visible="rapidDeleteModalVisible"
      :resource-name="currentlyDeletingRapid ? currentlyDeletingRapid.name : ''"
      @delete:cancelled="closeModal('delete')"
      @delete:success="closeModal('delete')"
      @delete:confirmed="deleteRapid(currentlyDeletingRapid)"
    />
  </section>
</template>
<script>
import { RapidItem, RapidEditModal } from './components'
import UtilityBlock from '@/app/global/components/utility-block/utility-block'
import ConfirmDeleteModal from "@/app/global/components/confirm-delete-modal/confirm-delete-modal.vue";
import { mapState } from 'vuex'

export default {
  name: 'rapids-section',
  components: {
    RapidItem,
    UtilityBlock,
    RapidEditModal,
    ConfirmDeleteModal,
  },
  data: () => ({
    rapidModalVisible: false,
    rapidDeleteModalVisible: false,
    currentlyEditingRapid: null,
    currentlyDeletingRapid: null,
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
    triggerEdit (rapid) {
      this.currentlyEditingRapid = rapid
      this.rapidModalVisible = true
    },
    triggerDelete (rapid) {
      this.currentlyDeletingRapid = rapid;
      this.rapidDeleteModalVisible = true;
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
    deleteRapid(rapid) {
      this.rapidDeleteModalVisible = false;
      this.$store.dispatch("RiverRapids/deleteRapid", rapid.id);
    },
    closeModal (whichModal) {
      // ensure that actual modal hide() lifecycle completes
      // basically, if the key changes too quickly, the modal hide()
      // action doesn't complete so this class "bx--body--with-modal-open"
      // doesn't get removed from the body *which prevents scrolling*
      if (whichModal === 'edit') {
        this.rapidModalVisible = false;
        this.$nextTick(() => { this.currentlyEditingRapid = null })
      } else if (whichModal === 'delete') {
        this.rapidDeleteModalVisible = false;
        this.$nextTick(() => { this.currentlyDeletingRapid = null });
      }
    }
  }
}
</script>
