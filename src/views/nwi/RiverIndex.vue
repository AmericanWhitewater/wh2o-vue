<template lang="html">
  <div class="">
    <a href="#" v-if="riverSelected" @click="back">Back</a>
    <page-banner
      :heading="
        !visibleRiver.river
          ? 'National Whitewater Inventory'
          : visibleRiver.river
      "
      :subheading="visibleRiver.section ? visibleRiver.section : ''"
      tier="L1"
    />
    <ul v-if="!riverSelected">
      <li v-for="(river, index) in rivers">
        <a href="#0" @click="selectReach(index)"
          >{{ river.river }} <br />
          {{ river.section }}</a
        >
      </li>
    </ul>
    <RiverDetail v-else />
    <!-- <cv-data-table :columns="rivers" :data="rivers">
      <template slot="data">
        <cv-data-table-row
          v-for="(river, index) in rivers"
          :key="index"
          :value="index"
        >
          <cv-data-table-cell>
            <input
              type="text"
              :value="row"
              style="border: none; background: none; width: 100%;"
            />
          </cv-data-table-cell>
          <template slot="expandedContent"
            >A variety of content types can live here. Be sure to follow Carbon
            design guidelines for spacing and alignment.</template
          >
        </cv-data-table-row>
      </template>
    </cv-data-table> -->
    <!-- <CvButton /> -->
  </div>
</template>

<script>
import PageBanner from "@/components/PageBanner.vue";
import RiverDetail from "./RiverDetail.vue";
const axios = require("axios");
export default {
  name: "RiverIndex",
  components: {
    "page-banner": PageBanner,
    RiverDetail
    // "cv-data-table": CvDataTable,
    // "cv-data-table-row": CvDataTableRow,
    // "cv-data-table-cell": CvDataTableCell,
    // "cv-button":CvButton
  },
  data: () => {
    return {
      riverSelected: false,
      selectedRiver: {},
      rivers: [],
      awAPI:
        "//americanwhitewater.org/content/River/detail/id/${reach id}/.json"
    };
  },
  methods: {
    selectReach(id) {
      this.$store.dispatch("setRiver", id);
      this.riverSelected = true;
    },
    back() {
      this.$store.commit("SET_SELECTED_RIVER", 0);
      this.riverSelected = false;
    }
  },
  computed: {
    visibleRiver() {
      const river = this.$store.state.selectedRiver;
      return river;
    }
  },
  mounted() {
    axios.get("//localhost:3000/river").then(response => {
      console.log("response ", response);
      this.rivers = response.data;
    });
  }
};
</script>

<style lang="scss" scoped>
li {
  padding: 2rem;
  margin-bottom: 1rem;
  &:nth-child(even) {
    background-color: $ui-03;
  }
}
</style>
