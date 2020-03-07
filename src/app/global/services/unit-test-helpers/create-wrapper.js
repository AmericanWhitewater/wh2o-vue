
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { Layout } from '@/app/global/layout'
import { LayoutTwoThirds, LayoutFullWidth, LayoutFiftyFifty } from '@/app/global/layout/layouts'
import { LoadingBlock, ErrorBlock } from '@/app/global/components'
import CarbonComponents from '@carbon/vue'
// import store from "@/app/app-state"
const localVue = createLocalVue()

localVue.use(CarbonComponents)

const createWrapper = (component, stateConfig = {}, routeConfig = {}) => {
  const wrapper = shallowMount(component, ({
    localVue,
    mocks: {
      $store: {
        state: Object.assign({}, stateConfig)
      },
      $route: Object.assign({}, routeConfig)
    },
    stubs: {
      Layout,
      LayoutTwoThirds,
      LayoutFullWidth,
      LayoutFiftyFifty,
      LoadingBlock,
      ErrorBlock
    }
  }))
  return wrapper
}

export { createWrapper }
