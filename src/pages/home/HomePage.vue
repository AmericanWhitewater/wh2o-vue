<template>
  <div class="home-page">
    <div class="hero-banner" />
    <v-row v-if="loading">
      <v-col cols="12" sm="4" md="3" v-for="(col, index) in 8" :key="index">
        <v-skeleton-loader type="image, article" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(article, i) in articles"
        :key="i"
      >
        <v-card>
          <v-img height="250" :src="article.abstractphoto" />
          <v-card-subtitle class="pb-0">
            {{ article.posted }}
          </v-card-subtitle>
          <v-card-title class="pt-0">
            {{ article.title }}
          </v-card-title>
          <v-card-text>
            {{ article.abstract.slice(0, 100) }}
          </v-card-text>
          <v-card-actions class="pb-2 pl-2">
            <v-btn color="primary"> Read More </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "HomePage",
  computed: {
    ...mapState({
      loading: (state) => state.FrontNews.loading,
      articles: (state) => state.FrontNews.data,
      error: (state) => state.FrontNews.error,
    }),
  },
  methods: {
    ...mapActions({
      loadArticles: "FrontNews/getProperty",
    }),
  },
  created() {
    if (!this.articles) {
      this.loadArticles({
        url: "/front-page-news",
      });
    }
  },
};
</script>
<style lang="scss">
.home-page {
  position: relative;
  width: 100%;
}
.hero-banner {
  height: 50vh;
  background-color: map-get($blue-grey, "lighten-2");
}
</style>