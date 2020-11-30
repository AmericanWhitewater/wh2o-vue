import UserLogin from '../user-login.vue'
import { createWrapper } from '@/utils'
import flushPromises from 'flush-promises'
import { userLogin } from '../services/user-login'

jest.mock('../services/user-login')

const mockStore = {
  state: {
    User: {
      data: null
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  },
  stubs: ['cv-link']
}

describe('UserLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('makes one api call on submit and handles success', async () => {
    const result = {
      access_token: 'supersecureaccesstoken',
      expires_in: 31536000,
      refresh_token: 'randomredreshtoken',
      token_type: 'Bearer'
    }

    userLogin.mockResolvedValueOnce(result)
    const wrapper = createWrapper(UserLogin, options)

    wrapper.setData({
      formData: {
        username: 'john',
        password: 'password'
      }
    })

    wrapper.vm.submitLogin()

    await flushPromises()

    expect(userLogin).toBeCalledTimes(1)

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, 'User/getProperty')
  })
})
