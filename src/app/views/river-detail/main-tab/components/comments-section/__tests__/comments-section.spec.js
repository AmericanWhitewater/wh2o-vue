import CommentsSection from '../comments-section.vue'
import { createWrapper } from '@/app/global/services'

const mockStore = {
  state: {
    riverDetailState: {
      commentsData: {
        error: null,
        data: null,
        loading: null
      }
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('CommentsSection', () => {
  it('shows loading block when loading', () => {
    mockStore.state.riverDetailState.commentsData.loading = true
    const wrapper = createWrapper(CommentsSection, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    mockStore.state.riverDetailState.commentsData.loading = false
    mockStore.state.riverDetailState.commentsData.error = true
    const wrapper = createWrapper(CommentsSection, options)

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
