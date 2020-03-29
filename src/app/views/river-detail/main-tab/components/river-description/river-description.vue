<template>
  <main class="mb-xl">
    <hr>
    <h2 class="mb-spacing-md">
      River Description
    </h2>
    <template v-if="loading">
      <cv-skeleton-text
        class="cv-skeleton-text"
        paragraph
        :line-count="3"
      />
    </template>
    <template v-else-if="river">
      <template v-if="!editMode">
        <template v-if="sanitizedDescription">
          <div
            ref="description"
            class="description-content"
            v-html="sanitizedDescription"
          />
        </template>
        <template v-else>
          <p class="mb-2">
            This reach does not have a description. If you know about this
            reach, please tell us about it!
          </p>
          <cv-button
            kind="tertiary"
            size="small"
            @click="toggleEditMode"
          >
            Add Description
          </cv-button>
        </template>
      </template>
      <template v-else>
        <content-editor
          :content="
            sanitizedDescription ? sanitizedDescription : 'start typing...'
          "
          show-control-bar
          @content:updated="handleUpdate"
          @editor:destroyed="handleEditorDestroy"
        />
        <cv-button
          class="mt-spacing-sm"
          @click.exact="submitForm"
          @keydown.enter="submitForm"
        >
          Submit
        </cv-button>
      </template>
    </template>
    <template v-else>
      <cv-skeleton-text
        class="cv-skeleton-text"
        paragraph
        :line-count="3"
      />
    </template>
  </main>
</template>
<script>
import { appBaseUrl } from '@/app/environment/environment'
import { mapState } from 'vuex'
// the content editor needs to be directly imported?
import ContentEditor from '@/app/global/components/content-editor/content-editor.vue'
import { globalAppActions } from '@/app/global/state'
import { httpClient } from '@/app/global/services'
export default {
  name: 'river-description',
  components: {
    'content-editor': ContentEditor
  },
  data: () => ({
    updatedDescription: '',
    formData: {
      id: null,
      reachid: null,
      description: 'lorem ipsum.',
      is_final: null,
      was_final: null
    }
  }),
  computed: {
    ...mapState({
      river: state => state.riverDetailState.riverDetailData.data,
      loading: state => state.riverDetailState.riverDetailData.loading,
      riverDescription: state =>
        state.riverDetailState.riverDetailData.data.description,
      editMode: state => state.appGlobalState.appGlobalData.editMode
    }),
    sanitizedDescription () {
      if (this.riverDescription) {
        const content = this.$sanitize(this.river.description, {
          disallowedAttributes: {
            '*': ['style']
          }
        })

        // const openingTags = this.$replaceText(content, '<div>', '<p>')
        // const closingTags = this.$replaceText(openingTags, '</div>', '</p>')

        const legacyUrl = 'http://www.americanwhitewater.org/rivers/id/'
        const updatedUrl = `${appBaseUrl}/#/river-detail/`

        return this.$replaceText(content, legacyUrl, updatedUrl)
      }
      return null
    },
    reachId () {
      return this.$route.params.id
    }
  },
  methods: {
    toggleEditMode () {
      this.$store.dispatch(globalAppActions.TOGGLE_EDIT_MODE, !this.editMode)
    },
    submitForm () {
      const url = `https://beta.americanwhitewater.org/content/StreamTeam/edit-skdescription:1/reachid/${this.reachId}`
      httpClient.post(url, JSON.stringify(this.formData))
    },
    handleUpdate (v) {
      this.updatedDescription = v
    },
    handleEditorDestroy () {
      this.updatedDescription = ''
    }
  },
  mounted () {
    this.formData.id = this.reachId
    this.formData.reachid = this.reachId
  }
}
</script>
<style lang="scss">
main {
  p {
    margin-bottom: 1.25rem;
  }
}

.description-content {
  @include carbon--type-style("body-long-02");
  p {
    margin-bottom: 1.25rem;
  }

  @include carbon--breakpoint("lg") {
    padding-right: $spacing-xl;
  }
}
</style>
