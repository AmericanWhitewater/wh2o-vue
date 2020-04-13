import SideBar from '../side-bar.vue'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
    riverDetailState: {
      alertsData: {
        data: null,
        error: null,
        loading: null
      },
      newsTabData: {
        data: null,
        error: null,
        loading: null
      },
      reachGagesData: {
        data: null,
        error: null,
        loading: null
      }
    },
    userState: {
      userData: {
        data: null,
        error: null,
        loading: null
      }
    }
  },
  dispatch: jest.fn()
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
  }
}

describe('SideBar.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
    * @note this method is called when the sidebar enters the
    * viewport. call manually.
    * @todo simulate scroll
  */

  it('loads alerts and news articles in viewport', () => {
    const wrapper = createWrapper(SideBar, options)

    wrapper.vm.loadData()

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[ALERTS] FETCH_ALERTS_DATA', riverId
    )

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2,
      '[NEWS] FETCH_NEWS_TAB_DATA', riverId
    )
  })
})
