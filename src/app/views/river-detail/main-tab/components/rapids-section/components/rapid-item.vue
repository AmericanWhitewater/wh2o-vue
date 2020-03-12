<template>
  <div :class="[{'form-visible':uploadFormVisible}, 'rapid-item, bx--col-sm-12 bx--col-md-12 bx--col-lg-16 mb-sm']">
    <cv-tile
      v-if="rapid.description"
      kind="standard"
      cv-type="standard"
      :expanded="firstPOI"
    >
      <div class="top-bar">
        <div class="title">
          <h4>{{ rapid.name }}</h4>
          <span
            v-if="rapid.difficulty !== 'N/A'"
            class="mr-spacing-xs"
            v-text="`Class: ${rapid.difficulty}`"
          />
          <span v-text="`Distance: ${rapid.distance}`" />
        </div>
        <rapid-icon-bar :data="rapid" />
      </div>
      <hr class="ui-03">
      <template>
        <div
          v-if="!uploadFormVisible"
          class="bx--row pb-md"
        >
          <div class="bx--col-sm-12 bx--col-lg-5">
            <div class="outside ">
              <div
                v-if="false"
                class="inside thumbnail bx--aspect-ratio--1x1"
              >
                <img

                  :src="
                    `https://americanwhitewater.org/${rapid.photo.uri}`
                  "
                  :alt="rapid.name"
                >
              </div>
              <div
                v-else
                class="inside upload-prompt"
              >
                <cv-button
                  size="small"
                  kind="tertiary"
                  class="mb-spacing-lg"
                  @click="uploadFormVisible = true"
                >
                  Add Media
                </cv-button>
              </div>
            </div>
          </div>
          <div class="bx--col-sm-12 bx--col-lg-11">
            <div
              class="description"
              v-html="sanitizedDescription"
            />
          </div>
        </div>
        <div
          v-else
          class="bx--row pb-md"
        >
          <div class="bx--col bx--col-md-7 bx--col-lg-8">
            <cv-form @submit.prevent="">
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
            </cv-form>
          </div>
        </div>
      </template>
    </cv-tile>
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
import RapidIconBar from './rapid-icon-bar'

export default {
  name: 'rapids-item',
  components: {
    'rapid-icon-bar': RapidIconBar
  },
  props: {
    rapid: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      default: 'grid'
    },
    firstPOI: {
      type: Boolean
    }
  },
  data: () => ({
    uploadFormVisible: false,
    showConfirmation: false
  }),
  computed: {
    sanitizedDescription () {
      if (this.rapid) {
        const content = this.$sanitize(this.rapid.description, {
          disallowedAttributes: {
            '*': ['style']
          }
        })

        const openingTags = this.$replaceText(content, '<div>', '<p>')
        const closingTags = this.$replaceText(openingTags, '</div>', '</p>')

        const legacyUrl = 'http://www.americanwhitewater.org/rivers/id/'
        const updatedUrl = '/#/river-detail/'

        return this.$replaceText(closingTags, legacyUrl, updatedUrl)
      }
      return null
    }
  },
  methods: {
    uploadMedia () {
      return 'upload media'
    },
    cancelUpload () {
      this.showConfirmation = false
      this.uploadFormVisible = false
    }
  },
  created () {
    if (this.firstPOI) {
      this.rapidExpanded = true
    }
  }
}
</script>
<style lang="scss">
.rapid-item {
  &.form-visible {
    outline: 3px solid $brand-01;
  }
  .bx--tile {
    margin: $spacing-md 0;
  .upload-prompt {
        width:100%;
        display: block;
      }
    .thumbnail {
      width: 100%;
      min-height: 250px;
      margin-bottom: 1rem;
      img {
        object-fit: cover;
        height: 250px;
        width: 100%;
        background-color: $ui-05;
      }

    }
  }
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    span {
      font-size: 14px;
      &:nth-child(1) {
        margin-right: 0.5rem;
      }
    }
  }

  .bx--tile--is-expanded {
    .bx--tile-content {
      .bx--tile-content__below-the-fold {
        border-top: solid 1px $ui-03;
        margin-top: $spacing-sm;
        padding-bottom: $spacing-lg;
        padding-top: 1rem;
      }
    }
  }

  .bx--tile--expandable:hover {
    background-color: darken($ui-02, 0.05);
  }
}

.description {
  @include carbon--type-style('body-long-01')
}
</style>
