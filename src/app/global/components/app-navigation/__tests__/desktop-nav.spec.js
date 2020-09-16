import DesktopNav from '../components/desktop-nav.vue'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    userState: {
      userData: {
        error: null,
        data: null,
        loading: null
      }
    }
  }
}

const options = {
  mocks: {
    $store: mockStore,
    $route: {
      name: 'home'
    }
  },
  propsData: {
    offline: false
  },
  stubs: ['router-link']
}

describe('desktop-nav.vue', () => {
  it('hides offline indicator when offline', () => {
    const wrapper = createWrapper(DesktopNav, options)

    expect(wrapper.find('#network-tag').exists()).toBe(false)
  })
  it('shows offline indicator when offline', () => {
    options.propsData.offline = true
    const wrapper = createWrapper(DesktopNav, options)
    expect(wrapper.find('#network-tag').exists()).toBe(true)
  })
  it('shows login button when user logged in', () => {
    const wrapper = createWrapper(DesktopNav, options)
    expect(wrapper.find('#login-btn').exists()).toBe(true)
    expect(wrapper.find('#account-btn').exists()).toBe(false)
  })
  it('shows account button when user logged in', () => {
    mockStore.state.userState.userData.data = { uname: 'johnDoe' }
    const wrapper = createWrapper(DesktopNav, options)
    expect(wrapper.find('#login-btn').exists()).toBe(false)
    expect(wrapper.find('#account-btn').exists()).toBe(true)
  })
})

test.todo('is routes to map when map button clicked')
test.todo('is routes to news when news button clicked')
test.todo('is routes to login when login button clicked')
test.todo('is routes to account when account button clicked')
