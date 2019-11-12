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
              <loading-block text=" " />
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
import { LoadingBlock } from "@/app/global/components";
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
    RiverDescription,
    LoadingBlock
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
