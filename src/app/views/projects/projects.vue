<template>
  <div class="projects-table">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--col">
          <h1>
            Projects
          </h1>
        </div>
      </div>
      <div class="bx--row">
        <div class="bx--col">
          <template v-if="loading">
            loading
          </template>
          <template v-else-if="data">
            <div
              v-for="(project, index) in data"
              :key="index"
              class="mb-md"
            >
              <hr>
              <h3> {{ project.name }} </h3>
              <p> {{ project.description }} </p>
            </div>
          </template>
          <template v-else>
            error
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'projects-table',
  computed: {
    ...mapState({
      data: state => state.Projects.data,
      loading: state => state.Projects.loading,
      error: state => state.Projects.error
    })
  },
  methods: {
    ...mapActions({
      load: 'Projects/getProperty'
    })
  },
  created () {
    if (!this.data) {
      this.load('projects')
    }
  }
}
</script>
