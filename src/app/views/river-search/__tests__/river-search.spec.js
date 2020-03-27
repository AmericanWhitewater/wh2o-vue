import RiverSearch from '../river-search.vue'
import { createWrapper } from '@/app/global/services'

const state = {
  riverSearchState: {
    riverSearchData: {
      error: null,
      data: null,
      loading: null,
      searchTerm: null
    }
  }
}

describe('RiverSearch', () => {
  it('shows loading block when loading', () => {
    state.riverSearchState.riverSearchData.loading = true

    const wrapper = createWrapper(RiverSearch, state, {})

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    state.riverSearchState.riverSearchData.loading = false

    state.riverSearchState.riverSearchData.error = true

    const wrapper = createWrapper(RiverSearch, state, {})

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
