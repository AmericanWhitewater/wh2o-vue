import { createWrapper } from '@/utils'
import UserAccount from '../user-account.vue'

const mockStore = {
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('user-account.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(UserAccount, options)

    expect(wrapper.find('.user-account').exists()).toBe(true)
  })
})
