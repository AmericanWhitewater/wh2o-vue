import RecentAlerts from '../recent-alerts.vue'
import { createWrapper } from '@/utils'

const mockStore = {
  dispatch: jest.fn(),
  state: {
    riverDetailState: {
      alertsData: {
        data: null,
        loading: null
      },
      newsTabData: {
        data: null
      }
    }
  }
}

const riverId = '123'

const mockRoute = {
  params: {
    id: riverId
  }
}

const options = {
  mocks: {
    $store: mockStore,
    $route: mockRoute
  },
  stubs: ['SidebarAlerts', 'SidebarArticles']
}

describe('RecentAlerts.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
    * @note this method is called when the sidebar enters the
    * viewport. call manually.
    * @todo simulate scroll
  */

  it('loads alerts and news articles in viewport', () => {
    const wrapper = createWrapper(RecentAlerts, options)

    wrapper.vm.loadData()

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[ALERTS] FETCH_ALERTS_DATA', riverId
    )

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2,
      '[NEWS] FETCH_NEWS_TAB_DATA', riverId
    )
  })
})
