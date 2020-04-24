import WeatherTab from '@/app/views/river-detail/weather-tab/weather-tab.vue'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    riverDetailState: {
      weatherData: {
        error: null,
        data: null,
        loading: null
      },
      riverDetailData: {
        data: {
          plat: 'lorem',
          plon: 'lorem'
        }
      }
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('FlowTab', () => {
  it('shows loading block when loading', async () => {
    mockStore.state.riverDetailState.weatherData.loading = true
    const wrapper = createWrapper(WeatherTab, options)

    wrapper.setData({
      fetchConfig: {
        lat: null,
        lon: null
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.weather-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', async () => {
    mockStore.state.riverDetailState.weatherData.loading = false
    mockStore.state.riverDetailState.weatherData.error = true
    const wrapper = createWrapper(WeatherTab, options)

    wrapper.setData({
      fetchConfig: {
        lat: null,
        lon: null
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.weather-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
