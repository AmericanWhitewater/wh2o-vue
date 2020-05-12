import AppBreadcrumbs from '../app-breadcrumbs'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    riverDetailState: {
      riverDetailData: {
        data: {
          river: 'foo',
          section: 'bar'
        }
      }
    }
  }
}

const mockRoute = {
  name: 'river-index',
  meta: {
    crumbLabel: 'Test Crumb'
  }
}

const options = {
  mocks: {
    $store: mockStore,
    $route: mockRoute
  },
  stubs: ['router-link']
}

describe('AppBreadcrumbs', () => {
  it('is hidden when on river-index route', () => {
    const wrapper = createWrapper(AppBreadcrumbs, options)

    expect(wrapper.find('.app-breadcrumbs-wrapper').attributes('style')).toBe('display: none;')
  })

  it('is visible on non-river-index routes', () => {
    mockRoute.name = 'river-detail'

    const wrapper = createWrapper(AppBreadcrumbs, options)

    expect(wrapper.find('.app-breadcrumbs-wrapper').attributes('style')).toBeFalsy()
  })
})
