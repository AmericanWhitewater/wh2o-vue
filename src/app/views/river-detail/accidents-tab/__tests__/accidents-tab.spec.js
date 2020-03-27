import AccidentsTab from '@/app/views/river-detail/accidents-tab/accidents-tab.vue'
import { createWrapper } from '@/app/global/services'

const state = {
  riverDetailState: {
    accidentsData: {
      error: null,
      data: null,
      loading: null
    }
  }
}

const options = {
  mocks: {
    $route: {
      params: {
        id: '123456789'
      }
    }
  }
}

describe('AccidentsTab', () => {
  it('shows loading block when loading', () => {
    state.riverDetailState.accidentsData.loading = true
    const wrapper = createWrapper(AccidentsTab, state, [], options)

    expect(wrapper.find('.accidents-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    state.riverDetailState.accidentsData.loading = false
    state.riverDetailState.accidentsData.error = true
    const wrapper = createWrapper(AccidentsTab, state, [], options)

    expect(wrapper.find('.accidents-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
