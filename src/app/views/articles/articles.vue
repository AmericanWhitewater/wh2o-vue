<template>
  <div class="trip-reports mb-xl">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <header class="bx--tile pt-spacing-md">
            <div class="">
              <h1 class="mb-spacing-md">Articles</h1>
              <cv-breadcrumb no-trailing-slash>
                <cv-breadcrumb-item>
                  <cv-link to="/"> Home </cv-link>
                </cv-breadcrumb-item>
                <cv-breadcrumb-item>
                  <cv-link href="#0">Articles</cv-link>
                </cv-breadcrumb-item>
              </cv-breadcrumb>
            </div>
            <div v-if="user">
              <cv-button
                size="small"
                @click.exact="$router.push('/article-creator')"
                @keydown.enter="$router.push('/article-creator')"
              >
                New Article
              </cv-button>
            </div>
          </header>
          <utility-block
            img="https://www.americanwhitewater.org/photos/archive/889575.jpg"
            hide-text
            state="content"
            theme="dark"
          />
          <page-description
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </div>
      </div>
      <div class="bx--row">
        <template v-if="loading">  
          <div class="bx--col">
            <utility-block state="loading" />
          </div>
        </template>
        <template v-else-if="data">
          <div v-for="(item, index) in data" :key="index" class="bx--col-sm-6 bx--col-md-4 bx--col-lg-6 bx--col-max-4 mb-sm">
            <article-card
              :author="item.author"
              :title="item.title"
              :date-posted="formatDate(item.posted_date, 'LL')"
              :abstract="item.abstract"
              :articleId="item.id"
            />
          </div>
        </template>
        <template v-else> 
          <utility-block state="error" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { ArticleCard, UtilityBlock, PageDescription } from "@/app/global/components";
export default {
  name: "articles",
  components: {
    ArticleCard,
    UtilityBlock,
    PageDescription
  },
  computed: {
    ...mapState({
      user: (state) => state.User.data,
      data: (state) => state.Articles.data,
      loading: (state) => state.Articles.loading,
    }),
  },
  created() {
    if (!this.data) {
      this.$store.dispatch("Articles/getProperty");
    }
  },
};
</script>