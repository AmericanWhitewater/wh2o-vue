import { createWrapper } from '@/utils'
import MapTab from '../map-tab.vue'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockStore = {

  state: {
    riverDetailState: {
      mapData: {
        loading: false,
        error: false,
        data: null
      },
      riverDetailData: {
        loading: false,
        error: false,
        data: null
      }
    }
  },
  dispatch: jest.fn()
}

const mockRoute = {
  params: {
    id: '123'
  }
}

const options = {
  mocks: {
    $store: mockStore,
    $route: mockRoute
  }

}

describe('map-tab.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(MapTab, options)

    expect(wrapper.find('#map-tab').exists()).toBe(true)
  })
})
