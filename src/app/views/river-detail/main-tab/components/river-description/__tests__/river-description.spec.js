import RiverDescription from '../river-description.vue'
import { createWrapper } from '@/app/global/services'

const state = {
  riverDetailState: {
    riverDetailData: {
      error: null,
      data: null,
      loading: null
    }
  },
  appGlobalState: {
    appGlobalData: {
      data: null,
      error: null,
      editMode: null,
      loading: null
    }
  }
}

describe('RiverDescription', () => {
  it('shows skeleton text when loading', () => {
    state.riverDetailState.riverDetailData.loading = true

    const wrapper = createWrapper(RiverDescription, state, {})
    expect(wrapper.find('.cv-skeleton-text').exists()).toBe(true)
  })

  it('shows skeleton text when error', () => {
    state.riverDetailState.riverDetailData.loading = false
    state.riverDetailState.riverDetailData.error = true
    const wrapper = createWrapper(RiverDescription, state, {})
    expect(wrapper.find('.cv-skeleton-text').exists()).toBe(true)
  })

  test.todo('removes inline css and class tags from ugc. standardizes html.')
})
