<template>
  <div
    class="nwi-color-by-toggle"
  >
    <!-- <cv-dropdown
      v-model="colorBy"
    >
      <cv-dropdown-item value="difficulty">
        Difficulty
      </cv-dropdown-item>
      <cv-dropdown-item value="currentFlow">
        Flow
      </cv-dropdown-item>
    </cv-dropdown> -->
    <!-- <v-list>
      <v-list-item>
        Difficulty
      </v-list-item>
      <v-list-item>
        Flow
      </v-list-item>
    </v-list> -->
    <v-select
      dense
      v-model="colorBy"
      filled
      hide-details
      :items="[
        {
          text: 'Flow',
          value: 'flow',
        },
        {
          text: 'Difficulty',
          value: 'difficulty',
        },
      ]"
    />
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
        this.$store.dispatch('RiverIndex.setMapColorBy', value)
      }
    }
  }
}
</script>

<style lang="scss">
.nwi-color-by-toggle {
  background-color: #fff;
  // border-radius: 3px;
  top: 0.5rem;
  right: 0.5rem;
  // box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  width: 8rem;
  position: absolute;
  z-index: 1;
  // display: block;

  // .bx--dropdown {
  //   border-radius: 3px;
  // }

  // button.bx--dropdown-text {
  //   cursor: pointer;
  // }
}
</style>
