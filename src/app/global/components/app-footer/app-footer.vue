<template>
  <div class="app-footer">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <div class="inside">
            <h6> block</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-footer"
};
</script>

<style lang="scss">
.app-footer {
  height: 300px;
  position: relative;
  background-color: $brand-03;
  .inside {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>