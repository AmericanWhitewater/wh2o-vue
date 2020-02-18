<template>
  <div>
    <video-hero-banner />
  </div>
</template>
<script>
import { CheckWindow } from "@/app/global/mixins";
import { VideoHeroBanner } from "./components";

export default {
  name: "home-page",
  components: {
    VideoHeroBanner
  },
  mixins: [CheckWindow]
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
}
</style>
