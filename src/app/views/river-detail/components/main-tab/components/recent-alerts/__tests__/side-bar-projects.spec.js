import SidebarProjects from '../components/side-bar-projects.vue'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    RiverProjects: {
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

describe('SidebarProjects', () => {
  it('it shows no projects prompt when empty', () => {
    const wrapper = createWrapper(SidebarProjects, options)

    expect(wrapper.find('p').text()).toEqual('No Projects.')
  })

  it('shows loader when projects loading', () => {
    mockStore.state.RiverProjects.loading = true
    const wrapper = createWrapper(SidebarProjects, options)

    expect(wrapper.find('#cv-inline-loading--projects').exists()).toBe(true)
  })
})
