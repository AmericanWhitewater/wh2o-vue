import RecentAlerts from '../recent-alerts.vue'
import { createWrapper } from '@/utils'

const mockStore = {
  dispatch: jest.fn(),
  state: {
    RiverAlerts: {
      data: null,
      loading: null
    },
    RiverArticles: {
      data: null
    },
    RiverProjects: {
      data: null,
      loading: null
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
      'RiverAlerts/getProperty', riverId
    )

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2,
      'RiverArticles/getProperty', riverId
    )
  })
})
