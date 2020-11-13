import GageChartControls from '../components/gage-chart-controls.vue'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    GageReadings: {
      data: null,
      error: false,
      loading: false
    },
    GageMetrics: {
      data: null
    },
    RiverDetail: {
      data: null
    },
    RiverGages: {
      data: null
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

describe('gage-chart-controls.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(GageChartControls, options)

    expect(wrapper.find('.gage-chart-controls').exists()).toBe(true)
  })
})
