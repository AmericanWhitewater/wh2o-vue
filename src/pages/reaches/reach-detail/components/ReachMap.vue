<template>
  <v-card>
    <div class="reach-map" :style="`width:${mapWidth}px`">
      <v-skeleton-loader
        type="image"
      ></v-skeleton-loader>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'ReachMap',
  data: () => ({
    mapWidth: 0
  }),
  methods: {
    getMapWidth() {
      this.mapWidth = (window.innerWidth / 2 ) - 48
    }
  },
  created() {
    this.getMapWidth()
  }
}
</script>
<style lang="scss" scoped>
.reach-map {
  height: auto;
  width:100px;

  // position: relative;
}
</style>
