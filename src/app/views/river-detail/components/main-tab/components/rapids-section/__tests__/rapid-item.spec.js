/* eslint-disable no-unused-vars */
import { createWrapper } from '@/utils'
import RapidItem from '../components/rapid-item'

const rapid = { approximate: true, character: ['hazard', 'playspot'], description: '<p>\r\n\tLook for the Red Wall and then stay off it</p>\r\n', difficulty: 'IV', distance: 1.5, id: '102548', name: 'Red Wall', photo: { image: { uri: { big: '/photos/archive/885498.jpg', medium: '/photos/archive/medium/885498.jpg' } } } }

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockStore = {
  state: {
    Global: {
      editMode: false
    },
    User: {
      data: null
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
  stubs: ['RapidIconBar', 'RapidEditModal', 'ConfirmDeleteModal']
}
describe('rapid-item.vue', () => {
  it('it exists', () => {
    const wrapper = createWrapper(RapidItem, options)

    expect(wrapper.find('.rapid-item').exists()).toBe(true)
  })
})
