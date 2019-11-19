<template>
  <div class="beta-box">
    <table v-if="!loading" class="bx--data-table bx--data-table--zebra">
      <tr>
        <td>Difficulty</td>
        <td>{{ river.class }}</td>
      </tr>
      <tr>
        <td>Length</td>
        <td>{{ river.length }}</td>
      </tr>
      <tr>
        <td>Avg Gradient</td>
        <td>{{ river.avggradient }}</td>
      </tr>
      <tr>
        <td>Max Gradient</td>
        <td>{{ river.maxgradient }}</td>
      </tr>
      <tr>
        <td>Gage</td>
        <td>gage name</td>
      </tr>
      <tr>
        <td>Flow Range</td>
        <td>min - max</td>
      </tr>
      <tr>
        <td>Flow Rate as of</td>
        <td>flow rate</td>
      </tr>
      <tr>
        <td>Reach Info Last Updated</td>
        <td>{{ river.edited }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
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
