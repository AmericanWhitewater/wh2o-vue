import AppFooter from '../app-footer'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    Global: {
      offline: false
    }
  },
  dispatch: jest.fn()
}

const mockRoute = {
  name: 'test',
  meta: {
    crumbLabel: 'Test'
  }
}

const options = {
  mocks: {
    $store: mockStore,
    $route: mockRoute
  }
}

describe('AppFooter', () => {
  it('exists', () => {
    const wrapper = createWrapper(AppFooter, options)

    expect(wrapper.find('.app-footer').exists()).toBe(true)
  })
})
