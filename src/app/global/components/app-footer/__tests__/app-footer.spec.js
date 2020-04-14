import AppFooter from '../app-footer'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {},
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
  it('it is a vue instance', () => {
    const wrapper = createWrapper(AppFooter, options)

    expect(wrapper.isVueInstance()).toBe(true)
  })
})
