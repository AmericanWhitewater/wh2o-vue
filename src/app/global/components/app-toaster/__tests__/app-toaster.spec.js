import { createWrapper } from '@/utils'
import AppToaster from '../app-toaster.vue'

const mockStore = {
  state: {
    appGlobalState: {
      appGlobalData: {
        updateAvailable: false,
        toasts: []
      }
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  }
}

global.navigator.serviceWorker = {}
global.navigator.serviceWorker.addEventListener = jest.fn()

describe('app-toaster.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(AppToaster, options)

    expect(wrapper.find('.app-toaster').exists()).toBe(true)
  })
})
