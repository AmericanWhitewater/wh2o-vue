import { createWrapper } from '@/utils'
import GageDetail from '../gage-detail'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockRoute = {
  params: {
    gageId: '123'
  }
}

const mockStore = {
  state: {
    gageDetailState: {
      gageDetailData: {
        data: null,
        loading: null,
        error: null
      }
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore,
    $route: mockRoute
  }
}

describe('gage-detail.vue', () => {
  it('created: loads data', async () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(GageDetail, options)

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[GAGE_DETAIL] FETCH_GAGE_DATA', '123'
    )
  })
})
