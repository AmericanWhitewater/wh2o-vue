<template>
  <div class="bg-topo">
    <div class="bx--grid app-users pt-lg">
      <div class="bx--row">
        <div class="bx--col-md-4 bx--offset-md-2 bx--col-lg-4 bx--offset-lg-6">
          <cv-tile>
            <div class="tile-header mb-lg">
              <h3>
                <router-link
                  to="/users/login"
                  v-text="'Login'"
                />
              </h3>
              <span>
                <!-- need to work on this guy... -->
                Or</span>
              <h3>
                <router-link
                  to="/users/register"
                  v-text="'Register'"
                />
              </h3>
            </div>
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
    margin-bottom: $spacing-lg;
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
