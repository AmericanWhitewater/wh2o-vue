import SidebarArticles from '../components/side-bar-articles.vue'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    RiverArticles: {
      data: null,
      error: null,
      loading: null
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

describe('SidebarArticles', () => {
  it('it shows no articles prompt when empty', () => {
    const wrapper = createWrapper(SidebarArticles, options)

    expect(wrapper.find('p').text()).toEqual('No Articles. Click here to view Regional News.')
    expect(wrapper.find('#cv-inline-loading--articles').exists()).toBe(false)
  })

  it('shows loader when articles loading', () => {
    mockStore.state.RiverArticles.loading = true
    const wrapper = createWrapper(SidebarArticles, options)

    expect(wrapper.find('#cv-inline-loading--articles').exists()).toBe(true)
  })
})
