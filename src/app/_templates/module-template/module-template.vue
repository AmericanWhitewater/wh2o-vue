<template>
  <div class="module-template">
    <sidebar-layout>
      <template v-slot:sidebar>
        <div class="sidebar">
          <cv-button
            v-if="$route.name !== 'module'"
            squared
            variant="outline-secondary"
            class="mb-2"
            size="sm"
            to="/module"
          >
            <b-icon
              icon="arrow-left"
              scale="1.75"
            />
          </cv-button>
          <h4>{{ $route.name }}</h4>
          <hr>
          <div>Path: {{ $route.path }}</div>
          <div>Full Path: {{ $route.fullPath }}</div>
          <template v-if="$route.name === 'module'">
            <hr>
            <cv-button
              class="mb-3"
              variant="outline-dark"
              to="/module/submodule-one"
            >
              submodule one
            </cv-button>
            <cv-button
              variant="outline-dark"
              to="/module/submodule-two"
            >
              submodule two
            </cv-button>
          </template>
        </div>
      </template>
      <template v-slot:main>
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view />
        </transition>
      </template>
    </sidebar-layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { SidebarLayout } from '@/app/layouts'
import { moduleActions } from './shared/state'
export default {
  name: 'ModuleTemplate',
  components: {
    SidebarLayout
  },
  computed: {
    ...mapState({
      loading: state => state.moduleState.moduledata.loading,
      data: state => state.moduleState.moduledata.data,
      error: state => state.moduleState.moduledata.error
    })
  },
  created () {
    this.$store.dispatch(moduleActions.FETCH_MODULE_DATA)
  }
}
</script>
<style lang="scss" scoped>
.module-template {
  .sidebar {
    ul {
      li {
        padding: 0.25rem 0.5rem;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
<docs>

</docs>
