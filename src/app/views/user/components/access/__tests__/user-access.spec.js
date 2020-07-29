import { createWrapper } from '@/utils'
import UserAccess from '../user-access.vue'

const mockRoute = {
  name: 'user-login'
}

const options = {
  mocks: {
    $route: mockRoute
  },
  stubs: ['router-link', 'router-view']
}

describe('user-access.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(UserAccess, options)

    expect(wrapper.find('.user-access').exists()).toBe(true)
  })
})
