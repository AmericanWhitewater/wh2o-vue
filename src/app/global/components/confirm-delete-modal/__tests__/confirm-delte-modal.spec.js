import ConfirmDeleteModal from '../confirm-delete-modal'
import { createWrapper } from '@/utils'

const options = {
  propsData: {
    resourceName: 'Lorem Resource Name',
    visible: false,
    kind: 'strict'
  },
  mocks: {
    $router: jest.fn()
  }
}

describe('ConfirmDeleteModal', () => {
  it('should disable primary click button if user input invalid', async () => {
    const wrapper = createWrapper(ConfirmDeleteModal, options)

    await wrapper.find('#user-input-field').setValue('Lorem Resource')

    expect(wrapper.find('.bx--btn--danger').attributes('disabled')).toBe('disabled')
  })
})
