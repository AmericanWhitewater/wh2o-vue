<template>
  <div
    class="nwi-color-by-toggle"
  >
    <cv-select
      v-model="colorBy"
      label=""
      class="cv-select-without-label"
    >
      <cv-select-option value="difficulty">
        Difficulty
      </cv-select-option>
      <cv-select-option value="currentFlow">
        Flow
      </cv-select-option>
    </cv-select>
  </div>
</template>

<script>

export default {
  name: 'nwi-color-by-toggle',
  computed: {
    colorBy: {
      get () {
        return this.$store.state.RiverIndex.mapColorBy
      },
      set (value) {
        this.$store.dispatch('RiverIndex/setMapColorBy', value)
      }
    }
  }
}
</script>

<style lang="scss">
.nwi-color-by-toggle {
  background-color: #fff;
  border-radius: 3px;
  top: 0.5rem;
  right: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  width: 8rem;
  position: absolute;
  z-index: 1;
  display: block;

  .bx--select-input {
    border-radius: 3px;
  }

}
</style>
