<template>
  <cv-modal
    ref="modalWrapper"
    :auto-hide-off="true"
    size="small"
    :visible="internalVisible"
    @primary-click="handleSubmit"
    @secondary-click="handleCancel"
    @modal-shown="handleShow"
    @modal-hidden="handleCancel"
  >
    <template slot="label">
      <template v-if="label">
        {{ label }}
      </template>
    </template>
    <template slot="title">
      {{ title }}
    </template>
    <template slot="content">
      <media-upload-form
        :section="section"
        :primary-click-timestamp="primaryClickTimestamp"
        @form:success="$emit('form:success')"
        @form:submitted="$emit('form:submitted')"
        @form:error="$emit('form:error')"
      />
    </template>
    <template slot="secondary-button">
      Cancel
    </template>
    <template slot="primary-button">
      OK
    </template>
  </cv-modal>
</template>
<script type="ts">
/**
 *
 * @note could potentially merge media-upload-form into
 * this component if we're not using the form outside
 * of modal
 *
 */
import MediaUploadForm from './media-upload-form.vue'
import {defineComponent, ref, watch} from '@vue/composition-api'
import { useShadowDomFixedHeightOffset } from '@/app/global/compositions/shadow-dom-fixed-height-offset'
import CvModal from '@carbon/vue/src/components/cv-modal'
// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
  name: 'media-upload-modal',
  components: {
    MediaUploadForm
  },

  props: {
    title: {
      type: String,
      required: false,
      default: 'Media Upload'
    },
    label: {
      type: String,
      required: false
    },
    visible: {
      type: Boolean,
      required: true
    },
    section: {
      type: String,
      required: true,
      validator: val =>
        ['RAPID', 'POST', 'GALLERY', 'REACH'].indexOf(val) > -1
    },
    rapids: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  setup (props, context) {
    const internalVisible = ref(false);
    watch(()=>props.visible,()=>{internalVisible.value = props.visible}, {immediate:true})

    const modalWrapper = ref<CvModal|null>(null)
    const primaryClickTimestamp = ref(new Date().valueOf())
    const modalfix = useShadowDomFixedHeightOffset(context)
    function handleShow () {
      context.emit('modal-shown')
      modalfix.setModalOffset()

    }
    function handleSubmit () {
      context.emit('upload:submitted')
      context.emit('form:success')
      /**
       * child component has watcher on primaryClickTimestamp, when
       * changes, submits form.
       */
      internalVisible.value=false;
      primaryClickTimestamp.value = Date.now()
    }
    function handleCancel () {
      context.emit('upload:cancelled')
      context.emit('form:cancelled')
      internalVisible.value=false;
    }



    return ({
      handleCancel,
      handleShow,
      handleSubmit,
      modalWrapper,
      internalVisible,
      primaryClickTimestamp,
      ...modalfix
    })
  }

})
</script>
