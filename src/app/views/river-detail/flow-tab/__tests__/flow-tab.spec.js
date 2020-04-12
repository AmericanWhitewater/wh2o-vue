import FlowTab from '@/app/views/river-detail/flow-tab/flow-tab.vue'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
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
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('FlowTab', () => {
  it('shows loading block when loading', () => {
    mockStore.state.riverDetailState.gageReadingsData.loading = true
    const wrapper = createWrapper(FlowTab, options)

    expect(wrapper.find('.flow-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.riverDetailState.gageReadingsData.loading = false
    mockStore.state.riverDetailState.gageReadingsData.error = true
    const wrapper = createWrapper(FlowTab, options)

    expect(wrapper.find('.flow-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
