<template>
  <div class="bg-topo feature-card-hero">
    <div class="bx--feature-card bx--grid">
      <div
        class="bx--row"
        style="align-self:center;justify-self:center;width:100vw;"
      >
        <div class="bx--col-sm-12 bx--col-md-6 bx--offset-md-1 bx--col-lg-8 bx--offset-lg-4  ">
          <div class="bx--feature-card__img bx--aspect-ratio--1x1">
            <div class="bx--aspect-ratio--object bx--feature-background">
              <aw-logo variant="xl" />
            </div>
          </div>
        </div>
      </div>
      <div class="bx--feature-card__row bx--row">
        <div
          class="bx--col bx--col-md-8 bx--col-lg-10 bx--offset-lg-6 bx--feature-card__column"
        >
          <resource-card-group>
            <template #cardOne>
              <ResourceCard
                title="River Map"
                to="/river-index"
                icon="Map32"
              />
            </template>
            <template #cardTwo>
              <ResourceCard
                title="News"
                to="/news"
                icon="Bullhorn32"
              />
            </template>
          </resource-card-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ResourceCard, ResourceCardGroup, AwLogo } from '@/app/global/components'

export default {
  name: 'feature-card-hero',
  components: {
    ResourceCardGroup,
    ResourceCard,
    AwLogo
  }
}
</script>

<style lang="scss" scoped>

.feature-card-hero {
  height:100vh;
.bx--feature-card {
  position: relative;
  height:100%;
  @include carbon--breakpoint("md") {
    display: flex;
  }
}

.bx--feature-card__row {
  @include carbon--breakpoint("md") {
    position: absolute;
    left: 0;
    bottom: 0;
    width: calc(
      100% + 2rem
    ); //needed to make the row the same width as other rows with the negative margins
  }

  @include carbon--breakpoint("max") {
    width: calc(100% + 1rem);
  }
}

.bx--feature-card__img {
  position: relative;
  img {
    max-width: 100%;
    max-height: 100vh;
  }
}

// .bx--feature-card:hover .bx--feature-card__link .bx--tile {
//   background: $hover-ui;
// }

// .bx--feature-card:hover
//   .bx--feature-card__link
//   .bx--resource-card--dark
//   .bx--tile {
//   background: $carbon--gray-80; //$hover-ui for gray 90 theme
// }

// .bx--feature-card__link:focus {
//   outline: none;

//   .bx--feature-background > * {
//     outline: 2px solid $focus;
//     outline-offset: 2px;
//   }
// }
.bx--feature-background {
  display: none;
   @include carbon--breakpoint("md") {
    display: block;
  }
}

// Display image at square aspect ratio only on mobile
.bx--feature-card__img.bx--aspect-ratio--1x1 {
  @include carbon--breakpoint("md") {
    padding-bottom: 0;
  }
}

.bx--feature-card__img .bx--aspect-ratio--object {
  @include carbon--breakpoint("md") {
    position: static;
  }
}

@include carbon--breakpoint("sm") {
  .bx--feature-card .gatsby-resp-image-wrapper {
    position: relative;
    display: block;
    margin-left: -1rem;
    margin-right: -1rem;
    max-width: 100%;
    overflow: hidden;
    height: 100%;
  }

  .bx--feature-card .gatsby-resp-image-background-image {
    padding-bottom: 100%;
  }

  .bx--feature-card .gatsby-resp-image-image {
    width: auto !important;
    left: auto !important;
    right: 0;
    object-fit: cover;
  }
}

// overrides for larger breakpoints
.bx--feature-card .gatsby-resp-image-wrapper {
  margin-left: 0;
  margin-right: 0;
}
.bx--feature-card__column {
  z-index: 1;
}
}

</style>
