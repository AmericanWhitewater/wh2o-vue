import { createWrapper } from '@/utils'
import AppNavigation from '../app-navigation.vue'

//       return this.$store.state.appGlobalState.appGlobalData.offline

const mockStore = {
  state: {
    Global: {
      offline: false
    }
  }
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('app-navigation.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(AppNavigation, options)

    expect(wrapper.find('.app-navigation').exists()).toBe(true)
  })
})
