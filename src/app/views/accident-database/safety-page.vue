<template>
  <cv-grid class="safety-page mb-xl">
    <cv-row>
      <cv-column>
        <header class="bx--tile pt-spacing-md">
          <div class="">
            <h1 class="mb-spacing-md">Safety</h1>
            <cv-breadcrumb no-trailing-slash>
              <cv-breadcrumb-item>
                <cv-link to="/"> Home </cv-link>
              </cv-breadcrumb-item>
              <cv-breadcrumb-item>
                <cv-link href="#0">Safety</cv-link>
              </cv-breadcrumb-item>
            </cv-breadcrumb>
          </div>
        </header>
        <utility-block
          img="https://www.americanwhitewater.org/images/safety_page_banner.jpg"
          state="content"
        />
      </cv-column>
    </cv-row>
    <cv-row class="mt-md mb-md">
      <cv-column :sm="11" :md="10" :lg="12">
        <p class="mb-spacing-lg">
          Safety has been a core issue for AW since 1954, and today we are
          leaders in accident analysis and safety education. Formal risk
          management is part of all our programs. We work hard to publicize safe
          practices that help every American enjoy our rivers safely, and we
          advise legislative bodies and river managers on the best ways to
          educate whitewater paddlers. If you look back through the pages of the
          <router-link
            to="/legacy-viewer?url=https://www.americanwhitewater.org/content/Journal/show-page/issue/2/page/5/year/1955/"
            >August 1955</router-link
          >
          and
          <router-link
            to="/legacy-viewer?url=https://www.americanwhitewater.org/content/Journal/show-page/issue/1/page/28/year/1957/"
            >Winter 1957</router-link
          >
          American Whitewater Journal, you’ll see the International Scale of
          River Difficulty, the codification of a class I-IV whitewater
          classification system, was developed internationally and adopted and
          promoted by American Whitewater. Outdoor recreation and whitewater
          paddling specifically have inherent risks, however many whitewater
          accidents, especially for less experienced boaters, are preventable
          with some
          <strong>
            <router-link
              to="/legacy-viewer?url=https://www.americanwhitewater.org/content/Wiki/safety:start?"
              >very basic whitewater safety knowledge</router-link
            ></strong
          >.
        </p>
        <cv-list>
          <cv-list-item>
            Always Wear Your PFD (personal flotation device, commonly known as a
            life jacket)
          </cv-list-item>
          <cv-list-item>
            Research the River You Plan to Paddle: Whitewater Difficulty,
            Optimal Flow Levels, Current Hazards, Predicted Weather, Remoteness
          </cv-list-item>
          <cv-list-item> Avoid Extreme Weather and High Flows </cv-list-item>
          <cv-list-item> Avoid Dams </cv-list-item>
          <cv-list-item> Avoid Drugs and Alcohol </cv-list-item>
        </cv-list>
      </cv-column>
    </cv-row>
    <cv-row>
      <cv-column :sm="12" :md="6" :lg="8" class="mb-md">
        <image-slider
          :images="[
            'https://beta.americanwhitewater.org/images/safety_illustrations/AW1.png',
            'https://beta.americanwhitewater.org/images/safety_illustrations/AW2.png',
            'https://beta.americanwhitewater.org/images/safety_illustrations/AW3.png',
            'https://beta.americanwhitewater.org/images/safety_illustrations/AW4.png',
          ]"
        />
      </cv-column>
      <cv-column :sm="12" :md="6" :lg="8">
        <hr >
        <h2 class="mb-sm">Safety Resources</h2>
        <ul class="safety-resources-list">
          <li>
            <img :src="require('@/app/assets/icons/resources.svg')" alt="" >
            <router-link
              to="/legacy-viewer?url=https://www.americanwhitewater.org/content/Wiki/safety:start?"
            >
              AW Safety Code
            </router-link>
          </li>
          <li>
            <img :src="require('@/app/assets/icons/scale.svg')" alt="" >
            <router-link
              to="/legacy-viewer?url=https://www.americanwhitewater.org/content/Wiki/safety:start?#vi._international_scale_of_river_difficulty"
            >
              International Save of River Difficulty
            </router-link>
          </li>
          <li>
            <img :src="require('@/app/assets/icons/safety.svg')" alt="" >
            <router-link
              to="/legacy-viewer?url=https://www.americanwhitewater.org/content/Safety/rescueandrisk"
            >
              Rescue and Rick Management
            </router-link>
          </li>
          <li>
            <img :src="require('@/app/assets/icons/database.svg')" alt="" >
            <router-link to="/accident-database">
              Accident Database
            </router-link>
          </li>
        </ul>
      </cv-column>
    </cv-row>
    <cv-row class="mt-md">
      <cv-column :sm="12" :md="12" :lg="16">
        <hr >
        <h2 class="mb-sm">Safety News</h2>
      </cv-column>
      <template v-if="loading">
        <utility-block state="loading" />
      </template>
      <template v-else-if="safetyArticles">
        <cv-column
          v-for="(item, index) in safetyArticles"
          :key="index"
          :sm="12"
          :md="4"
          :lg="6"
          :max="4"
          class="mb-spacing-md"
        >
          <article-card
            :articleId="item.id"
            :title="item.title"
            :author="item.author"
            :datePosted="formatDate(item.posted_date)"
          />
        </cv-column>
      </template>
      <template v-else>
        <utility-block state="error" />
      </template>
    </cv-row>
    <cv-row>
      <cv-column>
        <cv-button
          @click.exact="$router.push('/news')"
          @keydown.enter="$router.push('/news')"
        >
          See More News
        </cv-button>
      </cv-column>
    </cv-row>
  </cv-grid>
</template>
<script>
import {
  ImageSlider,
  UtilityBlock,
  ArticleCard,
} from "@/app/global/components";
import http from "@/app/http";
export default {
  name: "safety-page",
  components: {
    UtilityBlock,
    ImageSlider,
    ArticleCard,
  },
  data: () => ({
    safetyArticles: null,
    loading: false,
  }),
  methods: {
    async loadSafetyArticles() {
      try {
        this.loading = true;
        this.safetyArticles = await http
          .get("/content/News/all/type/frontpagenews/subtype//page/0/.json")
          .then((res) => res.data.articles.CArticleGadgetJSON_view_list);
      } catch (error) {
        // console.log("error :>> ", error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.loadSafetyArticles();
  },
};
</script>
<style lang="scss" scoped>
ul.safety-resources-list {
  li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    a {
      color: $text-01;
      font-size: 1.25rem;
      margin-left: 1rem;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>