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
      <cv-select
        v-model="formData.class"
        class="mb-spacing-md"
        label="Difficulty"
      >
        <cv-select-option
          v-for="(item, index) in reachClasses"
          :key="index"
          :value="item"
        >
          {{ item }}
        </cv-select-option>
      </cv-select>
      <cv-number-input
        v-model="formData.avggradient"
        class="mb-spacing-md"
        label="Average Gradient"
        step="1"
        :max="4132"
        :min="0"
      />
      <cv-number-input
        v-model="formData.maxgradient"
        class="mb-spacing-md"
        label="Maximum Gradient"
        step="1"
        :max="4132"
        :min="0"
      />
      <cv-text-input
        v-model="formData.permiturl"
        class="mb-spacing-md"
        label="Permit URL"
      />
      <cv-text-input
        v-model="formData.permitinfo"
        class="mb-spacing-md"
        label="Permit Information"
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
    formData: {}
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

      this.$store.dispatch('RiverDetail/updateProperty', {
          id: this.$route.params.id,
          class: this.formData.class,
          avggradient: Number(this.formData.avggradient),
          maxgradient: Number(this.formData.maxgradient),
          permitinfo: this.formData.permitinfo,
          permiturl: this.formData.permiturl
        })

         this.$parent.editModalVisible = false
    }
  },
  mounted () {
    if (this.reach) {
      this.formData = {...this.reach}
    }
  },
  beforeDestroy() {
    document.body.classList.remove('bx--body--with-modal-open')
  }
}
</script>
