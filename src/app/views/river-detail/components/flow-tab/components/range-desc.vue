<template>
  <div class="range-description">
    <span v-if="range.range_comment">{{ range.range_comment }}</span>
    <span v-if="range.adjusted_reach_class">adjusts to {{ range.adjusted_reach_class }}</span>
    <span v-if="range.gauge_perfect" class="perfect tag">👌 perfect</span>
    <span v-if="range.gauge_estimated" class="estimated tag">estimated</span>
    <span v-if="range.gauge_important" class="important tag">important</span>
  </div>
</template>

<script>
export default {
  name: 'range-desc',
  props: {
    range: {
      type: Object,
      required: true
    }
  }

}
</script>

<style scoped lang="scss">
.range-description {
  margin-left: 2em;
}

.perfect {
  background: pink;
  color: black;

}

.important {
  color: black;
  background: yellow;
}

.estimated {
  background: #5aaafa;
  color: white;
}

.tag {
  border-radius: 5px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
}

</style>
