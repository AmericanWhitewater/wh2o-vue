<template>
  <div :class="[{'hidden':hideFooter},'app-footer']">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col-sm-12 bx--col-md-8 bx--col-lg-8">
          <resource-card-group>
            <template #cardOne>
              <ResourceCard
                title="River Map"
                to="/river-index"
                icon="ChartLine32"
                color="light"
              />
            </template>
            <template #cardTwo>
              <ResourceCard
                v-if="loggedIn"
                title="Inbox"
                to="/community/events"
                icon="Email32"
                color="light"
              />
            </template>
            <template #cardThree>
              <ResourceCard
                title="Account Settings"
                to="/user/access/login"
                icon="Settings32"
                color="light"
              />
            </template>
            <template #cardFour>
              <ResourceCard
                v-if="loggedIn"
                subtitle="new"
                title="Saved Rivers"
                to="/user/account/1/gages"
                icon="WifiOff32"
                color="light"
              />
            </template>
          </resource-card-group>
        </div>
        <!-- <div class="bx--col-sm-12 bx--col-md-2 bx--col-lg-3">
          <cv-text-input placeholder="Subscribe to Newsletter" />
        </div>
        <div class="bx--col">

        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import ResourceCardGroup from '../resource-card-group/resource-card-group'
import ResourceCard from '../resource-card/resource-card'
import { navItems } from '@/app/global/mixins'
/**
 * @displayName App Footer
 */
export default {
  name: 'AppFooter',
  components: {
    ResourceCardGroup,
    ResourceCard
  },
  mixins: [navItems],
  data: () => ({
    loggedIn: true
  }),
  computed: {
    hideFooter () {
      return this.$route.name === 'home'
    }
  }
}
</script>

<style lang="scss">
.app-footer {
  position: relative;
  background-color: $ui-03;
  padding: $layout-md 0;
  &.hidden {
    display:none;
  }
  .bx--list__item {
    color: #fff;
    .bx--link {
      color: #fff;
      &:visited {
        color: #fff;
      }
    }
  }
}
</style>
<docs>

```js
<app-footer />
```

</docs>
