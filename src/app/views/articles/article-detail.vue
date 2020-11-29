<template>
  <div class="trip-reports mb-xl">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <header v-if="loading && !data" class="bx--tile">
            <div>
              <cv-skeleton-text heading />
              <cv-breadcrumb-skeleton no-trailing-slash />
            </div>
          </header>
          <header v-else-if="data" class="bx--tile pt-spacing-md">
            <div class="">
              <h1 class="mb-spacing-md">{{ data.title }}</h1>
              <cv-breadcrumb no-trailing-slash>
                <cv-breadcrumb-item>
                  <cv-link to="/articles"> Articles </cv-link>
                </cv-breadcrumb-item>
                <cv-breadcrumb-item>
                  <cv-link href="#0">Article {{ data.id }} </cv-link>
                </cv-breadcrumb-item>
              </cv-breadcrumb>
            </div>
            <div v-if="data.uid === user.uid">
              <cv-button size="small" kind="secondary"> Edit </cv-button>
              <cv-button
                kind="danger"
                size="small"
                @click.exact="handleDelete"
                @keydown.enter="handleDelete"
              >
                Delete
              </cv-button>
            </div>
          </header>

          <utility-block
            :img="articleImage"
            hide-text
            state="content"
            theme="dark"
          />
        </div>
      </div>
      <div class="bx--row mt-lg mb-xl">
        <template v-if="loading">
          <div class="bx--col">
            <utility-block state="loading" />
          </div>
        </template>
        <template v-else-if="data">
          <div class="bx--col bx--col-md-10 bx--col-lg-11">
            <div v-html="data.contents" />
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
import { UtilityBlock } from "@/app/global/components";
import { deleteArticle } from "@/app/services";
export default {
  name: "article-detail",
  components: {
    UtilityBlock,
  },
  metaInfo() {
    return {
      title: this.data ? this.data.title || "" : "Article Detail",
      titleTemplate: "%s - American Whitewater",
      meta: [
        {
          name: "description",
          content: this.articleMetaDescription,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.ArticleDetail.data,
      loading: (state) => state.ArticleDetail.loading,
      refId: (state) => state.ArticleDetail.refId,
      user: (state) => state.User.data,
    }),
    articleId() {
      return this.$route.params.id;
    },
    articleImage() {
      if (this.data) {
        const asset =
          this.data.image.uri.big ||
          this.data.image.uri.medium ||
          this.data.image.uri.thumb;

        return "https://americanwhitewater.org" + asset;
      }

      return "";
    },
    articleMetaDescription() {
      if (this.data) {
        return (
          this.$sanitize(this.data.abstract.slice(0, 150), {
            allowedTags: [],
          }).trim() + "..."
        );
      }

      return "";
    },
  },
  methods: {
    async handleDelete() {
      try {
        const result = await deleteArticle(this.$route.params.id);
        if (!result.errors) {
          this.$store.dispatch("Articles/getProperty");
          this.$store.dispatch("Global/sendToast", {
            kind: "success",
            title: "Article Deleted",
          });
          this.$router.push("/articles");
        } else {
          this.$store.dispatch("Global/sendToast", {
            kind: "error",
            title: "Error",
            subtitle: "Failed to delete article.",
          });
        }
      } catch (error) {
        this.$store.dispatch("Global/sendToast", {
          kind: "error",
          title: "Error",
          subtitle: error,
        });
      }
    },
  },
  created() {
    if (!this.data || this.articleId !== this.refId) {
      this.$store.dispatch("ArticleDetail/setRefId", this.articleId);
      this.$store.dispatch("ArticleDetail/getProperty", this.articleId);
    }
  },
};
</script>