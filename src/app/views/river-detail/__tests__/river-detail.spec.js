import { createWrapper } from '@/app/global/services'
import RiverDetail from '../river-detail.vue'

const mockStore = {
  state: {
    riverDetailState: {
      riverDetailData: {
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

describe('river-detail.vue', () => {
  it('shows loading overlay when loading', () => {
    mockStore.state.riverDetailState.riverDetailData.loading = true
    const wrapper = createWrapper(RiverDetail, options)
    expect(wrapper.find('.bx--loading-overlay').exists()).toBe(true)
    expect(wrapper.find('.river-detail-content').exists()).toBe(false)
  })
})
