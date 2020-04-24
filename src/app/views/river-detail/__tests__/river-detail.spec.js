import { createWrapper } from '@/utils'
import RiverDetail from '../river-detail.vue'

const mockRouter = {
  beforeEach: jest.fn()
}

const mockStore = {
  state: {
    riverDetailState: {
      riverDetailData: {
        error: null,
        data: null,
        loading: null
      },
      alertsData: {
        error: null,
        data: null,
        loading: null
      }
    }
  },
  dispatch: jest.fn()
}

const riverId = '1'

const options = {
  mocks: {
    $router: mockRouter,
    $store: mockStore,
    $route: {
      params: {
        id: riverId
      }
    }
  }
}

describe('river-detail.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('is a vue component', () => {
    const wrapper = createWrapper(RiverDetail, options)

    expect(wrapper.isVueInstance()).toBe(true)
  })
  // it('shows loading overlay when loading', () => {
  //   mockStore.state.riverDetailState.riverDetailData.loading = true
  //   const wrapper = createWrapper(RiverDetail, options)
  //   expect(wrapper.find('.bx--loading-overlay').exists()).toBe(true)
  //   expect(wrapper.find('.river-detail-content').exists()).toBe(false)
  // })

  // it('fetches river detail data and loads gages on created hook', () => {
  //   // eslint-disable-next-line no-unused-vars
  //   const wrapper = createWrapper(RiverDetail, options)

  //   expect(mockStore.dispatch).toBeCalledTimes(2)

  //   expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
  //     '[RIVER_DETAIL] FETCH_RIVER_DETAIL_DATA', riverId
  //   )
  //   expect(mockStore.dispatch).toHaveBeenNthCalledWith(2,
  //     '[REACH_GAGES] FETCH_GAGES', riverId
  //   )
  // })

  // it('fetches river detail data and loads gages on when active river changes', async () => {
  //   const wrapper = createWrapper(RiverDetail, options)

  //   expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
  //     '[RIVER_DETAIL] FETCH_RIVER_DETAIL_DATA', '1'
  //   )
  //   expect(mockStore.dispatch).toHaveBeenNthCalledWith(2,
  //     '[REACH_GAGES] FETCH_GAGES', '1'
  //   )

  //   options.mocks.$route.params.id = '2'

  //   await wrapper.vm.$nextTick()

  //   expect(mockStore.dispatch).toHaveBeenNthCalledWith(3,
  //     '[RIVER_DETAIL] FETCH_RIVER_DETAIL_DATA', '2'
  //   )
  //   expect(mockStore.dispatch).toHaveBeenNthCalledWith(4,
  //     '[REACH_GAGES] FETCH_GAGES', '2'
  //   )
  // })
})
