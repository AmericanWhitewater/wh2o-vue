<docs>

we can make the editor a stand alone component and pass the editable content as a prop


</docs>

<template>
  <main class="bx--col-sm-4 bx--col-md-6 bx--col-lg-8">
    <hr>
    <h2 class="mb-spacing-md">
      River Description
    </h2>
    <!-- need to sanitize v-html? -->
    <template v-if="!editMode">
      <p v-html="river.description" />
    </template>
    <template v-else>
      <content-editor :content="river.description" />
    </template>
  </main>
</template>
<script>
import {ContentEditor} from "@/app/global/components";
export default {
  name: "RiverDescription",
  components: { ContentEditor },
  computed: {
    river() {
      return this.$store.state.riverDetailState.riverDetailData.data;
    },
     editMode() {
      return this.$store.state.appGlobalState.appGlobalData.editMode;
    }
  }
};
</script>
<style lang="scss" scoped></style>
