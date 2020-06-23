<template>
  <main class="mb-xl pt-md">
    <hr>
    <h2 class="mb-spacing-md">
      River Description
    </h2>
    <template v-if="loading || updatePending">
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
            v-if="!descriptionExpanded && sanitizedDescription.length > 2000"
            ref="description"
            class="description-content"
            v-html="sanitizedDescription.slice(0, 2000) + '...'"
          />
          <div
            v-else
            ref="description"
            class="description-content"
            v-html="sanitizedDescription"
          />
          <cv-button
            v-if="sanitizedDescription.length > 2000"
            class="mt-spacing-md"
            size="small"
            kind="tertiary"
            @click.exact="descriptionExpanded = !descriptionExpanded"
            @keydown.enter="descriptionExpanded = !descriptionExpanded"
          >
            {{ descriptionExpanded ? 'Show Less' : 'Show More' }}
          </cv-button>
        </template>
        <template v-else>
          <PageDescription description="This reach does not have a description. If you know about this reach, please tell us about it!">
            <cv-button
              kind="tertiary"
              size="small"
              @click.exact="toggleEditMode"
              @keydown.enter="toggleEditMode"
            >
              Add Description
            </cv-button>
          </PageDescription>
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
import { mapState } from 'vuex'
// the content editor needs to be directly imported?
import ContentEditor from '@/app/global/components/content-editor/content-editor.vue'
import { globalAppActions } from '@/app/global/state'
import { httpClient } from '@/app/global/services'
import PageDescription from '@/app/global/components/page-description/page-description'
export default {
  name: 'river-description',
  components: {
    'content-editor': ContentEditor,
    PageDescription
  },
  data: () => ({
    updatePending: false,
    error: false,
    refreshedDescription: '',
    updatedDescription: null,
    formData: {
      description: 'lorem ipsum.'
    },
    descriptionExpanded: false
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
      if (this.refreshedDescription) {
        return this.refreshedDescription
      } else if (this.riverDescription) {
        return this.cleanContent(this.riverDescription)
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
      if (this.updatedDescription) {
        this.updatePending = true

        httpClient.post('/graphql', {
          query: `
          mutation  {
            reachUpdate(id: ${this.reachId}, reach:{ description: "${this.cleanContent(this.updatedDescription)}"}) {
              description
            }
          }
        `
        }).then(r => {
          this.refreshedDescription = r.data.data.reachUpdate.description
          this.updatePending = false
          this.$store.dispatch(globalAppActions.SEND_TOAST, {
            title: 'Description Updated',
            kind: 'success',
            override: true,
            contrast: false,
            action: false,
            autoHide: true
          })
        }).catch(e => {
          this.updatePending = false
          this.error = true
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
    handleUpdate (v) {
      this.updatedDescription = v
    },
    handleEditorDestroy () {
      this.updatedDescription = ''
    },
    /**
     * use this to remove double quotes, inline style,
     * and other unwanted attributes n' such from river description.
     *
     * @note when updating river description, you need to remove
     * double quotes otherwise GQL will not be able to parse.
     *
     *
     * @todo add functionality to accept replacement pairs
      *
      * data = [ ['foo','bar'], ['joan','baez']]
      *
      *  run each pair through $replaceText and return
      * squeaky clean content.
     */
    cleanContent (data) {
      if (data) {
        let content = this.$sanitize(data, {
          disallowedAttributes: {
            '*': ['style', 'class']
          }
        })
        // href="../../content/River_detail_id_3190_"
        // content = this.$replaceText(content, '../../content/River_detail_id_', 'http://www.americanwhitewater.org/content/River/detail/id/')
        // debugger
        const updatedUrl = '/#/river-detail/'
        const legacyUrls = ['http://www.americanwhitewater.org/rivers/id/', 'http://www.americanwhitewater.org/content/River/detail/id/', 'http://www.americanwhitewater.org/content/River_detail_id_']

        const urlsLength = legacyUrls.length
        for (let i = 0; i < urlsLength; i++) {
          content = this.$replaceText(content, legacyUrls[i], updatedUrl)
        }

        content = this.$replaceText(content, '&nbsp;', '')
        // replace double quotes otherwise gql parsing error
        content = this.$replaceText(content, '"', '\'')

        return content
      }

      return null
    }
  },
  mounted () {
    this.formData.id = this.reachId
    this.formData.reachid = this.reachId
  }
}
</script>
<style lang="scss" scoped>
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
  @include carbon--breakpoint("max") {
    max-width: 80%;
  }
}
</style>

<style lang="scss" scoped>

p {
  @include carbon--type-style('expressive-heading-03')
}

</style>
