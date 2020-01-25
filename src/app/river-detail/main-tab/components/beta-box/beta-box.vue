<template>
  <div class="beta-box">
    <table v-if="!loading" class="bx--data-table bx--data-table--zebra">
      <tr>
        <td>Difficulty</td>
        <td v-text="river.class" />
      </tr>
      <tr>
        <td>Length</td>
        <td v-text="river.length" />
      </tr>
      <tr>
        <td>Avg Gradient</td>
        <td v-text="river.avggradient" />
      </tr>
      <tr>
        <td>Max Gradient</td>
        <td v-text="river.maxgradient" />
      </tr>
      <tr>
        <td>Gage</td>
        <td>n/a</td>
      </tr>
      <tr>
        <td>Flow Range</td>
        <td>n/a</td>
      </tr>
      <tr>
        <td>Flow Rate as of</td>
        <td>n/a</td>
      </tr>
      <tr>
        <td>Reach Info Last Updated</td>
        <td v-text="formatDate(river.edited)" />
      </tr>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Moment from "moment";

export default {
  name: "BetaBox",
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.riverDetailData.loading,
      river: state => state.riverDetailState.riverDetailData.data
    })
  },
  methods: {
    formatDate(input) {
      return Moment(input, "MMM Do YY").format("ll");
    }
  }
};
</script>
<style lang="scss" scoped>
.beta-box {
  max-width: 100%;
  overflow-x: scroll;
}
td {
  vertical-align: middle;
  background-color: transparent;
}
tr {
  @include ease;
  &:hover,
  &:focus {
    background-color: $ui-02;
  }
}
</style>
