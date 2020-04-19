import PostUpdateModal from '../post-update-modal'
import { createWrapper } from '@/app/global/services'
import { postUpdate } from '../services/postUpdate'
import flushPromises from 'flush-promises'

jest.mock('../services/postUpdate')

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
  },
  propsData: {
    title: 'test',
    visible: false,
    kind: 'WARNING'
  }
}

test.todo('it makes one api call and handles errors')

describe('PostUpdateModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('it makes api call and handles success on submit', async () => {
    const result = {
      data: {
        postUpdate: {
          id: '12345'
        }
      }
    }

    postUpdate.mockResolvedValueOnce(result)

    const wrapper = createWrapper(PostUpdateModal, options)

    wrapper.vm.handleSubmit()

    await flushPromises()

    expect(postUpdate).toBeCalledTimes(1)
    expect(wrapper.emitted('update:pending')[0]).toEqual([true])
    expect(wrapper.emitted('update:success')).toEqual([['12345']])
    expect(wrapper.emitted('update:pending')[1]).toEqual([false])
  })

  it('emits cancel event when alert submission cancelled', async () => {
    const wrapper = createWrapper(PostUpdateModal, options)

    wrapper.vm.handleCancel()

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:cancelled')[0]).toEqual([true])
  })
})
