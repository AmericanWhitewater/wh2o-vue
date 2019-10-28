<template>
  <div class="main-tab bx--row">
    <div class="bx--col">
      <div class="bx--row">
        <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-8 mb-md">
          <beta-box />
        </div>
        <div class="bx--col-sm-4 bx--col-md-6 bx--col-lg-8 mb-md">
          <div class="outside">
            <div class="inside map">
              <cv-skeleton-text :heading="true"></cv-skeleton-text>
            </div>
          </div>
        </div>
      </div>
      <div class="bx--row">
        <river-description />
        <side-bar />
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <rapids-section />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SideBar,
  BetaBox,
  RapidsSection,
  RiverDescription
} from "./components";
export default {
  name: "MainTab",
  components: {
    SideBar,
    RapidsSection,
    BetaBox,
    RiverDescription
  }
};
</script>
<style lang="scss">
.main-tab {
  padding-top: $spacing-xl;
  .bx--skeleton__heading {
    height: 400px;
  }
}
</style>
