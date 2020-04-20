import SidebarAlerts from '../components/side-bar-alerts.vue'

import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
    riverDetailState: {
      alertsData: {
        data: null,
        error: null,
        loading: null
      },
      reachGagesData: {
        data: null
      }
    },
    userState: {
      userData: {
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
    $route: mockRoute,
    $titleCase: jest.fn()
  }
}

const alerts = [
  { id: 'bY_TrFERilHvbdE4N_-t1', title: 'This is a new alert', detail: 'Yo!!!', post_date: '2020-04-09 00:00:00', revision: 31782, post_type: 'WARNING', gauge: null, user: { uname: 'drewalth', uid: '153461', image: { uri: { thumb: '/resources/images/contacts/thumb/153461-1.jpg', medium: '/resources/images/contacts/medium/153461-1.jpg', big: '/resources/images/contacts/153461-1.jpg' } } } }
]

describe('SidebarAlerts.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows empty state text when no alerts', () => {
    const wrapper = createWrapper(SidebarAlerts, options)
    expect(wrapper.find('.bx--inline-loading').exists()).toBe(false)
    expect(wrapper.find('.no-alerts-msg').exists()).toBe(true)
  })

  it('shows spinner for alerts when loading', () => {
    mockStore.state.riverDetailState.alertsData.loading = true

    const wrapper = createWrapper(SidebarAlerts, options)

    expect(wrapper.find('.bx--inline-loading').exists()).toBe(true)
    expect(wrapper.find('.no-alerts-msg').exists()).toBe(false)
  })

  it('shows alerts and hides spinner and empty prompt', () => {
    mockStore.state.riverDetailState.alertsData.loading = false
    mockStore.state.riverDetailState.alertsData.data = alerts

    const wrapper = createWrapper(SidebarAlerts, options)

    expect(wrapper.find('.bx--inline-loading').exists()).toBe(false)
    expect(wrapper.find('.no-alerts-msg').exists()).toBe(false)
  })

  // it('shows new alert modal when add alert button clicked', async () => {
  //   const wrapper = createWrapper(SidebarAlerts, options)

  //   wrapper.find('#new-alert').trigger('click')

  //   await wrapper.vm.$nextTick()

  //   expect(wrapper.find('#new-alert-modal').classes()).toContain('is-visible')
  // })

  // it('hides modal when cancel button clicked', async () => {
  //   const wrapper = createWrapper(SidebarAlerts, options)

  //   wrapper.setData({
  //     newAlertModalVisible: true
  //   })

  //   await wrapper.vm.$nextTick()

  //   wrapper.find(CvModal).vm.$emit('secondary-click')

  //   await wrapper.vm.$nextTick()

  //   expect(wrapper.find('#new-alert-modal').classes()).not.toContain('is-visible')
  // })

  // it('hides modal when overlay clicked', async () => {
  //   const wrapper = createWrapper(SidebarAlerts, options)

  //   wrapper.setData({
  //     newAlertModalVisible: true
  //   })

  //   await wrapper.vm.$nextTick()

  //   wrapper.find(CvModal).vm.$emit('modal-hidden')

  //   await wrapper.vm.$nextTick()

  //   expect(wrapper.find('#new-alert-modal').classes()).not.toContain('is-visible')
  // })
})
