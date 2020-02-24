<template>
  <div class="module-template">
    <layout
      name="layout-two-thirds"
      :options="layoutConfig"
    >
      <template v-slot:sidebar>
        <cv-tile>
          <div class="sidebar">
            <cv-button
              v-if="$route.name !== 'module'"
              squared
              class="mb-sm"
              size="small"
              @click="$router.push('/module')"
            >
              back
            </cv-button>
            <h1>{{ $route.name }}</h1>
            <hr>
            <div>Path: {{ $route.path }}</div>
            <div>Full Path: {{ $route.fullPath }}</div>
            <template v-if="$route.name === 'module'">
              <hr>
              <cv-button
                size="small"
                class="mb-md"
                @click="$router.push('/module/submodule-one')"
              >
                submodule one
              </cv-button>
              <cv-button
                size="small"
                @click="$router.push('/module/submodule-two')"
              >
                submodule two
              </cv-button>
            </template>
          </div>
        </cv-tile>
      </template>
      <template v-slot:main>
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view />
        </transition>
      </template>
    </layout>
  </div>
</template>
<script>

/**
 * @description use this as a starting point for new views.
 *
 */

import { mapState } from 'vuex'
import { Layout } from '@/app/global/layout'
import { moduleActions } from './shared/state'
export default {
  name: 'ModuleTemplate',
  components: {
    Layout
  },
  data: () => ({
    layoutConfig: {
      sidebar: {
        left: true
      }
    }
  }),
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
    min-height: $content-height;
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
