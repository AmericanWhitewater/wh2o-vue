<template>
  <div>
    <video-hero-banner />
  </div>
</template>
<script>
import { CheckWindow } from "../global/mixins";
import { VideoHeroBanner } from "./components";
export default {
  name: "HomePage",
  mixins: [CheckWindow],
  components: {
    VideoHeroBanner
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
}
</style>
