import EditModeToggle from '../edit-mode-toggle'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    Global: {
      editMode: false
    },
    User: {
      data: {
        uid: '1232'
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
      'Global/toggleEditMode',
      !mockStore.state.Global.editMode
    )
  })
  it('disables edit mode if user logged in', async () => {
    mockStore.state.Global.editMode = true
    const wrapper = createWrapper(EditModeToggle, options)
    wrapper.find('.edit-mode-toggle').trigger('click')
    await wrapper.vm.$nextTick()
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1)
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      'Global/toggleEditMode',
      !mockStore.state.Global.editMode
    )
  })

  it('send log in alert toast when user not logged in', async () => {
    mockStore.state.User.data = null

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
      'Global/sendToast',
      toastConfig
    )
  })
})
