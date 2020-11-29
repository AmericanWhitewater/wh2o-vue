<template>
  <div class="accident-database mb-xl">
    <div ref="grid" class="bx--grid">
      <cv-row class="bx--row">
        <cv-column class="bx--col">
          <header class="bx--tile pt-spacing-md">
            <div class="">
              <h1 class="mb-spacing-md">Accident Database</h1>
              <cv-breadcrumb no-trailing-slash>
                <cv-breadcrumb-item>
                  <cv-link to="/"> Home </cv-link>
                </cv-breadcrumb-item>
                <cv-breadcrumb-item>
                  <cv-link href="#0"> Trip Reports </cv-link>
                </cv-breadcrumb-item>
              </cv-breadcrumb>
            </div>
            <div v-if="user">
              <cv-button
                size="small"
                kind="secondary"
                @click.exact="reportModalVisible = true"
                @keydown.enter="reportModalVisible = true"
              >
                Export Database
              </cv-button>
              <cv-button
                size="small"
                @click.exact="reportModalVisible = true"
                @keydown.enter="reportModalVisible = true"
              >
                Submit Report
              </cv-button>
            </div>
          </header>
          <utility-block
            img="https://www.americanwhitewater.org/photos/archive/19278.jpg"
            hide-text
            state="content"
            theme="dark"
          />
        </cv-column>
      </cv-row>
      <cv-row>
        <cv-column :sm="12" :md="8" :lg="12">
          <p class="mt-md mb-md">
            The American Whitewater Accident Database catalogs over 1600
            fatalities and close calls on whitewater rivers dating back to 1972.
            The project was initiated over 40 years ago, in 1975 when a fatality
            occurred due to foot entrapment at a slalom race. Charlie Walbridge
            was present for the race and described the risks of foot entrapment
            for the first time in a 1976 issue of the American Whitewater
            journal. Charlie continued to collect reports and share lessons
            through the American Whitewater Journal. In 2001 American Whitewater
            Safety Chair Tim Kelly led an effort to develop the American
            Whitewater Safety Database and in 2017 the database was further
            refined with enhanced search functionality through a website
            interface. There are three good reasons for writing (or sending in)
            a whitewater accident report: it provides an opportunity to get the
            real story out, serves as a learning opportunity that can educate
            the paddling community, and it facilitates dialogue with river
            managers and decision makers. American Whitewater depends on its
            members to forward the reports and information on accidents on the
            water. First-hand accounts are best, but information from a
            newspaper article or social media post often provides the initial
            information that ultimately leads to more in-depth review and follow
            up.
          </p>
        </cv-column>
      </cv-row>
      <cv-row>
        <cv-column>
          <div
            id="viz1596161722347"
            ref="divElement"
            class="tableauPlaceholder"
            style="position: relative"
          >
            <object ref="object" class="tableauViz" style="display: none">
              <param
                name="host_url"
                value="https%3A%2F%2Fpublic.tableau.com <https://2fpublic.tableau.com/>%2F"
              >
              <param name="embed_code_version" value="3" >
              <param name="site_root" value="" >
              <param
                name="name"
                value="WhitewaterAccidentandFatalitySankeyVisualization&#47;WhitewaterAccidentFatalitySankey"
              >
              <param name="tabs" value="no" >
              <param name="toolbar" value="yes" >
              <param
                name="static_image"
                value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Wh&#47;WhitewaterAccidentandFatalitySankeyVisualization&#47;WhitewaterAccidentFatalitySankey&#47;1.png"
              >
              <param name="animate_transition" value="yes" >
              <param name="display_static_image" value="yes" >
              <param name="display_spinner" value="yes" >
              <param name="display_overlay" value="yes" >
              <param name="display_count" value="yes" >
              <param name="language" value="en" >
              <param name="filter" value="publish=yes" >
            </object>
          </div>
        </cv-column>
      </cv-row>
      <cv-row class="mt-md">
        <cv-column>
          <hr>
          <h2>Advanced Search</h2>
        </cv-column>
      </cv-row>
    </div>
    <cv-modal
      :visible="reportModalVisible"
      @modal-hidden="reportModalVisible = false"
    >
      <template #title> New Accident Report </template>
      <template #content> content </template>
    </cv-modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { UtilityBlock } from "@/app/global/components";
export default {
  name: "accidents",
  components: {
    UtilityBlock,
  },
  data: () => ({
    reportModalVisible: false,
    form: {},
  }),
  computed: {
    ...mapState({
      data: (state) => state.Accidents.data,
      loading: (state) => state.Accidents.loading,
      error: (state) => state.Accidents.error,
      user: (state) => state.User.data,
    }),
  },
  created() {
    if (!this.data) {
      this.$store.dispatch("Accidents/getProperty");
    }
  },
  mounted() {
    // var divElement = this.$refs.divElement;
    var vizElement = this.$refs.object;
    const width = this.$refs.grid.getBoundingClientRect().width - 16 * 4;
    vizElement.style.width = width + "px";
    vizElement.style.height = "827px";
    var scriptElement = document.createElement("script");
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  },
};
</script>
