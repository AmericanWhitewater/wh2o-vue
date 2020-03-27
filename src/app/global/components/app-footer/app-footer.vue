<template>
  <div
    v-show="$route.name !== 'home'"
    class="app-footer"
  >
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <div class="contents">
            <h6>American Whitewater</h6>
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
  name: 'app-footer'
}
</script>

<style lang="scss">
.app-footer {
  position: relative;
  background-color: $ui-05;
  .contents {
    height: 2rem;
    display: flex;
    align-items: center;
    color: $ui-02;
  }
}
</style>
<docs>

```js
<app-footer />
```

</docs>
