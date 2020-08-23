import { Layout } from '@/app/global/layout'
import { LayoutTwoThirds, LayoutFullWidth, LayoutFiftyFifty } from '@/app/global/layout/layouts'
import { createLocalVue, mount } from '@vue/test-utils'
import CarbonComponents from '@carbon/vue'
import { formatDate, assetUrl } from '@/app/global/mixins'

/**
 * use this to mock the view directive
 * @todo only add to localVue where needed.
 */
const view = () => {
  return 'view'
}

/**
 * factory func for fresh unit tests
 * @param {object} component vue component to test
 * @param {object} options per test config
 *
 */
const createWrapper = (component, options = {}) => {
  const localVue = createLocalVue()
  localVue.mixin(formatDate)
  localVue.mixin(assetUrl)
  localVue.use(CarbonComponents)
  localVue.directive('view', view)

  const wrapper = mount(component, ({
    localVue,
    stubs: {
      Layout,
      LayoutTwoThirds,
      LayoutFullWidth,
      LayoutFiftyFifty
    },
    ...options
  }))
  return wrapper
}

export { createWrapper }
