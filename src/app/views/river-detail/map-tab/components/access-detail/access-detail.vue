
<template>
  <div
    class="bx--col-sm-12 bx--col-md-12 bx--col-lg-16 mb-sm access-detail"
  >
    <cv-tile
      kind="standard"
      cv-type="standard"
    >
      <div class="top-bar">
        <div class="title mb-spacing-xs">
          <h4 class="mb-spacing-xs">
            {{ access.river }} - {{ access.section }} - {{ access.type }}
          </h4>
          <span class="mr-spacing-md rapid-meta">
            {{ access.coords[1] }},
          </span>
          <span class="mr-spacing-md rapid-meta">
            {{ access.coords[0] }}
          </span>
        </div>
      </div>
      <hr class="ui-03">
      <div class="bx--col-sm-12">
        <a
          class="bx--btn bx--btn--primary bx--btn--sm mr-spacing-sm"
          :href="googleMapsURL"
          target="_blank"
        >
          Google Maps
          <svg
            class="bx--btn__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="-3 5 16 16"
          >
            <g>
              <path d="M11 19H-1V9h3V5h-5v16h16v-5h-2z" />
              <path
                id="Shape_1_"
                d="M4.7 14.7L11 8.4V13h2V5H5v2h4.6l-6.3 6.3z"
              />
            </g>
          </svg>
        </a>
        <a
          class="bx--btn bx--btn--primary bx--btn--sm mr-spacing-sm"
          :href="appleMapsURL"
          target="_blank"
        >
          Apple Maps
          <svg
            class="bx--btn__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="-3 5 16 16"
          >
            <g>
              <path d="M11 19H-1V9h3V5h-5v16h16v-5h-2z" />
              <path
                id="Shape_1_"
                d="M4.7 14.7L11 8.4V13h2V5H5v2h4.6l-6.3 6.3z"
              />
            </g>
          </svg>
        </a>
      </div>
    </cv-tile>
  </div>
</template>

<script>
export default {
  name: 'access-detail',
  props: {
    access: {
      type: Object,
      required: true
    }
  },
  computed: {
    googleMapsURL () {
      return `https://www.google.com/maps/search/?api=1&query=${this.access.coords[1]},${
        this.access.coords[0]
      }`
    },
    appleMapsURL () {
      return `https://maps.apple.com/?ll=${this.access.coords[1]},${this.access.coords[0]}`
    }
  }
}
</script>

<style lang="scss" scoped>
h5 {
  text-transform: capitalize;
  padding: 0 0 0.75rem 0;
}
</style>
