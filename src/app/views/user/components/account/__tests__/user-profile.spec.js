import UserProfile from '../user-profile.vue'
import { createWrapper } from '@/app/global/services'

const state = {
  userState: {
    userData: {
      error: null,
      data: null,
      loading: null
    }
  }
}

describe('user-profile.vue', () => {
  it('shows loading block when loading', () => {
    state.userState.userData.loading = true
    const wrapper = createWrapper(UserProfile, state, {})

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    state.userState.userData.loading = false
    state.userState.userData.error = true
    const wrapper = createWrapper(UserProfile, state, {})

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
