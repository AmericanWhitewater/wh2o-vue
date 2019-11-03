<template>
  <div class="app-footer">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <cv-list>
            <cv-list-item
              v-for="(k,index) in navItems.topbar"
              :key="index"
            >
              <cv-link
                :to="k.path"
                v-text="k.title"
              />
            </cv-list-item>
          </cv-list>
        </div>
        <div class="bx--col">
          <cv-list>
            <cv-list-item
              v-for="(k,index) in navItems.primary"
              :key="index"
            >
              <cv-link
                :to="k.path"
                v-text="k.title"
              />
            </cv-list-item>
          </cv-list>
        </div>
        <div class="bx--col">
          <cv-list>
            <cv-list-item
              v-for="(k,index) in navItems.footer"
              :key="index"
            >
              <cv-link
                :to="k.path"
                v-text="k.title"
              />
            </cv-list-item>
          </cv-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { navItems } from "@/app/global/mixins";
export default {
  name: "AppFooter",
  mixins: [navItems]
};
</script>

<style lang="scss">
.app-footer {
  position: relative;
  background-color: $brand-03;
  padding: $layout-md 0;
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