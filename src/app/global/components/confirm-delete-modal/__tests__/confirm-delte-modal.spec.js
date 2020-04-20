import ConfirmDeleteModal from '../confirm-delete-modal'
import { createWrapper } from '@/app/global/services'

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
  it('it is a vue instance', () => {
    const wrapper = createWrapper(ConfirmDeleteModal, options)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
