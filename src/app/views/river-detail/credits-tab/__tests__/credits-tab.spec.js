import CreditsTab from '@/app/views/river-detail/credits-tab/credits-tab.vue'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
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
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('CreditsTab', () => {
  it('shows loading block when loading', () => {
    mockStore.state.riverDetailState.creditsData.loading = true
    const wrapper = createWrapper(CreditsTab, options)

    expect(wrapper.find('.credits-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.riverDetailState.creditsData.loading = false
    mockStore.state.riverDetailState.creditsData.error = true
    const wrapper = createWrapper(CreditsTab, options)

    expect(wrapper.find('.credits-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
