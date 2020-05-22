import { createWrapper } from '@/utils'
import UserLogout from '../user-logout.vue'

const mockStore = {
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  }

}

describe('user-logout.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(UserLogout, options)

    expect(wrapper.find('.user-logout').exists()).toBe(true)
  })
})
