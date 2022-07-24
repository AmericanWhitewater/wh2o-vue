<template>
  <span>
    <a class="bx--link bx--label" @click="showModal">{{ promptText }}</a>
    <cv-modal ref="modalWrapper" size="large" @modal-shown="setModalOffset">
      <template slot="title">
        <h2>Flow Ranges</h2>
      </template>
      <template slot="content">
        <p class="mb-sm">
          <strong>Too Low</strong>: The river in this range is below the
          recommended flow, indicating that even a majority of paddlers seeking
          a technical low-water paddling trip would not enjoy the river, would
          have difficulty navigating the river, and would be unlikely to return
          at this flow. Flows in this category are below the minimum acceptable
          flow for most people.
        </p>
        <p class="mb-sm">
          <strong>Low Flow</strong>: The river in this range offers a relatively
          technical paddling experience in which whitewater features like waves
          and holes are generally less powerful, avoiding rocks is more
          challenging, water velocities are lower, and the river may be shallow
          at times. Most paddlers seeking a technical experience will enjoy the
          river in this range and would return in this range.
        </p>
        <p class="mb-sm">
          <strong>Medium Flow</strong>: The river in this range offers paddlers
          a standard paddling experience, generally encompassing the optimal
          flow range for most paddlers and an experience true to the listed
          difficulty of the run. In this range the river will generally offer
          eddies and relatively moderate sized waves and holes, without the rock
          hits of low water or high velocities of high water.
        </p>
        <p class="mb-sm">
          <strong>High Flow</strong>: The river in this range will typically
          offer paddlers a high challenge trip associated with more powerful,
          fast, and complex currents, relatively large waves and holes, and
          fewer eddies. Most paddlers seeking a high challenge, high water
          experience will enjoy the river in this range and would return in this
          range.
        </p>
        <p>
          <strong>Too High</strong>: The river in this range is unacceptably
          high for a majority of paddlers, even those seeking a high water
          experience, and is above the recommended flow. Rivers that are too
          high may possess compounding risk factors, washed-out features that
          are no longer enjoyable, pollution and debris, or other factors that
          make them unappealing in this range for most paddlers.
        </p>
      </template>
    </cv-modal>
  </span>
</template>
<script>
import { shadowDomFixedHeightOffset } from "@/app/global/mixins";

export default {
  name: "flow-range-help-modal",
  mixins: [shadowDomFixedHeightOffset],
  props: {
    shortPromptText: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    promptText() {
      if (this.shortPromptText) {
        return "?";
      } else {
        return "What do these mean?";
      }
    },
  },
  methods: {
    showModal() {
      this.$refs.modalWrapper.show();
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  cursor: pointer;
}
</style>