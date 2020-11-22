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
          v-for="(item, index) in reachClasses"
          :key="index"
          :value="item"
        >
          {{ item }}
        </cv-dropdown-item>
      </cv-dropdown>
      <cv-number-input
        v-model="formData.avggradient"
        class="mb-spacing-md"
        label="Average Gradient"
        step=".01"
        :max="4132"
        :min="0"
        :mobile="windowWidth <= $options.breakpoints.md"
      />
      <cv-number-input
        v-model="formData.maxgradient"
        class="mb-spacing-md"
        label="Maximum Gradient"
        step=".01"
        :max="4132"
        :min="0"
        :mobile="windowWidth <= $options.breakpoints.md"
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
import { reachClasses, checkWindow, shadowDomFixedHeightOffset } from '@/app/global/mixins'

export default {
  name: 'beta-box-edit-modal',
  mixins: [reachClasses, checkWindow, shadowDomFixedHeightOffset],
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    formData: {
      class: '',
      avggradient: null,
      maxgradient: null
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
      this.$parent.editModalVisible = false
    },
    submitForm () {
      this.$emit('edit:submit')
      this.$parent.editModalVisible = false
      this.$nextTick(() => {
        this.$store.dispatch('RiverDetail/updateProperty', this.formData)
      })
    }
  },
  mounted () {
    if (this.reach) {
      this.formData.class = this.reach.class
      this.formData.avggradient = this.reach.avggradient
      this.formData.maxgradient = this.reach.maxgradient
    }
  }
}
</script>
