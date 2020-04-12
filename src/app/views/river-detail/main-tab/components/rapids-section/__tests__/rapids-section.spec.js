import RapidsSection from '../rapids-section.vue'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
    riverDetailState: {
      rapidsData: {
        error: null,
        data: null,
        loading: null
      }
    }
  }
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('RapidsSection', () => {
  it('shows loading block when loading', () => {
    mockStore.state.riverDetailState.rapidsData.loading = true
    const wrapper = createWrapper(RapidsSection, options)

    // expect(wrapper.find('.comments-section')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.riverDetailState.rapidsData.loading = false
    mockStore.state.riverDetailState.rapidsData.error = true
    const wrapper = createWrapper(RapidsSection, options)

    // expect(wrapper.find('.comments-section')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
