<template lang="html">
  <div class="bx--row">
  <div class="bx--col">
    <h2>River Description</h2>
    <p v-html="river.description"></p>
  </div>
    <p>{{Math.random()}}</p>
  </div>
</template>

<script>
export default {
  name: "RiverDetail",
  computed: {
    river(){
      return this.$store.state.selectedRiver;
    }
  }
};
</script>

<style lang="scss" scoped></style>
