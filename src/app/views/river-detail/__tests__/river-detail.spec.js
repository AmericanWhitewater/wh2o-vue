import { createWrapper } from '@/utils'
import RiverDetail from '../river-detail.vue'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockAlerts = [{ id: '100955924', title: null, detail: 'A landowner around the #5 rapid has had some problems with his property being trashed up and property being destroyed (trees cut, fences torn down).  In addition both he and his family have had some nasty encounters with various people (including boaters).  While there is a small parking area near the bridge, it appears that there is no direct public access from the road to the river around the #5 rapid (including around the bridge).  The land owner appears to be simply asking that people respect his property and not to access the river from the road without direct permission!', post_date: '2009-07-11 00:00:00', revision: 24892, post_type: 'WARNING', user: null }]

const mockUser = {
  uname: 'shrigPaddleBro',
  uid: '123456789'
}

const mockRoute = {
  params: {
    id: '123'
  }
}

const mockRouter = {
  replace: jest.fn(() => { }),
  beforeEach: jest.fn()
}

const mockStore = {
  state: {
    riverDetailState: {
      riverDetailData: {
        data: null,
        error: false,
        loading: false
      },
      alertsData: {
        data: null
      }
    },
    riverIndexState: {
      riverIndexData: {
        mapStyle: 'satellite'
      }
    },
    appGlobalState: {
      appGlobalData: {
        editMode: false
      }
    },
    userState: {
      userData: {
        data: null
      }
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore,
    $router: mockRouter,
    $route: mockRoute
  },
  stubs: ['router-view', 'EditOff20', 'Notification20', 'NotificationNew20', 'Favorite20', 'Edit20', 'geometry-editor', 'FavoriteFilled20']
}

describe('river-detail.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('loads data on initial load', () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = createWrapper(RiverDetail, options)

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, '[RIVER_DETAIL] FETCH_RIVER_DETAIL_DATA', '123')
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, '[REACH_GAGES] FETCH_GAGES', '123')
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(3, '[ALERTS] FETCH_ALERTS_DATA', '123')
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(4, '[GAGE_METRICS] FETCH_GAGE_METRICS', '123')
  })

  it('displays login prompt / toast when user attempts to edit when not logged in', async () => {
    const wrapper = createWrapper(RiverDetail, options)

    await wrapper.find('#edit-mode-toggle').trigger('click')

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(6, '[APP_GLOBAL] SEND_TOAST', { kind: 'error', title: 'Must log in to edit' })
  })

  it('enables edit mode when user logged in and edit mode disabled', async () => {
    mockStore.state.userState.userData.data = mockUser

    const wrapper = createWrapper(RiverDetail, options)

    await wrapper.find('#edit-mode-toggle').trigger('keydown.enter')

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(6, '[APP_GLOBAL] TOGGLE_EDIT_MODE', true)
  })

  it('disables edit mode when user logged in and edit mode enabled', async () => {
    mockStore.state.appGlobalState.appGlobalData.editMode = true

    const wrapper = createWrapper(RiverDetail, options)

    await wrapper.find('#edit-mode-toggle').trigger('click')

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(6, '[APP_GLOBAL] TOGGLE_EDIT_MODE', false)
  })

  it('shows no new notifications icon when reach has alerts', () => {
    const wrapper = createWrapper(RiverDetail, options)

    expect(wrapper.find('.button-wrapper notificationnew20-stub').exists()).toBe(false)
    expect(wrapper.find('.button-wrapper notification20-stub').exists()).toBe(true)
  })
  it('shows new notification icon when reach has alerts', () => {
    mockStore.state.riverDetailState.alertsData.data = mockAlerts

    const wrapper = createWrapper(RiverDetail, options)

    expect(wrapper.find('.button-wrapper notificationnew20-stub').exists()).toBe(true)
    expect(wrapper.find('.button-wrapper notification20-stub').exists()).toBe(false)
  })

  it('bookmarks reach when not previously bookmarked and notifies user', async () => {
    const wrapper = createWrapper(RiverDetail, options)

    await wrapper.find('#bookmark-toggle').trigger('click')

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(6, '[BOOKMARKS] ADD_BOOKMARK', '123')
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(7, '[APP_GLOBAL] SEND_TOAST', { kind: 'success', title: 'Bookmark Added' })
  })

  it('removes bookmarked reach and notifies user', async () => {
    const wrapper = createWrapper(RiverDetail, options)

    wrapper.setData({
      bookmarked: true
    })

    await wrapper.vm.$nextTick()

    await wrapper.find('#bookmark-toggle').trigger('click')

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(6, '[BOOKMARKS] REMOVE_BOOKMARK', '123')
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(7, '[APP_GLOBAL] SEND_TOAST', { kind: 'success', title: 'Bookmark Removed' })
  })
})
