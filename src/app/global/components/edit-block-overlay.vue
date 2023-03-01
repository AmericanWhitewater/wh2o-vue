<template>
  <div
    v-if="editMode"
    class="edit-block-overlay"
    @click="$emit('click')"
  >
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
/**
 * @displayName Edit Block Overlay
 */
import { mapState } from "vuex";

export default {
  name: "edit-block-overlay",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
   ...mapState({
    editMode: (state) => state.Global.editMode
   })
  }
};
</script>
<style lang="scss" scoped>
.edit-block-overlay {
  align-items: center;
  background-color: rgba($ui-02, 0.75);
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;

  &:hover {
    background-color: rgba($ui-03, 0.75);
  }
}
</style>
