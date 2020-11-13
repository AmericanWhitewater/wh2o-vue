import { createWrapper } from '@/utils'
import MapTab from '../map-tab.vue'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockStore = {

  state: {
    RiverMap: {
      loading: false,
      error: false,
      data: null
    },
    RiverDetail: {
      loading: false,
      error: false,
      data: null
    },
    RiverRapids: {
      data: null,
      loading: false,
      error: false
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
  },
  stubs: { NwiMap: true }
}

describe('map-tab.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('exists', () => {
    const wrapper = createWrapper(MapTab, options)

    expect(wrapper.find('#map-tab').exists()).toBe(true)
  })
})
