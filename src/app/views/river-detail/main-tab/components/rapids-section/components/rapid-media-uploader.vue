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
            @click.exact="$emit('cancel')"
          >
            Cancel
          </cv-button>
          <cv-button kind="primary">
            Submit
          </cv-button>
        </cv-button-set>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rapid-media-uploader',
  data: () => ({
    showConfirmation: false
  })
}
</script>

<style>

</style>
