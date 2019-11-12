<template>
  <div class="safety">
    <div class="bx--grid">
      <page-header title="Safety" />
      <div class="spacer" />
      <div class="bx--row pt-lg">
        <div class="bx--col-sm-12 bx--col-md-4 bx--col-lg-6">
          <h2 class="mb-spacing-md">
            Lorem Headline
          </h2>
          <p class="mb-spacing-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <cv-button
            kind="tertiary"
            @click="$router.push('/accident-database')"
          >
            See Full Accident DB
          </cv-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PageHeader } from "@/app/global/components";

export default {
  name: "AccidentDatabase",
  components: {
    PageHeader
  }
};
</script>
<style lang="scss"></style>
