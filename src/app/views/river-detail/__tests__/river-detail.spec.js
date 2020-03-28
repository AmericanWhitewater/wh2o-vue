import { createWrapper } from '@/app/global/services'
import RiverDetail from '../river-detail.vue'

const state = {
  riverDetailState: {
    riverDetailData: {
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

describe('river-detail.vue', () => {
  it('shows loading overlay when loading', () => {
    state.riverDetailState.riverDetailData.loading = true
    const wrapper = createWrapper(RiverDetail, state, [], options)
    expect(wrapper.find('.bx--loading-overlay').exists()).toBe(true)
    expect(wrapper.find('.river-detail-content').exists()).toBe(false)
  })
})
