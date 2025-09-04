import NewsTab from '@/app/views/river-detail/components/news-tab/news-tab.vue'
import { createWrapper } from '@/utils'

jest.mock('maplibre-gl/dist/maplibre-gl', () => ({
  Map: () => ({})
}))

const riverId = '123456789'
const wpID = '1234'

const mockStore = {
  state: {
    User: {
      data: null
    },
    RiverArticles: {
      error: null,
      data: null,
      loading: null
    },
    RiverAlerts: {
      error: null,
      data: null,
      loading: null
    },
    RiverEvents: {
      error: null,
      data: null,
      loading: null
    },
    RiverDocuments: {
      data: [],
      loading: null
    },
    RiverDetail: {
      data: {
        wpID: wpID
      }
    },
    Global: {
      editMode: false
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $randomId: jest.fn(() => '123'),
    $titleCase: jest.fn(),
    $store: mockStore,
    $route: {
      params: {
        id: riverId
      }
    },
    stubs: {
      ArticleCard: "<div class='stub'></div>",
      DocumentsInNewsTab: "<div class='stub'></div>"
    }
  }
}

describe('NewsTab', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading block when articles loading', () => {
    mockStore.state.RiverArticles.loading = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.articles-loading').exists()).toBe(true)
    expect(wrapper.find('.articles-empty').exists()).toBe(false)
  })

  it('shows empty block when no articles available', () => {
    mockStore.state.RiverArticles.loading = false
    mockStore.state.RiverArticles.error = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.articles-loading').exists()).toBe(false)
    expect(wrapper.find('.articles-empty').exists()).toBe(true)
  })
  it('shows loading block when alerts loading', () => {
    mockStore.state.RiverAlerts.loading = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.alerts-loading').exists()).toBe(true)
    expect(wrapper.find('.alerts-empty').exists()).toBe(false)
  })

  it('shows empty block when no alerts available', () => {
    mockStore.state.RiverAlerts.loading = false
    mockStore.state.RiverAlerts.error = true
    const wrapper = createWrapper(NewsTab, options)

    expect(wrapper.find('.alerts-loading').exists()).toBe(false)
    expect(wrapper.find('.alerts-empty').exists()).toBe(true)
  })

  it('it loads articles, alerts, docs when not previously loaded', async () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(NewsTab, options)

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      'RiverArticles/getProperty', wpID
    )
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      'RiverDocuments/getProperty', wpID
    )
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      'RiverAlerts/getProperty', riverId
    )
    expect(mockStore.dispatch).toHaveBeenCalledTimes(3)
  })

})
