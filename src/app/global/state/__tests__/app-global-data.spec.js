import appGlobalData from '../app-global-data'

const mockMath = Object.create(global.Math)
mockMath.random = () => 0.5
global.Math = mockMath

const commit = jest.fn()

describe('appGlobalData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
  *
  * Actions
  *
  */

  it('should handle an available app update', async () => {
  /**
   *
   * @reference src/registerServiceWorker.js
   *
   * if there is an app update available, we store the truthy
   * value in the store then trigger a toast notification directly
   * in the toaster component: src/app/global/components/app-toaster/app-toaster.vue
   *
   */
    await appGlobalData.actions['[APP_GLOBAL] UPDATE_AVAILABLE']({ commit }, true)

    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('[APP_GLOBAL] NEW_UPDATE', true)
  })

  it('updates edit mode', async () => {
    await appGlobalData.actions['[APP_GLOBAL] TOGGLE_EDIT_MODE']({ commit }, true)

    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('[APP_GLOBAL] EDIT_MODE', true)
  })

  /**
   * this is used to show/hide an icon in the nav bar:
   * src/app/global/components/app-navigation/app-navigation.vue
   *
   * this dispatch is triggered in network-status.js
   *
   * src/app/plugins/network-status.js
   *
   */

  it('updates network status', async () => {
    await appGlobalData.actions['[APP_GLOBAL] NETWORK_STATUS']({ commit }, 'online')

    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('[APP_GLOBAL] NETWORK', 'online')
  })

  it('handles new toast notifications', async () => {
    await appGlobalData.actions['[APP_GLOBAL] SEND_TOAST']({ commit }, {
      title: 'Alert Submitted',
      kind: 'success'
    })

    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('[APP_GLOBAL] NEW_TOAST', {
      id: '500',
      title: 'Alert Submitted',
      kind: 'success'
    })
  })
})
