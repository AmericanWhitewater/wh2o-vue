import SideBar from '../side-bar.vue'
import { createWrapper } from '@/app/global/services'
import { CvModal } from '@carbon/vue'

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

  it('shows new alert modal when add alert button clicked', async () => {
    const wrapper = createWrapper(SideBar, options)

    wrapper.find('#new-alert').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#new-alert-modal').classes()).toContain('is-visible')
  })

  it('hides modal when cancel button clicked', async () => {
    const wrapper = createWrapper(SideBar, options)

    wrapper.setData({
      newAlertModalVisible: true
    })

    await wrapper.vm.$nextTick()

    wrapper.find(CvModal).vm.$emit('secondary-click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#new-alert-modal').classes()).not.toContain('is-visible')
  })

  it('hides modal when overlay clicked', async () => {
    const wrapper = createWrapper(SideBar, options)

    wrapper.setData({
      newAlertModalVisible: true
    })

    await wrapper.vm.$nextTick()

    wrapper.find(CvModal).vm.$emit('modal-hidden')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#new-alert-modal').classes()).not.toContain('is-visible')
  })

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

  it('shows empty state text when no alerts', () => {
    const wrapper = createWrapper(SideBar, options)

    expect(wrapper.findAll('p').at(0).text()).toEqual('There are no new alerts.')
    expect(wrapper.find('#cv-inline-loading--alerts').exists()).toBe(false)
  })

  it('shows spinner for alerts when loading', () => {
    mockStore.state.riverDetailState.alertsData.loading = true

    const wrapper = createWrapper(SideBar, options)

    expect(wrapper.find('#cv-inline-loading--alerts').exists()).toBe(true)
  })

  it('it shows no articles prompt when empty', () => {
    const wrapper = createWrapper(SideBar, options)

    expect(wrapper.findAll('p').at(1).text()).toEqual('No Articles. Click here to view Regional News.')
    expect(wrapper.find('#cv-inline-loading--articles').exists()).toBe(false)
  })

  it('shows loader when articles loading', () => {
    mockStore.state.riverDetailState.newsTabData.loading = true
    const wrapper = createWrapper(SideBar, options)

    expect(wrapper.find('#cv-inline-loading--articles').exists()).toBe(true)
  })
})
