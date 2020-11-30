<template>
  <div>
    <div
      class="bx--article-card bx--tile bx--tile--clickable"
      @click.exact="readArticle"
      @keydown.enter="readArticle"
    >
      <div class="bx--article-card__img" />
      <div
        :class="[
          windowWidth > $options.breakpoints.lg
            ? 'bx--aspect-ratio--2x1'
            : 'bx--aspect-ratio--4x3',
          'bx--aspect-ratio'
        ]"
      >
        <div class="bx--aspect-ratio--object bx--article-card__tile">
          <h5
            v-if="subtitle"
            class="bx--article-card__subtitle"
            v-text="subtitle"
          />
          <h4
            v-if="title"
            class="bx--article-card__title"
            v-text="formatTitle(title)"
          />

          <div class="bx--article-card__info">
            <flow-color-block
              v-if="condition"
              :status="condition"
            />
            <div>
              <p
                v-if="author"
                class="bx--article-card__author"
                v-text="author"
              />
              <p
                v-if="datePosted"
                class="bx--article-card__date"
                v-text="datePosted"
              />
              <p
                class="bx--article-card__read-time"
                v-text="readTime"
              />
            </div>
          </div>
          <div class="bx--article-card__icon--action">
            <component
              :is="actionIcon"
              aria-label="Open"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FlowColorBlock } from '@/app/views/river-detail/components/main-tab/components'
import { checkWindow } from '@/app/global/mixins'
export default {
  name: 'article-card',
  components: {
    FlowColorBlock
  },
  mixins: [checkWindow],
  props: {
    disabled: {
      type: Boolean,
      required: false
    },
    thumbnailId: {
      type: String,
      required: false
    },
    datePosted: {
      type: String,
      required: false
    },
    title: {
      type: String,
      default: 'n/a',
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },
    author: {
      type: String,
      required: false
    },
    articleId: {
      type: String,
      required: true
    },
    readTime: {
      type: String,
      required: false
    },
    actionIcon: {
      type: String,
      required: false,
      default: 'ArrowRight20',
      validator: val => ['Launch20', 'ArrowRight20', 'Download20', 'Email20', 'Error20'].indexOf(val) > -1
    },
    river: {
      type: Boolean,
      required: false
    },
    condition: {
      type: String,
      required: false
    }
  },
  methods: {
    readArticle () {
      let path
      if (this.river) {
        path = `/river-detail/${this.articleId}/main`
      } else {
        // path = `/article/${this.articleId}`
        this.goToLink(this.formatLinkUrl(`content/Article/view/article_id/${this.articleId}/`))
      }

      this.$router.push(path).catch(() => {})
    },
    formatTitle (title) {
      if (this.windowWidth > this.$options.breakpoints.lg && title.length > 41) {
        return title.slice(0, 41) + '...'
      }
      if (this.windowWidth < this.$options.breakpoints.md && title.length > 41) {
        return title.slice(0, 100) + '...'
      }
      return title
    }
  }
}
</script>
