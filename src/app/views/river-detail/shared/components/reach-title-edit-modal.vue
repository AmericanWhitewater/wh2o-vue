<template>
  <div :class="[{ visible: visible }, 'reach-title-update-modal']">
    <cv-modal
      ref="modalWrapper"
      :visible="visible"
      @modal-shown="setModalOffset"
      @primary-click="submitForm"
      @secondary-click="handleCancel"
      @modal-hidden="handleCancel"
    >
      <template slot="title">
        Edit Reach Name
      </template>
      <template slot="content">
        <cv-text-input
          v-model="formData.river"
          class="mb-spacing-md"
          label="River"
        />
        <cv-text-input
          v-model="formData.section"
          label="Section"
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
  </div>
</template>
<script>
import { shadowDomFixedHeightOffset } from '@/app/global/mixins'
import { riverDetailActions } from '../state'
import { mapState } from 'vuex'
export default {
  name: 'reach-title-edit-modal',
  mixins: [shadowDomFixedHeightOffset],
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    formData: {
      river: '',
      section: ''
    }
  }),
  computed: {
    ...mapState({
      reach: state => state.RiverDetail.data
    })
  },
  methods: {
    handleCancel () {
      this.$emit('edit:cancelled')
    },
    submitForm () {
      this.$parent.editReachTitleModalVisible = false
      // these modals are super problematic. If we don't use nextTick here,
      // the class isn't removed from `body` and you can't scroll
      this.$nextTick(() => {
        this.$store.dispatch('RiverDetail/updateReach', this.formData)
      })
    }
  },
  mounted () {
    if (this.reach) {
      this.formData.river = this.reach.river
      this.formData.section = this.reach.section
    }
  }
}
</script>
