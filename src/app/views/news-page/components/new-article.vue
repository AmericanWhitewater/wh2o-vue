<template>
  <div class="new-article">
    <layout name="layout-full-width">
      <template #main>
        <hr>
        <h1 class="mb-spacing-lg">
          New Article
        </h1>
        <cv-button
          kind="tertiary"
          class="mr-spacing-sm"
          @click="cancelDialogVisible = true"
        >
          Cancel
        </cv-button>
        <cv-button kind="primary">
          Save
        </cv-button>
        <div class="mb-lg" />
        <content-editor
          :content="articleCopy"
          show-control-bar
        />
      </template>
    </layout>
    <cv-modal
      :visible="cancelDialogVisible"
      @modal-hidden="cancelDialogVisible = false"
    >
      <template slot="title">
        Discard Draft
      </template>
      <template slot="content">
        <p>
          Are you sure you want to discard your draft? All changes will be lost.
        </p>
      </template>
      <template slot="secondary-button">
        cancel
      </template>
      <template slot="primary-button">
        confirm
      </template>
    </cv-modal>
  </div>
</template>

<script>
import { Layout } from '@/app/global/layout'
import ContentEditor from '@/app/global/components/content-editor/content-editor'
export default {
  name: 'new-article',
  components: {
    Layout,
    ContentEditor
  },
  data: () => ({
    articleCopy: '',
    cancelDialogVisible: false
  })
}
</script>

<style>
</style>
