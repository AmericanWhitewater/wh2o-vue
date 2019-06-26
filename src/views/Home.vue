<template>
  <div class="bx--row">
    <div class="bx--col">
      <PageBanner tier="hero" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PageBanner from "@/components/PageBanner.vue";

export default {
  name: "home",
  components: {
    PageBanner
  }
};
</script>
