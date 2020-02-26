<template>
  <div class="submodule-one pt-4">
    <FeatureCard
      to="/"
      class="mb-md"
    />

    <resource-card-group>
      <template #cardOne>
        <ResourceCard
          title="Contact Us"
          to="/"
          icon="Email32"
        />
      </template>
      <template #cardTwo>
        <ResourceCard
          title="Account Settings"

          to="/"
          icon="Settings32"
        />
      </template>
      <template #cardThree>
        <ResourceCard
          title="Flow Data"
          to="/"
          icon="ChartLine32"
        />
      </template>
      <template #cardFour>
        <ResourceCard
          subtitle="new"
          title="Save Content for Offline"

          to="/"
          icon="WifiOff32"
        />
      </template>
    </resource-card-group>
  </div>
</template>
<script>
import { submoduleOneActions } from '../shared/state'
import { ResourceCardGroup, ResourceCard, FeatureCard } from '@/app/global/components'
export default {
  name: 'CommunityEvents',
  components: {
    ResourceCardGroup,
    ResourceCard,
    FeatureCard
  },
  created () {
    this.$store.dispatch(submoduleOneActions.FETCH_SUBMODULE_ONE_DATA)
  }
}
</script>
<style lang="scss" scoped>
.submodule-one {
 background-color: $ui-03;
 padding: $layout-md;
}

// Set spacing to the right of the group
.resource-card-group .bx--col-lg-4:nth-child(2n) {
  @include carbon--breakpoint('lg') {
    margin-right: 33%;
  }
}

// set border between cards
.resource-card-group .bx--resource-card {
  border-top: 1px solid $carbon--gray-20;
}

.resource-card-group .bx--resource-card--dark {
  border-top-color: $carbon--black-100;
}

.resource-card-group
  .bx--col-lg-4:nth-child(2)
  .bx--resource-card {
  @include carbon--breakpoint('md') {
    border-top: 0px solid transparent;
  }
}

.resource-card-group
  .bx--col-lg-4:first-child
  .bx--resource-card {
  border-top: 0px solid transparent;
}

.resource-card-group
  .bx--col-lg-4:nth-child(odd)
  .bx--resource-card {
  @include carbon--breakpoint('md') {
    border-left: 1px solid transparent;
  }
}

.resource-card-group
  .bx--col-lg-4:nth-child(even)
  .bx--resource-card {
  @include carbon--breakpoint('md') {
    border-left: 1px solid $carbon--gray-20;
  }
}

.resource-card-group
  .bx--col-lg-4:nth-child(even)
  .bx--resource-card--dark {
  border-left-color: $carbon--black-100;
}

// Set spacing to the right of the group
.resource-card-group .bx--col-lg-4:nth-child(2) {
  @include carbon--breakpoint('lg') {
    margin-right: 33%;
  }
}

</style>
<docs>

</docs>
