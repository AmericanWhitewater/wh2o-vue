<template>
  <div :class="[character.length > 0 ? 'has-icons' : '', 'rapid-icon-bar']">
    <template v-if="!editMode">
      <ul id="character-icons-wrapper">
        <li
          v-if="putin"
          id="put-in-icon"
        >
          <cv-tooltip tip="Put In">
            <Login32 />
          </cv-tooltip>
        </li>
        <li
          v-if="access"
          id="access-icon"
        >
          <cv-tooltip tip="Access Point">
            <Repeat32 />
          </cv-tooltip>
        </li>

        <li
          v-if="hazard"
          id="hazard-icon"
        >
          <cv-tooltip tip="Hazard">
            <WarningSquare32 />
          </cv-tooltip>
        </li>

        <li
          v-if="playspot"
          id="surf-icon"
        >
          <icon
            name="surf"
            tip="Surf Spot"
          />
        </li>

        <li
          v-if="portage"
          id="portage-icon"
        >
          <cv-tooltip tip="Portage">
            <Pedestrian32 />
          </cv-tooltip>
        </li>

        <li
          v-if="waterfall"
          id="waterfall-icon"
        >
          <cv-tooltip tip="Waterfall / Large Drop">
            <WarningSquare32 />
          </cv-tooltip>
        </li>

        <li
          v-if="takeout"
          id="take-out-icon"
        >
          <cv-tooltip tip="Take Out">
            <Logout32 />
          </cv-tooltip>
        </li>
      </ul>
    </template>
    <template v-else>
      <div>
        <cv-button
          id="edit-button"
          kind="secondary"
          size="small"
          @click.exact="$emit('rapid:edit')"
          @keydown.enter="$emit('rapid:edit')"
        >
          Edit
        </cv-button>
        <cv-button
          id="delete-button"
          kind="danger"
          size="small"
          @click.exact="$emit('rapid:delete')"
          @keydown.enter="$emit('rapid:delete')"
        >
          Delete
        </cv-button>
      </div>
    </template>
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
      required: true,
      default: function () {
        return []
      },
      validator: val => {
        // throw warning if endpoint response changes
        const knownCharacteristics = ['takeout', 'putin', 'waterfall', 'portage', 'playspot', 'hazard', 'access']
        const isKnownCharacteristic = input => knownCharacteristics.indexOf(input) > -1
        return val.every(isKnownCharacteristic)
      }
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
