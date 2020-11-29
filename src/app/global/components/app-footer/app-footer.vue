<template>
  <div
    v-show="$route.name !== 'home'"
    class="app-footer"
  >
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <div class="contents">
            
            <div class="icons">
              <a href="https://github.com/AmericanWhitewater" target="_blank">
            <LogoGitHub24 />
            </a>
            <transition name="fade" mode="out-in">
                <div v-if="offline" class="ml-spacing-md">
                  <cv-tag
                    id="network-tag"
                    kind="red"
                    label="Network Disconnected"
                  />
                </div>
              </transition>
            </div>
            <span>American Whitewater &copy; 1999 – Present</span>
            <router-link to="/legacy-viewer?url=https://www.americanwhitewater.org/">
              Legacy App
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @displayName App Footer
 */
export default {
  name: 'app-footer',
  computed: {
    offline () {
      return this.$store.state.Global.offline
    }
  }
}
</script>

<style lang="scss">
.app-footer {
  position: fixed;
  background-color: $ui-05;
  z-index: 5;
  bottom:0;
  left:0;
  width: 100vw;
  .contents {
    height: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $ui-02;
    @include carbon--type-style("code-01");
    .icons {
      display: flex;
      align-items: center;
    }
    a {
      color: $ui-02;
      display:block;
      svg {
        display:block;
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
