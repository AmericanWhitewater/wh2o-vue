
// import { createLocalVue, mount } from '@vue/test-utils'
import { Layout } from '@/app/global/layout'
import { LayoutTwoThirds, LayoutFullWidth, LayoutFiftyFifty } from '@/app/global/layout/layouts'

// /**
//  *
//  * factory func for fresh unit tests
//  * @param {object} component vue component to test
//  * @param {object} storeState per test vuex state config
//  * @param {object} routerRoutes per test route config
//  * @param {object} options any additional options the test may need
//  *
//  */

// const createWrapper = (component, storeState = {}, routerRoutes = [], options = {}) => {
//   const localVue = createLocalVue()

//   localVue.use(Vuex)
//   localVue.use(CarbonComponents)
//   localVue.directive('view', view)

//   const store = createStore(storeState)
//   const router = createRouter(routerRoutes)

//   return mount(component, {
//     store,
//     router,
//     localVue,
//     stubs: {
//       Layout,
//       LayoutTwoThirds,
//       LayoutFullWidth,
//       LayoutFiftyFifty
//     },
//     ...options
//   })
// }
// export { createWrapper }

import { createLocalVue, mount } from '@vue/test-utils'
import CarbonComponents from '@carbon/vue'
// import CarbonComponents from '@carbon/vue'
// import VueRouter from 'vue-router'
// import Vuex from 'vuex'

// /**
//  *
//  * @param {array} localRoutes routes required by test
//  * @returns fresh vue router instance
//  *
//  */
// const createRouter = (localRoutes = []) => {
//   let routes = []

//   const localRoutesProvided = localRoutes.length > 0

//   if (localRoutesProvided) {
//     routes = localRoutes
//   }

//   return new VueRouter({
//     routes
//   })
// }

// /**
//  *
//  * @param {objest} initialState starting state for test suite
//  * @returns fresh vuex store instance
//  *
//  */
// const createStore = (initialState = {}) => new Vuex.Store({
//   state: {
//     ...initialState
//   }
// })

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
 * @param {object} stateConfig per test vuex state config
 * @param {object} routeConfig per test route config
 *
 * @todo add stubs as an argument
 *
 */
const createWrapper = (component, options = {}) => {
  const localVue = createLocalVue()
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
