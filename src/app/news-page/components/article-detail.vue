<template>
  <div class="article-detail">
    <transition name="fade">
      <template v-if="loading">
        <cv-loading active small overlay />
      </template>
    </transition>
    <template v-if="!loading">
      <div class="bx--grid">
        <div class="bx--row breadcrumb-container">
          <div class="bx--col">
            <div class="outside">
              <div class="inside">
                <cv-breadcrumb aria-label="breadcrumb" no-trailing-slash>
                  <cv-breadcrumb-item>
                    <cv-link to="/news">
                      News
                    </cv-link>
                  </cv-breadcrumb-item>
                  <cv-breadcrumb-item>
                    <cv-link href="#" aria-current="page">
                      Article Id: {{ this.$route.params.id }}
                    </cv-link>
                  </cv-breadcrumb-item>
                </cv-breadcrumb>
              </div>
            </div>
          </div>
        </div>
        <page-header :title="article.title" :subtitle="article.posted" />
        <div class="spacer" />
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-md-2 bx--col-lg-1">
            <div class="share-article">
              <h5>Share</h5>
              <span @click="shareArticle('facebook')">
                <facebook-logo />
              </span>
              <span @click="shareArticle('linkedin')">
                <linkedin-logo />
              </span>
              <span @click="shareArticle('google')">
                <google-logo />
              </span>
              <span @click="shareArticle('email')">
                <email-icon />
              </span>
            </div>
          </div>
          <div class="bx--col-md-2 bx--col-lg-8 pt-md  mb-lg">
            <div v-html="article.contents" />
          </div>
          <!-- <div class="bx--col-sm-4 bx--col-md-2 bx--col-lg-2"> -->
          <div class="bx--col-sm-12 bx--col-md-12 bx--col-lg-12">
            <hr />
            <h2>Related News</h2>
            <!-- need to split up store for related articles  -->
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import virtual_LogoFacebook24 from "@carbon/icons-vue/es/logo--facebook/24";
import virtual_LogoLinkedIn24 from "@carbon/icons-vue/es/logo--linkedin/24";
import virtual_LogoGoogle24 from "@carbon/icons-vue/es/logo--google/24";
import virtual_Email24 from "@carbon/icons-vue/es/email/24";
import { PageHeader } from "../../global/components";
import { newsActions } from "../shared/state";
import {mapState,mapActions} from 'vuex';
export default {
  name: "article-detail",
  components: {
    PageHeader,
    "facebook-logo": virtual_LogoFacebook24,
    "linkedin-logo": virtual_LogoLinkedIn24,
    "google-logo": virtual_LogoGoogle24,
    "email-icon": virtual_Email24
  },
  computed: {
    ...mapState({
      article: state => state.newsPageState.newsPageData.data,
      loading: state => state.newsPageState.newsPageData.loading
    }),
    articleId() {
      return this.$route.params.id;
    }
  },
  created() {
    this.$store.dispatch(newsActions.GET_ARTICAL_DETAIL_DATA, this.articleId);
  },
  methods: {
    shareArticle(platform) {
      alert(`share article on ${platform}`);
    }
  }
};
</script>
<style lang="scss">
.article-detail {
  .spacer {
    margin-bottom: $layout-sm;
  }
  .breadcrumb-container {
    padding: $spacing-sm 0;
  }
  .share-article {
    display: flex;
    flex-flow: column nowrap;
    h5,
    span {
      margin-bottom: $spacing-sm;
    }
    span {
      cursor: pointer;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
