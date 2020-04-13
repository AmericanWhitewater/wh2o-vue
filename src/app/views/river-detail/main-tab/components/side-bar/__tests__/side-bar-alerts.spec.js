import { CvModal } from '@carbon/vue'
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
    $route: mockRoute
  }
}

describe('SidebarAlerts.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows empty state text when no alerts', () => {
    const wrapper = createWrapper(SidebarAlerts, options)

    expect(wrapper.findAll('p').at(0).text()).toEqual('There are no new alerts.')
    expect(wrapper.find('#cv-inline-loading--alerts').exists()).toBe(false)
  })

  it('shows spinner for alerts when loading', () => {
    mockStore.state.riverDetailState.alertsData.loading = true

    const wrapper = createWrapper(SidebarAlerts, options)

    expect(wrapper.find('#cv-inline-loading--alerts').exists()).toBe(true)
  })

  it('shows new alert modal when add alert button clicked', async () => {
    const wrapper = createWrapper(SidebarAlerts, options)

    wrapper.find('#new-alert').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#new-alert-modal').classes()).toContain('is-visible')
  })

  it('hides modal when cancel button clicked', async () => {
    const wrapper = createWrapper(SidebarAlerts, options)

    wrapper.setData({
      newAlertModalVisible: true
    })

    await wrapper.vm.$nextTick()

    wrapper.find(CvModal).vm.$emit('secondary-click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#new-alert-modal').classes()).not.toContain('is-visible')
  })

  it('hides modal when overlay clicked', async () => {
    const wrapper = createWrapper(SidebarAlerts, options)

    wrapper.setData({
      newAlertModalVisible: true
    })

    await wrapper.vm.$nextTick()

    wrapper.find(CvModal).vm.$emit('modal-hidden')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('#new-alert-modal').classes()).not.toContain('is-visible')
  })
})
