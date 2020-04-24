import BetaBox from '@/app/views/river-detail/main-tab/components/beta-box/beta-box'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    riverDetailState: {
      riverDetailData: {
        error: null,
        data: null,
        loading: null
      },
      appGlobalData: {
        editMode: null
      },
      reachGagesData: {
        data: null
      }
    }
  }
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('FlowTab', () => {
  it('shows loading block when loading', () => {
    mockStore.state.riverDetailState.riverDetailData.loading = true
    const wrapper = createWrapper(BetaBox, options)

    expect(wrapper.find('.beta-box')).toMatchSnapshot()

    expect(wrapper.find('#utility-block').exists()).toBe(true)
    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.riverDetailState.riverDetailData.loading = false
    mockStore.state.riverDetailState.riverDetailData.error = true
    const wrapper = createWrapper(BetaBox, options)

    expect(wrapper.find('.beta-box')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
