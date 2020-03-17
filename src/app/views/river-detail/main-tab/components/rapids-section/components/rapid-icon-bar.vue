<template>
  <div :class="[character.length > 0 ? 'has-icons' : '' ,'rapid-icon-bar']">
    <ul :class="{ 'edit-mode': editMode }">
      <template v-if="hazard">
        <li>
          <cv-tooltip tip="Hazard">
            <icon
              name="waterfall"
              tip="Hazard"
            />
          </cv-tooltip>
        </li>
      </template>
      <template v-if="playspot">
        <li>
          <icon
            name="surf"
            tip="Surf Spot"
          />
        </li>
      </template>
      <template v-if="portage">
        <li>
          <icon
            name="walk"
            tip="Portage"
          />
        </li>
      </template>
      <template v-if="putin">
        <li>
          <icon
            name="put-in"
            tip="Put In"
          />
        </li>
      </template>
      <template v-if="takeout">
        <li>
          <icon
            name="take-out"
            tip="Take Out"
          />
        </li>
      </template>
      <template v-if="waterfall">
        <icon
          name="waterfall"
          tip="Waterfall"
        />
      </template>
      <template v-if="access">
        <icon
          name="access"
          tip="Access Point"
        />
      </template>
    </ul>
  </div>
</template>
<script>
import appIcon from '@/app/global/components/app-icon/app-icon'
export default {
  name: 'rapid-icon-bar',
  components: {
    icon: appIcon
  },
  props: {
    character: {
      type: Array,
      required: true
    }
  },
  computed: {
    editMode () {
      return this.$store.state.appGlobalState.appGlobalData.editMode
    },
    hazard () {
      return this.character.includes('hazard')
    },
    waterfall () {
      return this.character.includes('waterfall')
    },
    playspot () {
      return this.character.includes('playspot')
    },
    putin () {
      return this.character.includes('putin')
    },
    portage () {
      return this.character.includes('portage')
    },
    takeout () {
      return this.character.includes('takeout')
    },
    access () {
      return this.character.includes('access')
    }
  }
}
</script>
<style lang="scss" scoped>
.rapid-icon-bar {
  display: flex;
  align-items: center;
 &.has-icons {
    @include carbon--breakpoint("sm") {
    margin: $spacing-md 0;
  }
 }
  ul {
    &.edit-mode {
      margin-right: $spacing-md;
    }
    li {
      display: inline;
      margin-left: 0.5rem;
    }
  }
}
</style>
