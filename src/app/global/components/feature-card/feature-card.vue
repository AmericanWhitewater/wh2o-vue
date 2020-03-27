<template>
  <div class="bx--feature-card">
    <router-link :to="to">
      <div class="bx--row">
        <div class="bx--col bx--no-gutter-left">
          <div class="bx--feature-card__img bx--aspect-ratio--1x1">
            <div class="bx--aspect-ratio--object bx--feature-background">
              <img
                :src="img"
                :title="title"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="bx--feature-card__row bx--row">
        <div
          class="bx--col bx--col-md-4 bx--col-lg-6 bx--offset-md-4 bx--offset-lg-10 bx--feature-card__column"
        >
          <ResourceCard
            :title="title"
            :subtitle="subtitle"
            :to="to"
            hide-icon
          />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import ResourceCard from '../resource-card/resource-card'

export default {
  name: 'feature-card',
  components: {
    ResourceCard
  },
  props: {
    to: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.bx--feature-card {
  position: relative;
  z-index: 1;
  overflow: hidden;
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
    min-width: 100%;
    object-fit: cover;
    height: 100%;
    @include carbon--breakpoint("sm") {
      max-height: 80vh;
    }

    @include carbon--breakpoint("md") {
      max-height: 80vh;
    }
  }
}

.bx--feature-card:hover .bx--feature-card__link .bx--tile {
  background: $hover-ui;
}

.bx--feature-card:hover
  .bx--feature-card__link
  .bx--resource-card--dark
  .bx--tile {
  background: $carbon--gray-80; //$hover-ui for gray 90 theme
}

.bx--feature-card__link:focus {
  outline: none;

  .bx--feature-background > * {
    outline: 2px solid $focus;
    outline-offset: 2px;
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
</style>
