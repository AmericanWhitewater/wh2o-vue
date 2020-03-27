import CreditsTab from '@/app/views/river-detail/credits-tab/credits-tab.vue'
import { createWrapper } from '@/app/global/services'

const state = {
  userState: {
    userData: {
      data: null
    }
  },
  riverDetailState: {
    creditsData: {
      error: null,
      data: null,
      loading: null
    }
  }
}

describe('CreditsTab', () => {
  it('shows loading block when loading', () => {
    state.riverDetailState.creditsData.loading = true
    const wrapper = createWrapper(CreditsTab, state, {})

    expect(wrapper.find('.credits-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    state.riverDetailState.creditsData.loading = false
    state.riverDetailState.creditsData.error = true
    const wrapper = createWrapper(CreditsTab, state, {})

    expect(wrapper.find('.credits-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
