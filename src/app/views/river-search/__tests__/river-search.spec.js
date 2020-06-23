import RiverSearch from '../river-search.vue'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    riverSearchState: {
      riverSearchData: {
        error: null,
        data: null,
        loading: null,
        searchTerm: null
      }
    }
  }
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('RiverSearch', () => {
  it('shows loading block when loading', () => {
    mockStore.state.riverSearchState.riverSearchData.loading = true

    const wrapper = createWrapper(RiverSearch, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.riverSearchState.riverSearchData.loading = false

    mockStore.state.riverSearchState.riverSearchData.error = true

    const wrapper = createWrapper(RiverSearch, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
