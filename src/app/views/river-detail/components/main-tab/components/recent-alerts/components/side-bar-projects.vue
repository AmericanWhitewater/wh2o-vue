<template>
  <div class="sidebar-projects">
    <span class="header-row">
      <h4 class="mb-spacing-sm">Projects</h4>
    </span>
    <template v-if="loading">
      <div class="pb-spacing-md">
        <cv-inline-loading
          id="cv-inline-loading--projects"
          state="loading"
        />
      </div>
    </template>
    <template v-else-if="projects && projects.length > 0">
      <div
        v-for="(project, i) in projects.slice(0, 1)"
        :key="i + 3 * 4"
        class="bx--row mb-spacing-xs sidebar-project"
      >
        <div class="bx--col-sm-12 bx--col-md-5">
          <div class="pt-spacing-sm pb-spacing-md">
            <cv-link :href="projectUrl(project)">
              <h5
                class="mb-spacing-2xs"
              >
                {{ $titleCase(project.name) }}
              </h5>
            </cv-link>

            <div
              v-if="project.description.length > 200"
              ref="abstract"
              class="abstract-content"
            
            >
              <span v-html="project.description.slice(0, 200)"/>
              <cv-link 
                :href="projectUrl(project)"
                class="read-more">
                ... Read More
              </cv-link>
            </div>
            <div
              v-else
              ref="abstract"
              class="abstract-content"
              v-html="project.description"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p class="no-projects-msg">
        No Projects.
      </p>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'sidebar-projects',
  computed: {
    ...mapState({
      loading: state => state.RiverProjects.loading,
      error: state => state.RiverProjects.error,
      projects: state => state.RiverProjects.data
    })
  },
  watch: {
    projects () {
      this.$emit('projects:change')
    }
  },
  methods: {
    projectUrl (project) {
      return `/content/Project/view/id/${project.id}/`
    }
  }
}
</script>
