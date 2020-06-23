// import from "../"
import { createWrapper } from '@/utils'

const mockStore = {
  state: {},
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('Component', () => {
  it('it is a vue instance', () => {
    const wrapper = createWrapper('Component', options)

    expect(wrapper.isVueInstance()).toBe(true)
  })
})
