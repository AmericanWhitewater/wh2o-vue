import UserProfile from '../user-profile.vue'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    User: {
      error: null,
      data: null,
      loading: null
    }
  }
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('user-profile.vue', () => {
  it('shows loading block when loading', () => {
    mockStore.state.User.loading = true
    const wrapper = createWrapper(UserProfile, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.User.loading = false
    mockStore.state.User.error = true
    const wrapper = createWrapper(UserProfile, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
