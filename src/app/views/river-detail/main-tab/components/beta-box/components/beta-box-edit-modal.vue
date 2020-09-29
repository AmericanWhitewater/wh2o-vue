<template>
  <cv-modal
    ref="modalWrapper"
    :visible="visible"
    size="small"
    :primary-button-disabled="false"
    auto-hide-off
    class="beta-box-edit-modal"
    @modal-shown="setModalOffset"
    @primary-click="submitForm"
    @secondary-click="handleCancel"
    @modal-hidden="handleCancel"
    @modal-hide-request="handleCancel"
  >
    <template slot="title">
      Edit Beta Box
    </template>
    <template slot="content">
      <cv-dropdown
        v-model="formData.class"
        class="cv-dropdown mb-spacing-md"
        label="Difficulty"
        theme="light"
      >
        <cv-dropdown-item
          v-for="(item, index) in poiClasses"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </cv-dropdown-item>
      </cv-dropdown>
      <cv-number-input
        v-model="formData.length"
        class="mb-spacing-md"
        label="Length"
        step=".01"
        :max="4132"
        :min="0"
        :mobile="windowWidth <= $options.breakpoints.md"
        :disabled="formPending"
      />
      <cv-number-input
        v-model="formData.avggradient"
        class="mb-spacing-md"
        label="Average Gradient"
        step=".01"
        :max="4132"
        :min="0"
        :mobile="windowWidth <= $options.breakpoints.md"
        :disabled="formPending"
      />
      <cv-number-input
        v-model="formData.maxgradient"
        class="mb-spacing-md"
        label="Maximum Gradient"
        step=".01"
        :max="4132"
        :min="0"
        :mobile="windowWidth <= $options.breakpoints.md"
        :disabled="formPending"
      />
    </template>
    <template slot="secondary-button">
      Cancel
    </template>
    <template slot="primary-button">
      Save
    </template>
  </cv-modal>
</template>
<script>
import { mapState } from 'vuex'
import { poiClasses, checkWindow, shadowDomFixedHeightOffset } from '@/app/global/mixins'
import { globalAppActions } from '@/app/global/state'
import { httpClient } from '@/app/global/services'

export default {
  name: 'beta-box-edit-modal',
  mixins: [poiClasses, checkWindow, shadowDomFixedHeightOffset],
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    formError: false,
    formPending: false,
    formData: {
      primaryGage: '',
      class: '',
      avggradient: 0,
      maxgradient: 0
    }
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.riverDetailData.loading,
      river: state => state.riverDetailState.riverDetailData.data,
      error: state => state.riverDetailState.riverDetailData.error,
      editMode: state => state.appGlobalState.appGlobalData.editMode,
      gages: state => state.riverDetailState.reachGagesData.data
    }),
    reachId () {
      return this.$route.params.id
    }
  },
  methods: {
    handleCancel () {
      this.$emit('edit:cancelled')
      this.$parent.editModalVisible = false
    },
    setForm () {
      if (this.river) {
        this.formData.class = this.river.class || 'I'
        this.formData.length = this.river.length || 0
        this.formData.avggradient = this.river.avggradient || 0
        this.formData.maxgradient = this.river.maxgradient || 0
      }
    },
    submitForm () {
      this.$emit('edit:submit')
      this.$parent.editModalVisible = false
      this.formPending = true
      this.formError = false

      httpClient.post('/graphql', {
        query: `
          mutation  {
            reachUpdate(id: ${this.reachId}, reach:{ 
              class: "${this.formData.class}",
              length: ${parseFloat(this.formData.length)},
              avggradient: ${parseInt(this.formData.avggradient, 10)},
              maxgradient: ${parseInt(this.formData.maxgradient, 10)}
              }) {
              class
              length
              avggradient
              maxgradient
            }
          }
        `
      }).then(r => {
        this.formPending = false
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Beta Box Updated',
          kind: 'success',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      }).catch(e => {
        this.formPending = false
        this.formError = true
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Update Failed',
          kind: 'error',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      })
    }
  },
  mounted () {
    this.setForm()
  }
}
</script>
