<template>
  <div class="bg-topo">
    <div class="bx--grid app-users pt-lg">
      <div class="bx--row">
        <div class="bx--col-md-4 bx--offset-md-2 bx--col-lg-5 bx--offset-lg-5">
          <div class="tile-header mb-spacing-sm">
            <h2>
              <router-link
                to="/users/login"
                v-text="'Login'"
              />
            </h2>
            <span>
              <!-- need to work on this guy... -->
              Or</span>
            <h2>
              <router-link
                to="/users/register"
                v-text="'Register'"
              />
            </h2>
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
  name: "AppUsers"
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
    h2 {
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
