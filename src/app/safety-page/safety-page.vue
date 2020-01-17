<template>
  <div class="safety">
    <div class="bx--grid">
      <page-header title="Safety" />
      <div class="spacer" />
      <div class="bx--row pt-lg mb-spacing-md">
        <div class="bx--col-sm-12 bx--col-md-4 bx--col-lg-6">
          <hr />
          <h2 class="mb-spacing-md">Related News</h2>
          <p class="mb-spacing-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <div class="bx--row mb-lg">
        <template v-if="loading && !error">
          <loading-block />
        </template>
        <template v-if="!loading && error">
          <error-block :text="error" />
        </template>
        <template v-if="!loading && !error">
          <div
            v-for="(article, index) in articles.slice(0, 4)"
            :key="index"
            class="bx--col-sm-12 bx--col-md-6 bx--col-lg-3"
          >
            <article-card
              :thumbnail-id="article.abstractphoto"
              :date-posted="article.posted"
              :title="article.title"
              :abstract="article.abstract"
              :article-id="article.articleid"
            />
          </div>
        </template>
      </div>
      <div class="bx--row">
        <div class="bx--col-sm-12 bx--col-md-6 bx--col-lg-8">
          <loading-block />
        </div>
        <div class="bx--col-sm-12 bx--col-md-6 bx--col-lg-8 safety-resources">
          <hr />
          <h2 class="mb-spacing-md">Safety Resources</h2>
          <p class="mb-spacing-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea
          </p>
          <ul>
            <li>
              <div class="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <g fill="#4b6946">
                    <path
                      fill="#4b6946"
                      d="M8,21V3c0-0.553-0.448-1-1-1H1C0.448,2,0,2.447,0,3v18H8z M3,7h2v6H3V7z"
                    />
                    <path
                      data-color="color-2"
                      d="M0,23v6c0,0.553,0.448,1,1,1h6c0.552,0,1-0.447,1-1v-6H0z"
                    />
                    <path
                      fill="#4b6946"
                      d="M18,21V3c0-0.553-0.448-1-1-1h-6c-0.552,0-1,0.447-1,1v18H18z M13,7h2v6h-2V7z"
                    />
                    <path
                      data-color="color-2"
                      d="M10,23v6c0,0.553,0.448,1,1,1h6c0.552,0,1-0.447,1-1v-6H10z"
                    />
                    <path
                      data-color="color-2"
                      d="M30.808,22.055l-7.917,1.152l0.864,5.937c0.039,0.263,0.179,0.499,0.392,0.658 C24.32,29.932,24.53,30,24.745,30c0.048,0,0.096-0.004,0.144-0.011l5.938-0.864c0.546-0.079,0.925-0.587,0.846-1.133L30.808,22.055z "
                    />
                    <path
                      fill="#4b6946"
                      d="M30.52,20.075L27.927,2.264c-0.039-0.263-0.179-0.499-0.392-0.658c-0.212-0.158-0.479-0.223-0.742-0.188 l-5.938,0.864c-0.546,0.079-0.925,0.587-0.846,1.133l2.592,17.812L30.52,20.075z M25.535,6.653l0.864,5.938l-1.979,0.288 l-0.864-5.938L25.535,6.653z"
                    />
                  </g>
                </svg>
              </div>
              <div class>
                <h6>For new paddlers</h6>
                <p>
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna
                </p>
              </div>
            </li>
            <li>
              <div class="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <g fill="#4b6946">
                    <path
                      fill="#4b6946"
                      d="M31,12h-0.548C29.053,6.933,25.067,2.947,20,1.547V1c0-0.552-0.447-1-1-1h-6c-0.553,0-1,0.448-1,1v0.547 C6.933,2.947,2.947,6.933,1.548,12H1c-0.553,0-1,0.448-1,1v6c0,0.552,0.447,1,1,1h0.548C2.947,25.067,6.933,29.053,12,30.453V31 c0,0.552,0.447,1,1,1h6c0.553,0,1-0.448,1-1v-0.547c5.067-1.4,9.053-5.386,10.452-10.453H31c0.553,0,1-0.448,1-1v-6 C32,12.448,31.553,12,31,12z M16,22c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S19.309,22,16,22z M28.366,12h-5.448 C22.216,10.791,21.209,9.784,20,9.082V3.635C23.961,4.915,27.086,8.039,28.366,12z M12,3.635v5.448 C10.791,9.784,9.784,10.791,9.082,12H3.634C4.914,8.039,8.039,4.915,12,3.635z M3.634,20h5.448c0.702,1.209,1.709,2.216,2.918,2.918 v5.448C8.039,27.085,4.914,23.961,3.634,20z M20,28.365v-5.448c1.209-0.702,2.216-1.709,2.918-2.918h5.448 C27.086,23.961,23.961,27.085,20,28.365z"
                    />
                  </g>
                </svg>
              </div>
              <div class>
                <h6>Rescue and Risk Management</h6>
                <p>
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna
                </p>
              </div>
            </li>
            <li>
              <div class="icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <g fill="#4b6946">
                    <path
                      fill="#4b6946"
                      d="M16,0C9.3,0,2,1.6,2,5s7.3,5,14,5s14-1.6,14-5S22.7,0,16,0z"
                    />
                    <path
                      data-color="color-2"
                      d="M16,12c-5.4,0-11.1-0.9-14-3.2V16c0,3.4,7.3,5,14,5s14-1.6,14-5V8.8C27.1,11.1,21.4,12,16,12 z"
                    />
                    <path
                      fill="#4b6946"
                      d="M16,23c-5.4,0-11.1-0.9-14-3.2V27c0,3.4,7.3,5,14,5s14-1.6,14-5v-7.2C27.1,22.1,21.4,23,16,23z"
                    />
                  </g>
                </svg>
              </div>
              <div class>
                <h6 @click="$router.push('/accident-database')">
                  Accident Database
                </h6>
                <p>
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  PageHeader,
  ErrorBlock,
  LoadingBlock,
  ArticleCard
} from "@/app/global/components";
import { safetyPageActions } from "./shared/state";
import { mapState } from "vuex";

export default {
  name: "SafetyPage",
  components: {
    PageHeader,
    ErrorBlock,
    LoadingBlock,
    ArticleCard
  },
  metaInfo() {
    return {
      title: "Safety - American Whitewater"
    };
  },
  computed: {
    ...mapState({
      articles: state => state.safetyPageState.safetyPageData.data,
      loading: state => state.safetyPageState.safetyPageData.loading,
      error: state => state.safetyPageState.safetyPageData.error
    })
  },
  created() {
    if (!this.error && !this.articles) {
      this.$store.dispatch(safetyPageActions.FETCH_LANDING_ARTICLES);
    }
  }
};
</script>
<style lang="scss">
.safety-resources {
  ul {
    li {
      display: flex;
      margin-bottom: $spacing-md;
      .icon-wrapper {
        margin-right: $spacing-sm;
      }
      h6 {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
