<template>
  <div class="news-page bx--grid">
    <page-header title="News" />
    <div class="spacer" />
    <div class="bx--row">
      <template v-if="!loading">
        <div
          v-for="(article, index) in articleTiles"
          :key="index"
          class="bx--col-sm-4 bx--col-md-6 bx--col-lg-4 mb-spacing-md"
        >
          <cv-tile class="news-tile">
            <img :src="'/content/Photo/detail/photoid/' + article.uid" />
            <div class="content-area">
              <h6 class="mb-spacing-xs" v-text="article.posted" />
              <h4 class="mb-spacing-sm" v-text="article.title" />
              <p
                class="mb-spacing-md"
                v-html="article.abstract.slice(0, 150) + '...'"
              />
              <cv-button
                small
                @click="readArticle(article.articleid)"
                v-text="'Read More'"
              />
            </div>
          </cv-tile>
        </div>
      </template>
      <template v-else>
        loading
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { PageHeader } from "@/app/global/components";
import { newsActions } from "./shared/state";

export default {
  name: "news-page",
  components: {
    PageHeader
  },
  metaInfo() {
    return {
      title: "News - American Whitewater"
    };
  },
  computed: {
    ...mapState({
      loading: state => state.newsPageState.newsPageData.loading,
      articles: state => state.newsPageState.newsPageData.data
      // articles: state => state.newsPageState.newsPageData.data.articles
    }),
    latest() {
      return this.articles.CArticleGadgetJSON_view;
    }
    // articleTiles() {
    //   return this.articles.articles.CArticleGadgetJSON_view_list.slice(0, 12);
    // }
  },
  created() {
    this.getArticles();
  },
  methods: {
    readArticle(id) {
      this.$router.push(`/article/${id}`);
    },
    getArticles() {
      // uncomment once store is split up
      // if (!this.$store.state.newsPageState.newsPageData.data) {
      this.$store.dispatch(newsActions.GET_FRONT_PAGE_ARTICLES);
      // }
    }
  }
};
</script>
<style lang="scss">
.news-page {
  padding-bottom: $layout-lg;
  .spacer {
    margin-bottom: $layout-sm;
  }
  .news-tile {
    padding: 0;
    @include ease;
    &:hover {
      @include layer("raised");
    }
    img {
      height: 150px;
      width: 100%;
      object-fit: cover;
    }
    .content-area {
      padding: $spacing-sm;
      p {
        margin-bottom: $spacing-sm;
      }
    }
  }
}
</style>
