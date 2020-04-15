import { createWrapper } from '@/app/global/services'
import BetaBoxEditModal from '../components/beta-box-edit-modal'

const mockStore = {
  state: {
    riverDetailState: {
      riverDetailData: {
        data: null
      }
    }
  },
  dispatch: jest.fn()
}

const riverId = '1234'

const mockRoute = {
  params: {
    id: riverId
  }
}

const httpClient = {
  post: jest.fn()
}

const options = {
  propsData: {
    visible: true
  },
  mocks: {
    $store: mockStore,
    $route: mockRoute,
    httpClient
  }
}

describe('BetaBoxEditModal', () => {
  it('is a vue component', () => {
    const wrapper = createWrapper(BetaBoxEditModal, options)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
