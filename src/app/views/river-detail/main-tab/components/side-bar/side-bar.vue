<template>
  <aside
    class="main-tab-sidebar bx--col-sm-4 bx--col-md-6 bx--col-lg-6 bx--offset-lg-1"
  >
    <div
      ref="contentArea"
      :class="[{ sticky: sticky }, 'content-area bx--row']"
    >
      <div class="bx--col">
        <h4>Alerts</h4>
        <template v-if="alerts.length > 0">
          <cv-inline-notification
            v-for="(alert, index) in alerts"
            :key="index"
            :kind="alert.kind"
            :title="alert.title"
            :sub-title="alert.subtitle"
            @close="doClose(index)"
          />
        </template>
        <template v-else>
          <p>There are no new alerts</p>
        </template>
        <template v-if="articles.length > 0">
          <h4>News</h4>
        </template>
        <template v-if="documents.length > 0">
          <h4>Documents</h4>
        </template>
        <template v-if="projects.length > 0">
          <h4>Projects</h4>
        </template>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  name: 'SideBar',
  data: () => ({
    sticky: false,
    alerts: [
      {
        title: 'uh oh',
        kind: 'warning',
        subtitle:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        title: 'uh oh',
        kind: 'error',
        subtitle:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ],
    articles: [],
    projects: [],
    documents: []
  }),
  mounted () {
    this.isSticky()
  },
  methods: {
    doClose (index) {
      alert(`Do something for alert: ${index}`)
    },
    isSticky () {
      if (this.$refs.contentArea.clientHeight > 800) {
        this.sticky = false
      } else {
        this.sticky = true
      }
    }
  }
}
</script>
<style lang="scss">
.main-tab-sidebar {
  min-height: 100%;
  .content-area {
    height: auto;
    background-color: $ui-03;
    padding: $spacing-sm 0;
    &.sticky {
      position: sticky;
      top: 50px;
      @include MQ("LG") {
        top: 75px;
      }
    }
  }
}
</style>
