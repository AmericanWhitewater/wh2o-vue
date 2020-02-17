<template>
  <cv-tile class="article-card">
    <img :src="'/content/Photo/detail/photoid/' + thumbnailId">
    <div class="content-area">
      <h6
        class="mb-spacing-xs"
        v-text="datePosted"
      />
      <h4
        class="mb-spacing-sm"
        v-text="title"
      />
      <p
        class="mb-spacing-md"
        v-html="abstract.slice(0, 150) + '...'"
      />
      <cv-button
        small
        @click="readArticle(articleId)"
        v-text="'Read More'"
      />
    </div>
  </cv-tile>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    thumbnailId: {
      type: String,
      required: true
    },
    datePosted: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    abstract: {
      type: String,
      required: true
    },
    articleId: {
      type: String,
      required: true
    }
  },
  methods: {
    readArticle (id) {
      //   this.$router.push(`/article/${id}`);
      alert(`push to article: ${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-card {
  padding: 0;
  @include ease;
  &:hover {
    @include layer("raised");
  }
  img {
    height: 150px;
    width: 100%;
    object-fit: cover;
    background-color: $ui-02;
    border: 0;
  }
  .content-area {
    padding: $spacing-sm;
    p {
      margin-bottom: $spacing-sm;
    }
  }
}
</style>
