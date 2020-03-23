import BetaBox from '@/app/views/river-detail/main-tab/components/beta-box/beta-box'
import { createWrapper } from '@/app/global/services'

const state = {
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

describe('FlowTab', () => {
  it('shows loading block when loading', () => {
    state.riverDetailState.riverDetailData.loading = true
    const wrapper = createWrapper(BetaBox, state, {})

    expect(wrapper.find('#utility-block').exists()).toBe(true)
    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    state.riverDetailState.riverDetailData.loading = false
    state.riverDetailState.riverDetailData.error = true
    const wrapper = createWrapper(BetaBox, state, {})
    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
