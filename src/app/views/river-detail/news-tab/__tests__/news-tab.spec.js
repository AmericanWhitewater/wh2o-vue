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

const riverId = '123456789'

const options = {
  mocks: {
    $titleCase: jest.fn(),
    $store: mockStore,
    $route: {
      params: {
        id: riverId
      }
    },
    stubs: ['ArrowRight20', 'ArrowRight20', 'ArticleCard']
  }
}

describe('NewsTab', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading block when articles loading', () => {
    mockStore.state.riverDetailState.newsTabData.loading = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.articles-loading').exists()).toBe(true)
    expect(wrapper.find('.articles-empty').exists()).toBe(false)
    expect(wrapper.find('.news-tab')).toMatchSnapshot()
  })

  it('shows empty block when no articles available', () => {
    mockStore.state.riverDetailState.newsTabData.loading = false
    mockStore.state.riverDetailState.newsTabData.error = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.articles-loading').exists()).toBe(false)
    expect(wrapper.find('.articles-empty').exists()).toBe(true)
    expect(wrapper.find('.news-tab')).toMatchSnapshot()
  })
  it('shows loading block when alerts loading', () => {
    mockStore.state.riverDetailState.alertsData.loading = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.alerts-loading').exists()).toBe(true)
    expect(wrapper.find('.alerts-empty').exists()).toBe(false)
    expect(wrapper.find('.news-tab')).toMatchSnapshot()
  })

  it('shows empty block when no alerts available', () => {
    mockStore.state.riverDetailState.alertsData.loading = false
    mockStore.state.riverDetailState.alertsData.error = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.alerts-loading').exists()).toBe(false)
    expect(wrapper.find('.alerts-empty').exists()).toBe(true)
    expect(wrapper.find('.news-tab')).toMatchSnapshot()
  })

  it('it loads artles and alerts when not previously loaded', async () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(NewsTab, options)

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[NEWS] FETCH_NEWS_TAB_DATA', riverId
    )
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2,
      '[ALERTS] FETCH_ALERTS_DATA', riverId
    )

    expect(mockStore.dispatch).toHaveBeenCalledTimes(2)
  })

  it('doesnt attempt to load alerts and articles when previously loaded', async () => {
    mockStore.state.riverDetailState.alertsData.data = [{ alert: 'look out' }]
    mockStore.state.riverDetailState.newsTabData.data = [{ article: 'Cool story, Hansel.' }]
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(NewsTab, options)
    expect(mockStore.dispatch).toHaveBeenCalledTimes(0)
  })
})
