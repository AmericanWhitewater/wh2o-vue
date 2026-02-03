<template>
  <div class="sidebar-projects bx--col-sm-12">
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
        v-for="(project, i) in projects.slice(0, 3)"
        :key="i + 3 * 4"
        class="mb-spacing-xs sidebar-project"
      >
          <div class="pt-spacing-sm pb-spacing-md">
            <cv-link :href="project.link">
              <h5
                class="mb-spacing-2xs"
                v-text="project.title.rendered"
              />
            </cv-link>

            <div
              ref="abstract"
              class="abstract-content"
            />
              <div class="read-more-container">
                <span v-html="excerptText(project.content.rendered)" />
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
    }),
  },
  watch: {
    projects () {
      this.$emit('projects:change')
    }
  },
  methods: {
    excerptText(htmlString) {
      let output = htmlString.split(" ").splice(0, 49).join(" ");
      if (htmlString.length > output.length) {
        output += " [...]";
      }
      return output;
    },
  }
}
</script>

<style lang="scss">
.sidebar-projects {
  display: inline-block;
  align-content: start;
  vertical-align: top;
  .header-row {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .sidebar-project {

    &:hover h5 {
      text-decoration: underline;
    }
  }

  .no-projects-msg {

    @include carbon--type-style("code-02");
  }
}
</style>