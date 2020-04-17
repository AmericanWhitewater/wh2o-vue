import PostUpdateModal from '../post-update-modal'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
    userState: {
      userData: {
        data: {
          uid: '123'
        }
      }
    }
  }
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('PostUpdateModal', () => {
  it('is a vue component', () => {
    const wrapper = createWrapper(PostUpdateModal, options)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
