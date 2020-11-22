import { createWrapper } from '@/utils'
import UserGages from '../user-gages.vue'

const mockStore = {
  state: {
    User: {
      data: null
    }
  }

}

const options = {
  mocks: {
    $store: mockStore
  }

}

describe('user-gages.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(UserGages, options)

    expect(wrapper.find('.user-gages').exists()).toBe(true)
  })
})
