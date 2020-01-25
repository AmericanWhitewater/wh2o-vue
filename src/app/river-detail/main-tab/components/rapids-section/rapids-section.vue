<template>
  <section class="rapids-section">
    <hr />
    <h2 class="mb-spacing-md">
      Rapids
    </h2>
    <div class>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="10"
        viewBox="0 0 16 10"
        class="mb-spacing-sm"
        @click.prevent="viewMode = 'list'"
      >
        <title>list</title>
        <g fill="#232323">
          <g
            id="list"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              id="Path-28"
              fill="#232323"
              fill-rule="nonzero"
              d="M6 9V8h10v1z"
            />
            <path
              id="Path-28"
              fill="#232323"
              fill-rule="nonzero"
              d="M6 2V1h10v1z"
            />
            <circle id="Oval-12" fill="#232323" cx="1.5" cy="1.5" r="1.5" />
            <circle id="Oval-12" fill="#232323" cx="1.5" cy="8.5" r="1.5" />
          </g>
        </g>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        class="mb-spacing-md"
        @click.prevent="viewMode = 'grid'"
      >
        <title>grid</title>
        <g fill="#232323">
          <g
            id="grid"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              id="square"
              d="M1 1v4h4V1H1zm0-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1z"
              fill="#232323"
              fill-rule="nonzero"
            />
            <path
              id="square"
              d="M1 10v4h4v-4H1zm0-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"
              fill="#232323"
              fill-rule="nonzero"
            />
            <path
              id="square"
              d="M10 1v4h4V1h-4zm0-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1z"
              fill="#232323"
              fill-rule="nonzero"
            />
            <path
              id="square"
              d="M10 14h4v-4h-4v4zm0-5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"
              fill="#232323"
              fill-rule="nonzero"
            />
          </g>
        </g>
      </svg>
    </div>
    <template v-if="!loading">
      <div class="bx--row">
        <rapids-item
          v-for="(rapid, index) in rapids"
          :key="index"
          :rapid="rapid"
          :expanded="index === 0 ? true : false"
          :mode="viewMode"
        />
      </div>
    </template>
    <template v-else>
      This reach has no rapid data.
    </template>
  </section>
</template>
<script>
import { mapState } from "vuex";
import { RapidsItem } from "./components";

export default {
  name: "RapidsSection",
  components: {
    RapidsItem
  },
  data: () => ({
    viewMode: "list"
  }),
  computed: {
    ...mapState({
      loading: state => state.riverDetailState.rapidsData.loading,
      rapids: state => state.riverDetailState.rapidsData.data
    })
  }
};
</script>
<style lang="scss">
.rapids-section {
}
</style>
