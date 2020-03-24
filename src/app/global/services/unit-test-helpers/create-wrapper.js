
import { createLocalVue, mount } from '@vue/test-utils'
import { Layout } from '@/app/global/layout'
import { LayoutTwoThirds, LayoutFullWidth, LayoutFiftyFifty } from '@/app/global/layout/layouts'
import CarbonComponents from '@carbon/vue'

const localVue = createLocalVue()

localVue.use(CarbonComponents)

const test = () => {
  return 'test'
}
localVue.directive('view', test)
/**
 *
 * @param {object} component vue component to be tested
 * @param {object} stateConfig test suite local state mock
 * @param {object} routeConfig test suite local route mock.
 *
 */
const createWrapper = (component, stateConfig = {}, routeConfig = {}) => {
  const wrapper = mount(component, ({
    localVue,
    mocks: {
      $store: {
        state: {
          ...stateConfig
        },
        dispatch: jest.fn()
      },
      $route: {
        params: {
          ...routeConfig.params
        }
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
