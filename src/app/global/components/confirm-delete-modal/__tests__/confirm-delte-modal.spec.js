import ConfirmDeleteModal from '../confirm-delete-modal'
import { createWrapper } from '@/utils'

const options = {
  propsData: {
    resourceName: 'test',
    visible: false
  },
  mocks: {
    $router: jest.fn()
  }
}

describe('ConfirmDeleteModal', () => {
  it('exists', () => {
    const wrapper = createWrapper(ConfirmDeleteModal, options)
    expect(wrapper.find('.confirm-delete-modal').exists()).toBe(true)
  })
})
