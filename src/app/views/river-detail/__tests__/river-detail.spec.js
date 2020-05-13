import { createWrapper } from '@/utils'
import RiverDetail from '../river-detail.vue'

const mockRoute = {
  params: {
    id: '123'
  }
}

const mockRouter = {
  replace: jest.fn(() => { }),
  beforeEach: jest.fn()
}

const mockStore = {
  state: {
    riverDetailState: {
      riverDetailData: {
        data: null,
        error: false,
        loading: false
      },
      alertsData: {
        data: null
      }
    },
    appGlobalState: {
      appGlobalData: {
        editMode: false
      }
    },
    userState: {
      userData: {
        data: null
      }
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore,
    $router: mockRouter,
    $route: mockRoute
  },
  stubs: ['router-view']
}

describe('river-detail.vue', () => {
  it('loads data on initial load', () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(RiverDetail, options)

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, '[RIVER_DETAIL] FETCH_RIVER_DETAIL_DATA', '123')
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, '[REACH_GAGES] FETCH_GAGES', '123')
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(3, '[ALERTS] FETCH_ALERTS_DATA', '123')
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(4, '[GAGE_METRICS] FETCH_GAGE_METRICS', '123')
  })
})
