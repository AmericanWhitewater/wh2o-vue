import AccidentsTab from '@/app/views/river-detail/components/accidents-tab.vue'
import { createWrapper } from '@/utils'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockStore = {
  state: {
    RiverAccidents: {
      error: null,
      data: null,
      loading: null
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
    mockStore.state.RiverAccidents.loading = true
    const wrapper = createWrapper(AccidentsTab, options)


    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.RiverAccidents.loading = false
    mockStore.state.RiverAccidents.error = true
    const wrapper = createWrapper(AccidentsTab, options)


    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
