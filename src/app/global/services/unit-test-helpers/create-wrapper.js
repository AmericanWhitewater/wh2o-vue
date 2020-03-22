
import { createLocalVue, mount } from '@vue/test-utils'
import { Layout } from '@/app/global/layout'
import { LayoutTwoThirds, LayoutFullWidth, LayoutFiftyFifty } from '@/app/global/layout/layouts'
import CarbonComponents from '@carbon/vue'

const localVue = createLocalVue()

localVue.use(CarbonComponents)

const createWrapper = (component, stateConfig = {}, routeConfig = {}, localStub) => {
  const wrapper = mount(component, ({
    localVue,
    mocks: {
      $store: {
        state: {
          ...stateConfig
        }
      },
      $route: {
        ...routeConfig
      }
    },
    stubs: {
      Layout,
      LayoutTwoThirds,
      LayoutFullWidth,
      LayoutFiftyFifty
    }
  }))
  return wrapper
}

export { createWrapper }
