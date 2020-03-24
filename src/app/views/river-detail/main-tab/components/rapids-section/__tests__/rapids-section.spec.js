import RapidsSection from '../rapids-section.vue'
import { createWrapper } from '@/app/global/services'

const state = {
  riverDetailState: {
    rapidsData: {
      error: null,
      data: null,
      loading: null
    }
  }
}

describe('RapidsSection', () => {
  it('shows loading block when loading', () => {
    state.riverDetailState.rapidsData.loading = true
    const wrapper = createWrapper(RapidsSection, state, {})

    // expect(wrapper.find('.comments-section')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    state.riverDetailState.rapidsData.loading = false
    state.riverDetailState.rapidsData.error = true
    const wrapper = createWrapper(RapidsSection, state, {})

    // expect(wrapper.find('.comments-section')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
