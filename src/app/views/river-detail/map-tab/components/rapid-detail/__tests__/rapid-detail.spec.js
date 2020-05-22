import { createWrapper } from '@/utils'
import RapidDetail from '../rapid-detail.vue'

const rapid = { approximate: true, character: ['hazard', 'playspot'], description: '<p>\r\n\tLook for the Red Wall and then stay off it</p>\r\n', difficulty: 'IV', distance: 1.5, id: '102548', name: 'Red Wall', photo: { image: { uri: { big: '/photos/archive/885498.jpg', medium: '/photos/archive/medium/885498.jpg' } } } }

const mockStore = {
  state: {
    riverDetailState: {
      rapidsData: {
        loading: false,
        data: null,
        error: false
      }
    }
  }
}

const options = {
  mocks: {
    $store: mockStore,
    $sanitize: jest.fn(),
    $replaceText: jest.fn()
  },
  propsData: {
    rapid
  },
  stubs: ['RapidIconBar']
}

describe('rapid-detail.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(RapidDetail, options)

    expect(wrapper.find('.rapid-detail').exists()).toBe(true)
  })
})
