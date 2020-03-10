<template>
  <div :class="[containerClasses, 'rapid-item']">
    <cv-tile
      v-if="rapid.description"
      :kind="rapid.description.length > 50 ? 'expandable' : 'standard'"
      :cv-type="rapid.description.length > 50 ? 'expandable' : ''"
      :expanded="expanded"
    >
      <div class="top-bar">
        <div class>
          <h4>{{ rapid.name }}</h4>
          <span class="mr-spacing-xs">Class: {{ rapid.difficulty }}</span>
          <span>Distance: {{ rapid.distance }}</span>
        </div>
        <rapid-icon-bar :data="rapid" />
      </div>
      <template slot="below">
        <div class="bx--row">
          <div class="bx--col-sm-12 bx--col-md-2">
            <div class="outside">
              <div class="inside thumbnail">
                <img
                  v-if="rapid.photo"
                  :src="
                    `https://americanwhitewater.org${rapid.photo.url}`
                  "
                  :alt="rapid.name"
                >
              </div>
            </div>
          </div>
          <div class="bx--col-sm-12 bx--col-md-6">
            <div v-html="sanitizedDescription" />
          </div>
        </div>
      </template>
    </cv-tile>
  </div>
</template>
<script>
import RapidIconBar from './rapid-icon-bar'

export default {
  name: 'RapidsItem',
  components: {
    'rapid-icon-bar': RapidIconBar
  },
  props: {
    rapid: {
      type: Object,
      required: true
    },
    expanded: {
      type: Boolean,
      required: false
    },
    mode: {
      type: String,
      default: 'grid'
    }
  },
  computed: {
    containerClasses () {
      let classes
      if (this.mode === 'list') {
        classes = 'bx--col-sm-12 bx--col-md-12 bx--col-lg-16'
      } else {
        classes = 'bx--col-sm-12 bx--col-md-6 bx--col-lg-4'
      }
      return classes
    },
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
  }
}
</script>
<style lang="scss">
.rapid-item {
  .bx--tile {
    margin: $spacing-md 0;

    .thumbnail {
      width: 100%;
      min-height: 250px;
      background-color: $ui-03;
      margin-bottom: 1rem;
      img {
        object-fit: cover;
        height: 250px;
        width: 100%;
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
</style>
