<template>
  <div :class="[{'visible':visible},'rapid-edit-modal']">
    <cv-modal
      :visible="visible"
      size="large"
      @secondary-click="handleCancel"
      @primary-click="submitForm"
      @modal-hidden="handleCancel"
    >
      <template slot="title">
        {{ modalTitle }}
      </template>
      <template slot="content">
        <cv-text-input
          v-model="formData.name"
          class="mb-spacing-md"
          label="Name"
          data-modal-primary-focus
          :disabled="formPending"
        />
        <cv-number-input
          v-model="formData.distance"
          class="mb-spacing-md"
          label="Distance From Start"
          step=".01"
          :max="4132"
          :min="0"
          :mobile="windowWidth <= breakpoints.md"
          :disabled="formPending"
        />
        <cv-combo-box
          v-model="formData.class"
          class="mb-spacing-md"
          title="Class"
          auto-filter
          label="I - V+"
          :options="poiClasses"
          :disabled="formPending"
        />
        <cv-multi-select
          v-model="formData.character"
          :options="poiCharacteristics"
          class="mb-spacing-md"
          title="Characteristics"
        />
        <ContentEditor
          v-if="renderEditor"
          :content="initialRapidDescription"
          label="Description"
          @content:updated="descriptionUpdated"
        />
      </template>
      <template slot="secondary-button">
        Cancel
      </template>
      <template slot="primary-button">
        Submit
      </template>
    </cv-modal>
  </div>
</template>
<script>
import { globalAppActions } from '@/app/global/state'
import { checkWindow } from '@/app/global/mixins'
import { mapState } from 'vuex'
import ContentEditor from '@/app/global/components/content-editor/content-editor'
export default {
  name: 'rapid-edit-modal',
  components: {
    ContentEditor
  },
  /** @todo revisit adding checkWindow mixin performance considerations */
  mixins: [checkWindow],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    rapidId: {
      type: String,
      required: false
    }
  },
  data: () => ({
    renderEditor: false,
    formPending: false,
    initialRapidDescription: '',
    poiCharacteristics: [
      {
        value: 'putin',
        label: 'Put In',
        name: 'putin'
      },
      {
        value: 'hazard',
        label: 'Hazard',
        name: 'hazard'
      },
      {
        value: 'portage',
        label: 'Portage',
        name: 'portage'
      },
      {
        value: 'access',
        label: 'Access Point',
        name: 'access'
      },

      {
        value: 'waterfall',
        label: 'Waterfall / Large Drop',
        name: 'waterfall'
      },
      {
        value: 'takeout',
        label: 'Take Out',
        name: 'takeout'
      }
    ],
    poiClasses: [
      {
        value: 'I',
        label: 'I',
        name: 'I'
      },
      {
        value: 'II',
        label: 'II',
        name: 'II'
      },
      {
        value: 'III',
        label: 'III',
        name: 'III'
      },
      {
        value: 'IV',
        label: 'IV',
        name: 'IV'
      },
      {
        value: 'V',
        label: 'V',
        name: 'V'
      },
      {
        value: 'V+',
        label: 'V+',
        name: 'V+'
      }
    ],
    formData: {
      name: '',
      class: '',
      distance: 0,
      description: '',
      character: []
    }
  }),
  computed: {
    ...mapState({
      rapids: state => state.riverDetailState.rapidsData.data
    }),
    activeRapid () {
      if (this.rapidId) {
        return this.rapids.find(r => r.id === this.rapidId)
      }
      return null
    },
    modalTitle () {
      if (this.activeRapid) {
        return 'Edit Rapid'
      } else {
        return 'New Rapid'
      }
    }
  },
  methods: {
    descriptionUpdated (description) {
      this.formData.description = description
    },
    submitForm () {
      this.$emit('edit:submitted')

      setTimeout(() => {
        this.$emit('edit:success')
        this.$store.dispatch(globalAppActions.SEND_TOAST, {
          title: 'Rapid Edited',
          kind: 'success',
          override: true,
          contrast: false,
          action: false,
          autoHide: true
        })
      })
    },
    handleCancel () {
      this.$emit('edit:cancelled')
    }
  },
  mounted () {
    this.renderEditor = true
    if (this.activeRapid) {
      this.formData = Object.assign(this.formData, this.activeRapid)
      this.initialRapidDescription = this.activeRapid.description
    }
  }
}
</script>
