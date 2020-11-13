import CommentsSection from '../comments-section.vue'
import { createWrapper } from '@/utils'
import PostUpdateModal from '@/app/global/components/post-update-modal/post-update-modal'

const mockUser = {
  uid: '123',
  uname: 'foo',
  uemail: 'bar@aol.com'
}

const mockStore = {
  state: {
    RiverComments: {
      error: null,
      data: null,
      loading: null
    },
    User: {
      data: null
    }
  },
  dispatch: jest.fn()
}

const reachId = '123'

const options = {
  mocks: {
    $randomId: jest.fn(() => '123'),
    $store: mockStore,
    $route: {
      params: {
        id: reachId
      }
    }
  }
}

describe('CommentsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows loading block when loading', () => {
    mockStore.state.RiverComments.loading = true
    const wrapper = createWrapper(CommentsSection, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.RiverComments.loading = false
    mockStore.state.RiverComments.error = true
    const wrapper = createWrapper(CommentsSection, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows empty state when no comments present', () => {
    mockStore.state.RiverComments.loading = false
    mockStore.state.RiverComments.error = false
    mockStore.state.RiverComments.data = []

    const wrapper = createWrapper(CommentsSection, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(true)
  })

  it('sends login prompt if user not logged in and new comment button clicked', async () => {
    const wrapper = createWrapper(CommentsSection, options)

    wrapper.find('#new-comment').trigger('click')

    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, 'Global/sendToast', { kind: 'info', title: 'Please Log In' })
  })

  it('sends comment added toast when comment successfully edited', async () => {
    mockStore.state.User.data = mockUser

    const wrapper = createWrapper(CommentsSection, options)

    wrapper.findComponent(PostUpdateModal).vm.$emit('update:success')

    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, 'Global/sendToast', { kind: 'success', title: 'Comment Added' })
  })

  it('sends comment edited toast when comment successfully edited', async () => {
    const post = { id: '101250363', title: null, detail: 'how is there absolutely zero beta on this run?', post_date: '2013-06-27 00:00:00', revision: 23592, post_type: 'COMMENT', user: { uname: 'circuitmonkey', uid: '151431', image: { uri: { thumb: null, medium: null, big: '/resources/images/contacts/151431.jpg' } } } }

    mockStore.state.User.data = mockUser

    const wrapper = createWrapper(CommentsSection, options)

    wrapper.vm.editComment(post)

    await wrapper.vm.$nextTick()

    wrapper.findComponent(PostUpdateModal).vm.$emit('update:success')

    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, 'Global/sendToast', { kind: 'success', title: 'Comment Edited' })
  })

  it('shows modal when new comment is initiated', async () => {
    const wrapper = createWrapper(CommentsSection, options)

    wrapper.find('#new-comment').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.post-update-modal').classes()).toContain('is-visible')
  })

  it('hides modal when new comment is cancelled', async () => {
    const wrapper = createWrapper(CommentsSection, options)

    wrapper.find('#new-comment').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.post-update-modal').classes()).toContain('is-visible')

    wrapper.vm.handleCancel()

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.post-update-modal').classes()).not.toContain('is-visible')
  })

  it('loads comments when in view', () => {
    /**
     * not sure how to test scrolling, so we'll just check to see
     * if the dispatch was called 'on mounted'
     */

    const wrapper = createWrapper(CommentsSection, options)

    wrapper.vm.loadComments()

    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1,
      'RiverComments/getProperty', reachId
    )
  })

  it('handles successful submission and re-fetches comments', async () => {
    const wrapper = createWrapper(CommentsSection, options)

    wrapper.findComponent(PostUpdateModal).vm.$emit('update:success')

    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toBeCalledTimes(2)
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, 'Global/sendToast', {
      kind: 'success',
      title: 'Comment Added'
    })
  })
})
