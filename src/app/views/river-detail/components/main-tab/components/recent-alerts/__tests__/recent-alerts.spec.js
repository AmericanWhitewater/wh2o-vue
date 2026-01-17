import RecentAlerts from '../recent-alerts.vue'
import { createWrapper } from '@/utils'

const riverId = '123'
const wpID = '234'

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
    },
    RiverDocuments: {
      data: [],
      loading: null
    },
    RiverDetail: {
      data: {
        wpID: wpID
      }
    }
  }
}

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
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(RecentAlerts, options)

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      'RiverAlerts/getProperty', riverId
    )

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2,
      'RiverArticles/getProperty', wpID
    )
  })
})
