import CommentsSection from '../comments-section.vue'
import { createWrapper } from '@/app/global/services'

const state = {
  riverDetailState: {
    commentsData: {
      error: null,
      data: null,
      loading: null
    }
  }
}

describe('CommentsSection', () => {
  it('shows loading block when loading', () => {
    state.riverDetailState.commentsData.loading = true
    const wrapper = createWrapper(CommentsSection, state, {})

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    state.riverDetailState.commentsData.loading = false
    state.riverDetailState.commentsData.error = true
    const wrapper = createWrapper(CommentsSection, state, {})

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
