<template>
  <div>
    <h4>Correlation</h4>
    <p v-if="!correlationDetails || !correlationDetails.value">
      No correlation defined.
    </p>
    <p v-else-if="!correlationDetails.ok">
      This is legacy data that was properly defined and is not compatible with our new gauge data structures. Please re-create the correlation.
    </p>
    <div v-else>
      <div class="range-indicator">
        <div class="below-recommended">below recommended</div>
        <div class="low-runnable">low runnable</div>
        <div class="medium-runnable">medium runnable</div>
        <div class="high-runnable">high runnable</div>
        <div class="above-recommended">above recommended</div>
      </div>
      <div class="inflection-points">
        <div>&nbsp;</div>
        <div>
          <span v-if="!editing">{{ beginLowRunnable }}</span>
          <input v-else v-model="beginLowRunnable" type="text" class="bx--text-input">
          <span class="divider">-</span>
        </div>
        <div>
          <span v-if="!editing">{{ beginMediumRunnable }}</span>
          <input v-else v-model="beginMediumRunnable" type="text" class="bx--text-input">
          <span class="divider">-</span>
        </div>
        <div>
          <span v-if="!editing">{{ beginHighRunnable }}</span>
          <input v-else v-model="beginHighRunnable" type="text" class="bx--text-input">
          <span class="divider">-</span>
        </div>
        <div>
          <span v-if="!editing">{{ endHighRunnable }}</span>
          <input v-else v-model="endHighRunnable" type="text" class="bx--text-input">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flow-bands',
  components: {},
  mixins: [],
  props: {
    correlationDetails: {
      type: Object
    }
  },
  data: () => ({
      beginLowRunnable: null,
      beginMediumRunnable: null,
      beginHighRunnable: null,
      endHighRunnable: null,
      editing: false
  }),
  watch: {
    correlationDetails: {
      immediate: true,
      handler(correlationDetails) {
        if (correlationDetails && correlationDetails.value) {
          this.beginLowRunnable = correlationDetails.value.beginLowRunnable;
          this.beginMediumRunnable = correlationDetails.value.beginMediumRunnable;
          this.beginHighRunnable = correlationDetails.value.beginHighRunnable;
          this.endHighRunnable = correlationDetails.value.endHighRunnable;
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.range-indicator, .inflection-points {
  align-items: center;
  display: flex;
  justify-content: space-between;

  div {
    width: 100%;
    display: block;
  }
}

.inflection-points {
  div {
    display: flex;

    input, span {
      display: block;
      width: 12ch;
      margin-left: -6ch;
      text-align: center;
    }

    input {
      text-align: center;
      background: white;
      color: black;
    }

    .divider {
      margin-left:-6ch;
      width:100%;
      text-align: center;
    }
  }
}
.range-indicator {
  div {
    width: 100%;
    display: block;
    color: white;
    text-align: center;

    &.below-recommended {
      background-color: $flow-low;
    }
    &.low-runnable {
      background-color: $low-runnable;
    }
    &.medium-runnable {
      background-color: $med-runnable;
    }
    &.high-runnable {
      background-color: $high-runnable;
    }
    &.above-recommended {
      background-color: $flow-high;
    }
  }
}

</style>