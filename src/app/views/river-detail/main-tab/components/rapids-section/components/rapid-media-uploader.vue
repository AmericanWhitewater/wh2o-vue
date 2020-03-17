<template>
  <div>
    <div
      class="bx--row pb-md"
    >
      <div class="bx--col bx--col-md-7 bx--col-lg-8">
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
          theme="light"
          label="Video Embed URL"
          class="mb-spacing-md"
        />
        <cv-text-area
          theme="light"
          label="Description"
          class="mb-spacing-lg"
        />
        <cv-button-set>
          <cv-button
            kind="secondary"
            @click.exact="showConfirmation = true"
          >
            Cancel
          </cv-button>
          <cv-button kind="primary">
            Submit
          </cv-button>
        </cv-button-set>
      </div>
    </div>
    <cv-modal
      :visible="showConfirmation"
      @modal-hidden="cancelUpload"
      @primary-click="cancelUpload"
    >
      <template slot="title">
        Are you sure?
      </template>
      <template slot="content">
        <p>All unsaved changes will be lost.</p>
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
    </cv-modal>
  </div>
</template>

<script>
export default {
  name: 'rapid-media-uploader',
  data: () => ({
    showConfirmation: false
  }),
  methods: {
    cancelUpload () {
      this.$emit('cancel')
    }
  }
}
</script>

<style>

</style>
