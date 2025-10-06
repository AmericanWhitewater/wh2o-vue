<template>
  <div class="user-access bg-topo">
    <div class="bx--grid app-users pt-lg">
      <div class="bx--row">
        <div class="bx--col-md-4 bx--offset-md-2 bx--col-lg-5 bx--offset-lg-5">
          <div
            v-if="$route.name !== 'logout'"
            class="tile-header mb-spacing-sm"
          >
            <h3>
              <a href="/login">Login</a>
            </h3>
            <span>
              <!-- need to work on this guy... -->
              Or</span
            >
            <h3>
              <a href="/register">Register</a>
            </h3>
          </div>
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col-md-4 bx--offset-md-2 bx--col-lg-5 bx--offset-lg-5">
          <cv-tile>
            <router-view />
          </cv-tile>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "user-access",
};
</script>
<style lang="scss">
// Not sure why style scoping isnt working properly.
// all components style should be scoped but still accept global styles
.app-users {
  height: 100vh;
  .tile-header {
    display: flex;
    align-items: center;
    span {
      font-size: 0.875rem;
      margin-right: $spacing-sm;
    }
    h3 {
      &:first-of-type {
        margin-right: $spacing-sm;
      }
      a {
        text-decoration: none;
        color: $text-01;
        &.router-link-active {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
