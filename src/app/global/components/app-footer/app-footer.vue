<template>
  <div :class="[{'hidden':hideFooter},'app-footer']">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <cv-list>
            <cv-list-item
              v-for="(k, index) in navItems"
              :key="index"
            >
              <cv-link
                :to="k.path"
                v-text="k.label"
              />
            </cv-list-item>
          </cv-list>
        </div>
        <div class="bx--col" />
        <div class="bx--col" />
        <div class="bx--col">
          <cv-text-input placeholder="Subscribe to Newsletter" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { navItems } from '@/app/global/mixins'
/**
 * @displayName App Footer
 */
export default {
  name: 'AppFooter',
  mixins: [navItems],
  computed: {
    hideFooter () {
      switch (this.$route.name) {
        case 'river-index':
          return true
        case 'home':
          return true
        default:
          return false
      }
    }
  }
}
</script>

<style lang="scss">
.app-footer {
  margin-top: $layout-xl;
  position: relative;
  background-color: $brand-03;
  padding: $layout-md 0;
  margin-top: $layout-xl;
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
