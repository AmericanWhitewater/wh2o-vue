<template>
  <!-- <div class="news-page bg-topo">
    <layout name="layout-full-width">
      <template #main>
        <template v-if="loading">
          <utility-block state="loading" />
        </template>
        <template v-else-if="articles && featured">
          <div class="bx--row mb-md">
            <div class="bx--col">
              <hr>
              <h1 class="mb-spacing-sm">
                News
              </h1>
              <feature-card
                :img="
                  `${baseUrl}resources/images/contents/${featured.contentsphoto}`
                "
                :to="`/article/${featured.id}`"
                :title="featured.title"
                subtitle="Latest"
              />
            </div>
          </div>
          <div class="bx--row">
            <div
              v-for="(article, index) in articles"
              :key="index"
              class="bx--col-md-4 bx--col-lg-8 bx--col-max-4 mb-spacing-lg"
            >
              <ArticleCard
                :title="$titleCase(article.title)"
                :article-id="article.id"
                :author="article.author"
                :read-time="estReadingTime(article.contents)"
              />
            </div>
          </div>
        </template>
      </template>
    </layout>
  </div> -->
  <cv-grid class="news-page mb-xl">
    <cv-row>
      <cv-column>
        <header class="bx--tile pt-spacing-md">
          <div class="">
            <h1 class="mb-spacing-md">News</h1>
            <cv-breadcrumb no-trailing-slash>
              <cv-breadcrumb-item>
                <cv-link to="/"> Home </cv-link>
              </cv-breadcrumb-item>
              <cv-breadcrumb-item>
                <cv-link href="#0">News</cv-link>
              </cv-breadcrumb-item>
            </cv-breadcrumb>
          </div>
        </header>
      </cv-column>
    </cv-row>
    <cv-row>
      <template v-if="loading">
        <utility-block :state="loading" />
      </template>
      <template v-else-if="articles">
        <cv-column :sm="12" :md="12" :lg="8" :max="8">
          <feature-card
            img="https://www.americanwhitewater.org/photos/archive/889575.jpg"
            :to="`/article/${articles[0].id}`"
            :title="articles[0].title"
            subtitle="Latest"
          />
        </cv-column>
        <cv-column class="pt-md">
          <cv-row>
            <cv-column
              v-for="(item, index) in articles.slice(1, articles.length)"
              :key="index"
              :sm="12"
              :md="6"
              :lg="8"
              :max="8"
              class="mb-spacing-md"
            >
              <article-card
                :articleId="item.id"
                :title="item.title"
                :author="item.author"
                :datePosted="formatDate(item.posted_date)"
              />
            </cv-column>
          </cv-row>
        </cv-column>
      </template>
      <template v-else>
        <utility-block state="error" />
      </template>
    </cv-row>
  </cv-grid>
</template>
<script>
import { mapState } from "vuex";
import {
  ArticleCard,
  FeatureCard,
  UtilityBlock,
} from "@/app/global/components";
import { baseUrl } from "../../environment";

export default {
  name: "news-page",
  components: {
    ArticleCard,
    FeatureCard,
    UtilityBlock,
  },
  data: () => ({
    articleSearchTerm: null,
    baseUrl: baseUrl,
  }),
  metaInfo() {
    return {
      title: "News - American Whitewater",
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.NewsPage.loading,
      articles: (state) => state.NewsPage.data,
    }),
  },
  methods: {
    cleanCopy(copy) {
      return this.$sanitize(copy, {
        disallowedTags: ["strong", "em", "b", "bold"],
        disallowedAttributes: {
          "*": ["style", "class"],
        },
      });
    },
    searchArticles() {
      this.$store.dispatch("NewsPage/searchArticles", this.articleSearchTerm);
    },
  },
  created() {
    if (!this.articles) {
      this.$store.dispatch("NewsPage/getProperty");
    }
  },
};
</script>
<style lang="scss">
.news-page {
  .sidebar {
    background-color: $ui-01;
    @include layer("raised");
    padding: $spacing-md;
  }
}
</style>
