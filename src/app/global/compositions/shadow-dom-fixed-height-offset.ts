import { ref, SetupContext } from '@vue/composition-api'
import Vue from 'vue/types/umd'
import { shadowDomFixedHeightOffsetFunc } from '../mixins/shadow-dom-fixed-height-offset'

export function useShadowDomFixedHeightOffset (context: SetupContext) {
  const modalWrapper = ref<Vue|null>(null)
  return ({
    setModalOffset: () => {
      context.root.$nextTick(() => {
        (modalWrapper.value?.$el as HTMLElement).setAttribute('style', shadowDomFixedHeightOffsetFunc())
      })
    },
    modalWrapper

  })
}
