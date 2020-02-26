<template>
  <div class="bx--resource-card">
    <div class="bx--aspect-ratio bx--aspect-ratio--2x1">
      <div class="bx--aspect-ratio--object">
        <router-link :to="to">
          <cv-tile href="/river-index">
            <h5
              v-if="subtitle"
              class="bx--resource-card__subtitle"
              v-text="subtitle"
            />
            <h4
              class="bx--resource-card__title"
              v-text="title"
            />
            <div class="bx--resource-card__icon--img">
              <component
                :is="icon"
                v-if="!hideIcon"
              />
            </div>
            <div class="bx--resource-card__icon--action">
              <ArrowRight16 />
            </div>
          </cv-tile>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

// const aspectRatioClassNames = classnames([`${prefix}--aspect-ratio`], {
//     [`${prefix}--aspect-ratio--2x1`]: aspectRatio === '2:1',
//     [`${prefix}--aspect-ratio--1x1`]: aspectRatio === '1:1',
//     [`${prefix}--aspect-ratio--16x9`]: aspectRatio === '16:9',
//     [`${prefix}--aspect-ratio--4x3`]: aspectRatio === '4:3',
//   });

export default {
  name: 'ResourceCard',
  props: {
    title: {
      type: String,
      required: true,
      default: 'Title'
    },
    subtitle: {
      type: String,
      required: false
    },
    to: {
      type: String,
      default: '/',
      required: true
    },
    icon: {
      type: String,
      default: 'ChartBar32',
      required: true
    },
    hideIcon: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<style lang="scss">

.bx--resource-card  .bx--tile {
  background: $ui-background;
  height: 100%;
  padding: $spacing-05 25% $spacing-05 $spacing-05;
  position: relative;
  transition: background $duration--fast-01;
  text-decoration: none;
}

.bx--resource-card .bx--tile:hover {
  background: $hover-ui;
}

.bx--resource-card__title {
  @include carbon--type-style('productive-heading-03');
  text-decoration: none;
  color: $text-01;
}

.bx--resource-card__subtitle {
  @include carbon--type-style('heading-01');
  font-weight: 400;
  text-decoration: none;
  color: $text-01;
}

.bx--resource-card__icon--img {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: flex-end;
}

.bx--resource-card__icon--img .gatsby-resp-image-wrapper,
.bx--resource-card__icon--img img[src*='gif'],
.bx--resource-card__icon--img img[src*='svg'] {
  margin-bottom: 0;
}

.bx--resource-card__icon--img .gatsby-resp-image-wrapper {
  position: static !important; //important needed to override inline style added by Gatsby
}

.bx--resource-card__icon--action {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 20px;
  height: 20px;
}

// Dark
.bx--resource-card--dark .bx--tile {
  background: $carbon--gray-90; //$ui-background for gray 90 theme
}

.bx--resource-card--dark .bx--tile:hover {
  background: $carbon--gray-80; //$hover-ui for gray 90 theme
}

.bx--resource-card--dark .bx--resource-card__title,
.bx--resource-card--dark .bx--resource-card__subtitle {
  color: $text-04;
}

.bx--resource-card--dark .bx--resource-card__icon--action svg {
  fill: $carbon--gray-10; //$icon-01 for grsay 90 theme
}

// Disabled
.bx--resource-card--disabled .bx--tile:hover {
  background: $ui-background;
  cursor: not-allowed;
}

.bx--resource-card--disabled .bx--resource-card__title,
.bx--resource-card--disabled .bx--resource-card__subtitle {
  color: $disabled-03;
}

.bx--resource-card--disabled
  .bx--resource-card__icon--action
  svg {
  fill: $disabled-02;
}

.bx--resource-card--disabled .bx--resource-card__icon--img {
  filter: grayscale(100%);
  opacity: 0.5;
}

// Disabled dark
.bx--resource-card--disabled.bx--resource-card--dark
  .bx--tile:hover {
  background: $carbon--gray-90; //$ui-background for gray 90 theme
}

.bx--resource-card--disabled.bx--resource-card--dark
  .bx--resource-card__title,
.bx--resource-card--disabled.bx--resource-card--dark
  .bx--resource-card__subtitle {
  color: $carbon--gray-50; //$disabled-03 for gray 90
}

.bx--resource-card--disabled.bx--resource-card--dark
  .bx--resource-card__icon--action
  svg {
  fill: $carbon--gray-70; //$disabled-02 for gray 90
}

</style>
