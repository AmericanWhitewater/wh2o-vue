import PostUpdateModal from '../post-update-modal'
import { createWrapper } from '@/app/global/services'
import { postUpdate } from '../services/postUpdate'
import flushPromises from 'flush-promises'
import { CvModal } from '@carbon/vue'

jest.mock('../services/postUpdate')

const mockStore = {
  state: {
    userState: {
      userData: {
        data: null
      }
    }
  }
}

const options = {
  mocks: {
    $store: mockStore
  },
  methods: {
    setInitialFormData: jest.fn()
  },
  propsData: {
    title: 'Test Update',
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

    wrapper.find(CvModal).vm.$emit('primary-click')

    await flushPromises()

    expect(postUpdate).toBeCalledTimes(1)

    expect(wrapper.emitted('update:pending')[0]).toEqual([true])
    expect(wrapper.emitted('update:success')).toEqual([['12345']])
    expect(wrapper.emitted('update:pending')[1]).toEqual([false])
  })

  it('emits cancel event when modal cancel button clicked', async () => {
    const wrapper = createWrapper(PostUpdateModal, options)

    wrapper.find(CvModal).vm.$emit('secondary-click')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:cancelled')[0]).toEqual([true])
  })

  it('emits cancel event when modal hidden', async () => {
    const wrapper = createWrapper(PostUpdateModal, options)

    wrapper.find(CvModal).vm.$emit('modal-hidden')

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:cancelled')[0]).toEqual([true])
  })

  it('updates form data when exising post is being editing', async () => {
    const wrapper = createWrapper(PostUpdateModal, options)

    wrapper.setProps({
      post: {
        id: '123',
        title: 'test',
        detail: 'test',
        post_type: 'WARNING',
        post_date: 'test',
        user: {
          uid: '153461'
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(options.methods.setInitialFormData).toBeCalledTimes(2)
  })
})
