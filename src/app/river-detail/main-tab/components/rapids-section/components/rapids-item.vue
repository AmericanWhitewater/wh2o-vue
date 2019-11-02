<template>
  <div :class="[containerClasses, 'rapid-item']">
    <cv-tile
      :kind="rapid.description.length > 50 ? 'expandable' : 'standard'"
      :cv-type="rapid.description.length > 50 ? 'expandable' : ''"
      :expanded="expanded"
    >
      <div class="top-bar">
        <div class>
          <h4>{{ rapid.name }}</h4>
          <span>Class: {{ rapid.difficulty }}</span>
          <span>Distance: {{ rapid.distance }}</span>
        </div>
        <rapid-icon-bar :data="rapid" />
      </div>
      <template slot="below">
        <div class="bx--row">
          <div class="bx--col-md-2">
            <div class="outside">
              <div class="inside thumbnail">
                <img
                  :src="
                    `https://prerelease.americanwhitewater.org${
                      rapid.photo.file.uri.thumb
                    }`
                  "
                  :alt="rapid.name"
                >
              </div>
            </div>
          </div>
          <div class="bx--col-md-6">
            <p v-html="rapid.description" />
          </div>
        </div>
      </template>
    </cv-tile>
  </div>
</template>
<script>
import RapidIconBar from "./rapid-icon-bar";
export default {
  name: "RapidsItem",
  components: {
    "rapid-icon-bar": RapidIconBar
  },
  props: {
    rapid: {
      type: Object,
      required: true
    },
    expanded: {
      type: Boolean,
      required: false,
      default: false
    },
    mode: {
      type: String,
      default: "grid"
    }
  },
  computed: {
    containerClasses() {
      let classes;
      if (this.mode === "list") {
        classes = "bx--col-sm-12 bx--col-md-12 bx--col-lg-16";
      } else {
        classes = "bx--col-sm-12 bx--col-md-6 bx--col-lg-4";
      }
      return classes;
    }
  }
};
</script>
<style lang="scss" scoped>
.rapid-item {
  @include ease;
}
.bx--tile {
  margin: $spacing-md 0;

  .thumbnail {
    width: 100%;
    min-height: 250px;
    background-color: $ui-03;
    margin-bottom: 1rem;
    img {
      object-fit: cover;
      height: 250px;
      width: 100%;
    }
  }
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  span {
    font-size: 14px;
    &:nth-child(1) {
      margin-right: 0.5rem;
    }
  }
}

.bx--tile--is-expanded .bx--tile-content__below-the-fold {
  border-top: solid 1px $ui-05;
  margin-top: $spacing-sm;
  padding-top: 1rem;
}

.bx--tile--expandable:hover {
  background-color: darken($ui-02, 0.05);
}
</style>
