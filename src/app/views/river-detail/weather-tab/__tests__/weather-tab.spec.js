import WeatherTab from '@/app/views/river-detail/weather-tab/weather-tab.vue'
import { createWrapper } from '@/app/global/services'

const state = {
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
}

describe('FlowTab', () => {
  it('shows loading block when loading', () => {
    state.riverDetailState.weatherData.loading = true
    const wrapper = createWrapper(WeatherTab, state, {})

    wrapper.setData({
      fetchConfig: {
        lat: null,
        lon: null
      }
    })

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    state.riverDetailState.weatherData.loading = false
    state.riverDetailState.weatherData.error = true
    const wrapper = createWrapper(WeatherTab, state, {})

    wrapper.setData({
      fetchConfig: {
        lat: null,
        lon: null
      }
    })

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
