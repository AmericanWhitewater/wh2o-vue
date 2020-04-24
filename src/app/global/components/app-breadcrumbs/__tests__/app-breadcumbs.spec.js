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
    },
    riverSearchState: {
      riverSearchData: {
        data: null
      }
    },
    riverIndexState: {
      riverIndexData: {
        data: null
      }
    }
  },
  dispatch: jest.fn()
}

const mockRoute = {
  name: 'test',
  meta: {
    crumbLabel: 'Test'
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
  it('it is a vue instance', () => {
    const wrapper = createWrapper(AppBreadcrumbs, options)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
