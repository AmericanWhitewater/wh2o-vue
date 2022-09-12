<template>
  <div>
    <div
      class="bx--article-card bx--tile bx--tile--clickable"
      @click.exact="readArticle"
      @keydown.enter="readArticle"
    >
      <div class="bx--article-card__tile">
        <h4
          v-if="article.title"
          class="bx--article-card__title"
          v-text="article.title"
        />
        <div class="article-card-body">
          <div class="article-card-thumb">
            <img
              class="article-thumb"
              :src="articleThumb(article)"
              :alt="article.title"
            >
          </div>
          <div class="article-card-abstract">
            <span v-html="article.abstract" />
          </div>
        </div>
        <div class="article-card-footer">
          <div class="bx--article-card__info">
            <div>
              <p
                v-if="article.author"
                class="bx--article-card__author"
                v-text="article.author"
              />
              <p
                v-if="article.posted_date"
                class="bx--article-card__date"
                v-text="formatDate(article.posted_date)"
              />
              <p
                class="bx--article-card__read-time"
                v-text="estReadingTime(article.contents)"
              />
            </div>
          </div>
          <div class="bx--article-card__icon--action">
            <component :is="actionIcon" aria-label="Open" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { articleHelper, checkWindow } from "@/app/global/mixins";
export default {
  name: "article-card",
  mixins: [articleHelper, checkWindow],
  props: {
    article: {
      type: Object,
      required: true,
    },
    actionIcon: {
      type: String,
      required: false,
      default: "ArrowRight20",
      validator: (val) =>
        [
          "Launch20",
          "ArrowRight20",
          "Download20",
          "Email20",
          "Error20",
        ].indexOf(val) > -1,
    },
  },
  methods: {
    readArticle() {
      this.goToLink(this.articleUrl(this.article));
    },
  },
};
</script>
<style lang="scss" scoped>
.bx--article-card .bx--tile {
  background: $ui-background;
  height: 100%;
  margin-bottom: $spacing-05;
  padding: 0;
  position: relative;
  text-decoration: none;
  transition: background $duration--fast-01;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.bx--article-card:hover .bx--tile {
  background: $hover-ui;
}

.bx--article-card__tile {
  padding: $spacing-05;
  z-index: 1;
}

.bx--article-card__title {
  @include carbon--type-style("productive-heading-03");
  color: $text-01;
  text-decoration: none;
}

.article-card-thumb {
  padding: 0.5rem 1rem 0 0;
  float: left;
  max-width: 140px;
  object-fit: cover;
  width: 100%;
  margin-bottom: 0;
}

.article-card-footer {
  padding-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  .bx--article-card__info {
    p {
      @include carbon--type-style("caption-01");
      margin: 0;
    }
    color: $text-02;
    display: flex;
    padding: 0;
  }

  .bx--article-card__icon--action {
    height: 20px;
    width: 20px;
  }
}

.bx--article-card__icon--action svg {
  fill: $icon-01;
}
</style>