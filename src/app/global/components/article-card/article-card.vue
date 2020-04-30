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
import { FlowColorBlock } from '@/app/views/river-detail/main-tab/components'
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
      type: Number,
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
        path = `/article/${this.articleId}`
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

<style lang="scss" scoped>
.bx--article-card .bx--tile {
  background: $ui-background;
  height: 100%;
  padding: 0;
  position: relative;
  transition: background $duration--fast-01;
  text-decoration: none;
  margin-bottom: $spacing-05;
  z-index: 1;
}

.bx--article-card:hover .bx--tile {
  background: $hover-ui;
}

.bx--article-card__tile {
  z-index: 1;
  padding: $spacing-05 25% $spacing-05 $spacing-05;
}

.bx--article-card__title {
  @include carbon--type-style("productive-heading-03");
  text-decoration: none;
  color: $text-01;
}

.bx--article-card__subtitle {
  @include carbon--type-style("heading-01");
  font-weight: 400;
  text-decoration: none;
  color: $text-01;
}

.bx--article-card__info {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  padding: 0;
  color: $text-02;
  display: flex;
}

.bx--article-card__info p {
  @include carbon--type-style("caption-01");
}

.bx--article-card__img .gatsby-resp-image-wrapper {
  margin-bottom: 0;
}

.bx--article-card__icon--action {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 20px;
  height: 20px;
}

.bx--article-card__icon--action svg {
  fill: $icon-01;
}

// Dark
.bx--article-card--dark .bx--tile {
  background: $carbon--gray-90; //$ui-background for gray 90 theme
}

.bx--article-card--dark:hover .bx--tile {
  background: $carbon--gray-80; //$hover-ui for gray 90 theme
}

.bx--article-card--dark .bx--article-card__title,
.bx--article-card--dark .bx--article-card__subtitle {
  color: $text-04;
}

.bx--article-card--dark .bx--article-card__info {
  color: $carbon--gray-30; //$text-02 for gray 90 theme
}

.bx--article-card--dark .bx--article-card__icon--action svg {
  fill: $carbon--gray-10; //$icon-01 for grsay 90 theme
}

// Disabled
.bx--article-card--disabled {
  cursor: not-allowed;
}

.bx--article-card--disabled .bx--tile:hover {
  background: $ui-background;
  cursor: not-allowed;
}

.bx--article-card--disabled .bx--article-card__title,
.bx--article-card--disabled .bx--article-card__subtitle,
.bx--article-card--disabled .bx--article-card__info {
  color: $disabled-03;
}

.bx--article-card--disabled .bx--article-card__icon--action svg {
  fill: $disabled-02;
}

// Disabled dark
.bx--article-card--disabled.bx--article-card--dark .bx--tile:hover {
  background: $carbon--gray-90; //$ui-background for gray 90 theme
}

.bx--article-card--disabled.bx--article-card--dark .bx--article-card__title,
.bx--article-card--disabled.bx--article-card--dark .bx--article-card__subtitle,
.bx--article-card--disabled.bx--article-card--dark .bx--article-card__info {
  color: $carbon--gray-50; //$disabled-03 for gray 90
}

.bx--article-card--disabled.bx--article-card--dark
  .bx--article-card__icon--action
  svg {
  fill: $carbon--gray-70; //$disabled-02 for gray 90
}
</style>
