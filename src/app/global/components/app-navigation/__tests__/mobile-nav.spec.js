import { createWrapper } from '@/utils'
import MobileNav from '../components/mobile-nav.vue'

const mockRouter = {
  push: jest.fn(() => ({
    catch: jest.fn()
  })
  )
}

const mockStore = {
  state: {
    User: {
      data: null
    }
  },
  dispatch: jest.fn()
}

const options = {
  propsData: {
    offline: false
  },
  mocks: {
    $router: mockRouter,
    $store: mockStore
  }
}

describe('mobile-nav.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should keep drawer menu closed by default', () => {
    const wrapper = createWrapper(MobileNav, options)

    expect(wrapper.find('.drawer').exists()).toBe(false)
  })

  it('should open drawer menu when toggle clicked', async () => {
    const wrapper = createWrapper(MobileNav, options)

    await wrapper.find('.nav-trigger').trigger('click')

    expect(wrapper.find('.drawer').exists()).toBe(true)
  })

  it('should open drawer menu when toggle clicked', async () => {
    const wrapper = createWrapper(MobileNav, options)

    await wrapper.find('.nav-trigger').trigger('click')
    await wrapper.find('.nav-trigger').trigger('click')

    expect(wrapper.find('.drawer').exists()).toBe(false)
  })

  it('should show login button when user not logged in', async () => {
    const wrapper = createWrapper(MobileNav, options)

    await wrapper.find('.nav-trigger').trigger('click')

    expect(wrapper.find('#login-button').exists()).toBe(true)
    expect(wrapper.find('#logout-button').exists()).toBe(false)
  })

  it('should show logout button when user logged in', async () => {
    mockStore.state.User.data = { uid: '123', name: 'paddleDood420' }

    const wrapper = createWrapper(MobileNav, options)

    await wrapper.find('.nav-trigger').trigger('click')

    expect(wrapper.find('#login-button').exists()).toBe(false)
    expect(wrapper.find('#logout-button').exists()).toBe(true)
  })

  it('should navigate to home page when logo clicked', async () => {
    const wrapper = createWrapper(MobileNav, options)

    await wrapper.find('#logo-wrapper').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })

  it('should hide offline indicator when network connected', () => {
    const wrapper = createWrapper(MobileNav, options)

    expect(wrapper.find('#offline-indicator').exists()).toBe(false)
  })

  it('should display offline indicator when network disconnected', () => {
    options.propsData.offline = true

    const wrapper = createWrapper(MobileNav, options)

    expect(wrapper.find('#offline-indicator').exists()).toBe(true)
  })

  it('should navigate to map when map button clicked', async () => {
    const wrapper = createWrapper(MobileNav, options)

    await wrapper.find('.nav-trigger').trigger('click')
    await wrapper.find('.map-button').trigger('click')

    expect(mockRouter.push).toBeCalledTimes(1)
    expect(mockRouter.push).toBeCalledWith('/river-index')
  })

  it('should navigate to news page when news button clicked', async () => {
    const wrapper = createWrapper(MobileNav, options)

    await wrapper.find('.nav-trigger').trigger('click')
    await wrapper.find('.news-button').trigger('click')

    expect(mockRouter.push).toBeCalledTimes(1)
    expect(mockRouter.push).toBeCalledWith('/news')
  })
})
