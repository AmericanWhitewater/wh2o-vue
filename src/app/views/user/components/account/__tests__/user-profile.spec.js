import UserProfile from '../user-profile.vue'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
    userState: {
      userData: {
        error: null,
        data: null,
        loading: null
      }
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
    mockStore.state.userState.userData.loading = true
    const wrapper = createWrapper(UserProfile, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.userState.userData.loading = false
    mockStore.state.userState.userData.error = true
    const wrapper = createWrapper(UserProfile, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
