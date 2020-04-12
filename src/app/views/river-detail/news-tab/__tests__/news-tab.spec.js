import NewsTab from '@/app/views/river-detail/news-tab/news-tab.vue'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
    userState: {
      userData: {
        data: null
      }
    },
    riverDetailState: {
      newsTabData: {
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

describe('NewsTab', () => {
  it('shows loading block when articles loading', () => {
    mockStore.state.riverDetailState.newsTabData.loading = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.news-tab')).toMatchSnapshot()
    expect(wrapper.find('.articles-loading').exists()).toBe(true)
    expect(wrapper.find('.articles-error').exists()).toBe(false)
  })

  it('shows error block when articles failed to load', () => {
    mockStore.state.riverDetailState.newsTabData.loading = false
    mockStore.state.riverDetailState.newsTabData.error = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.news-tab')).toMatchSnapshot()

    expect(wrapper.find('.articles-loading').exists()).toBe(false)
    expect(wrapper.find('.articles-error').exists()).toBe(true)
  })
  it('shows loading block when alerts loading', () => {
    mockStore.state.riverDetailState.alertsData.loading = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.news-tab')).toMatchSnapshot()
    expect(wrapper.find('.alerts-loading').exists()).toBe(true)
    expect(wrapper.find('.alerts-error').exists()).toBe(false)
  })

  it('shows error block when alerts failed to load', () => {
    mockStore.state.riverDetailState.alertsData.loading = false
    mockStore.state.riverDetailState.alertsData.error = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.news-tab')).toMatchSnapshot()

    expect(wrapper.find('.alerts-loading').exists()).toBe(false)
    expect(wrapper.find('.alerts-error').exists()).toBe(true)
  })
})
