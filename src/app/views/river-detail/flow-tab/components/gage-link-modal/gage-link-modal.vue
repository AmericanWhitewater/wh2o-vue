<template>
  <div>
    <cv-modal
      ref="modalWrapper"
      size="small"
      :visible="modalVisible"
      @primary-click="handleSubmit"
      @secondary-click="close()"
      @modal-shown="handleShow"
      @modal-hidden="close()"
    >
      <template slot="label">
        Label
      </template>
      <template slot="title">
        Link Gage To Reach
      </template>
      <template slot="content">
        <cv-combo-box
          :auto-filter="false"
          :auto-highlight="false"
          :value="formSelectedGage"
          :options="gageResults || []"
        />
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        OK
      </template>
    </cv-modal>
  </div>
</template>
<script>
export default {
  name: 'gage-link-modal',
  data: () => ({
    modalVisible: false,
    formSelectedGage: '',
    gageResults: null
  }),
  methods: {
    open () {
      this.modalVisible = true
    },
    close () {
      this.modalVisible = false
    },
    handleSubmit () {
      console.log('handle submit')
    },
    handleCancel () {
      console.log('cancel')
    },
    handleShow () {
      console.log('modal visible')
    }
  }
}
</script>
