<template>
  <div class="page-not-found bg-topo">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col pt-lg">
          <h2 class="mb-spacing-md">
            404
          </h2>
          <p>
            Sorry, the page you are looking for is missing or doesn't exist.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPageNotFound"
};
</script>

<style lang="scss">
.page-not-found {
  @include full-page-height;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  .bx--col {
    text-align: center;
  }
}
</style>
