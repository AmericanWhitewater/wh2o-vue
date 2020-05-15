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
        <label class="bx--label mb-spacing-xs">Location</label>
        <nwi-map
          height="350"
          :include-legend="false"
          class="mb-spacing-md"
        />
        <!-- remove this field if we can calculate value from dropped pin -->
        <cv-number-input
          v-model="formData.distance"
          class="mb-spacing-md"
          label="Distance From Start"
          step=".01"
          :max="4132"
          :min="0"
          :mobile="windowWidth <= $options.breakpoints.md"
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
          v-if="renderEditor && initialRapidDescription"
          :content="initialRapidDescription"
          label="Description"
          placeholder=" "
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
import { checkWindow, poiClasses } from '@/app/global/mixins'
import ContentEditor from '@/app/global/components/content-editor/content-editor'
import NwiMap from '@/app/views/river-index/components/nwi-map.vue'
export default {
  name: 'rapid-edit-modal',
  components: {
    ContentEditor,
    NwiMap
  },
  /** @todo revisit adding checkWindow mixin performance considerations */
  mixins: [checkWindow, poiClasses],
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
      },
      {
        value: 'rapid',
        label: 'Rapid',
        name: 'rapid'
      },
      {
        value: 'other',
        label: 'Other',
        name: 'other'
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
    rapids () {
      return this.$store.state.riverDetailState.rapidsData.data
    },
    activeRapid () {
      return this.rapidId ? this.rapids.find(r => r.id === this.rapidId) : null
    },
    modalTitle () {
      return this.activeRapid ? 'Edit Rapid' : 'New Rapid'
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
