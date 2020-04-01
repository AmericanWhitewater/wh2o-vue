<template>
  <div class="user-gages">
    <cv-tile>
      <template v-if="gages">
        <div
          style="width:100%;height:0;padding-bottom:60%;position:relative;"
          class="mb-spacing-md"
        >
          <iframe
            src="https://giphy.com/embed/q9Km5jgfdSgBa"
            width="100%"
            height="100%"
            style="position:absolute"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          />
        </div>
        <cv-dropdown
          v-model="selectedGage"
          theme="light"
        >
          <cv-dropdown-item
            v-for="(item, index) in gages"
            :key="index"
            :value="item.gauge_id"
          >
            {{ item.gauge_id }}
          </cv-dropdown-item>
        </cv-dropdown>
      </template>
      <template v-else>
        you dont have any saved gages
      </template>
    </cv-tile>
  </div>
</template>

<script>
export default {
  name: 'user-gages',
  data: () => ({
    selectedGage: ''
  }),
  computed: {
    gages () {
      const data = this.$store.state.userState.userData.data

      if (data) {
        return data.gauge_notification.length > 0 ? data.gauge_notification : null
      }

      return null
    }
  },
  mounted () {
    if (this.gages) {
      // this works if you dont start on the gage tab
      this.selectedGage = this.gages[0].gauge_id
    }
  }
}
</script>
