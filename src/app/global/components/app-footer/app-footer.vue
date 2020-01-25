<template>
  <div class="app-footer">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <cv-list>
            <cv-list-item v-for="(k, index) in navItems.topbar" :key="index">
              <cv-link :to="k.path" v-text="k.title" />
            </cv-list-item>
          </cv-list>
        </div>
        <div class="bx--col">
          <cv-list>
            <cv-list-item v-for="(k, index) in navItems.primary" :key="index">
              <cv-link :to="k.path" v-text="k.title" />
            </cv-list-item>
          </cv-list>
        </div>
        <div class="bx--col">
          <cv-list>
            <cv-list-item v-for="(k, index) in navItems.footer" :key="index">
              <cv-link :to="k.path" v-text="k.title" />
            </cv-list-item>
          </cv-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { navItems } from "@/app/global/mixins";
/**
 * @displayName App Footer
 */
export default {
  name: "app-footer",
  mixins: [navItems]
};
</script>

<style lang="scss">
.app-footer {
  margin-top: $layout-xl;
  position: relative;
  background-color: $brand-03;
  padding: $layout-md 0;
  margin-top: $layout-xl;
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
