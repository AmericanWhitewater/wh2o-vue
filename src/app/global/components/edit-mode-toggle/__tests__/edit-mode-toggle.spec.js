import EditModeToggle from '../edit-mode-toggle'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
    appGlobalState: {
      appGlobalData: {
        editMode: false
      }
    },
    userState: {
      userData: {
        data: {
          uid: '1232'
        }
      }
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  }
}
describe('edit-mode-toggle.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('enables edit mode if user logged in', async () => {
    const wrapper = createWrapper(EditModeToggle, options)

    wrapper.find('.edit-mode-toggle').trigger('click')

    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1)
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[APP_GLOBAL] TOGGLE_EDIT_MODE',
      !mockStore.state.appGlobalState.appGlobalData.editMode
    )
  })
  it('disables edit mode if user logged in', async () => {
    mockStore.state.appGlobalState.appGlobalData.editMode = true
    const wrapper = createWrapper(EditModeToggle, options)
    wrapper.find('.edit-mode-toggle').trigger('click')
    await wrapper.vm.$nextTick()
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1)
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[APP_GLOBAL] TOGGLE_EDIT_MODE',
      !mockStore.state.appGlobalState.appGlobalData.editMode
    )
  })

  it('send log in alert toast when user not logged in', async () => {
    mockStore.state.userState.userData.data = null

    const toastConfig = {
      title: 'Must log in to edit',
      kind: 'error',
      override: true,
      contrast: false,
      action: false,
      autoHide: true
    }

    const wrapper = createWrapper(EditModeToggle, options)

    wrapper.find('.edit-mode-toggle').trigger('click')

    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1)
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      '[APP_GLOBAL] SEND_TOAST',
      toastConfig
    )
  })
})
