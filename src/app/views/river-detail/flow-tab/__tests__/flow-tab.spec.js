import FlowTab from '@/app/views/river-detail/flow-tab/flow-tab.vue'
import { createWrapper } from '@/app/global/services'

const state = {
  userState: {
    userData: {
      data: null
    }
  },
  riverDetailState: {
    gageReadingsData: {
      error: null,
      data: null,
      loading: null
    },
    reachGagesData: {
      data: null
    }
  }
}

describe('FlowTab', () => {
  it('shows loading block when loading', () => {
    state.riverDetailState.gageReadingsData.loading = true
    const wrapper = createWrapper(FlowTab, state, {})
    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    state.riverDetailState.gageReadingsData.loading = false
    state.riverDetailState.gageReadingsData.error = true
    const wrapper = createWrapper(FlowTab, state, {})
    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
