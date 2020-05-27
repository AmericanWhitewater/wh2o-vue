import AccidentsTab from '@/app/views/river-detail/accidents-tab/accidents-tab.vue'
import { createWrapper } from '@/utils'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockStore = {
  state: {
    riverDetailState: {
      accidentsData: {
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
    $store: mockStore,
    $route: {
      params: {
        id: '123456789'
      }
    }
  }
}

describe('AccidentsTab', () => {
  it('shows loading block when loading', () => {
    mockStore.state.riverDetailState.accidentsData.loading = true
    const wrapper = createWrapper(AccidentsTab, options)

    expect(wrapper.find('.accidents-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.riverDetailState.accidentsData.loading = false
    mockStore.state.riverDetailState.accidentsData.error = true
    const wrapper = createWrapper(AccidentsTab, options)

    expect(wrapper.find('.accidents-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
