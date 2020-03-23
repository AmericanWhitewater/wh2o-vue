import NewsTab from '@/app/views/river-detail/news-tab/news-tab.vue'
import { createWrapper } from '@/app/global/services'

const state = {
  userState: {
    userData: {
      data: null
    }
  },
  riverDetailState: {
    newsTabData: {
      error: null,
      data: null,
      loading: null
    }
  }
}

describe('NewsTab', () => {
  it('shows loading block when loading', () => {
    state.riverDetailState.newsTabData.loading = true
    const wrapper = createWrapper(NewsTab, state, {})

    expect(wrapper.find('.news-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
    expect(wrapper.find('.utility-block-error').exists()).toBe(false)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })

  it('shows error block when error', () => {
    state.riverDetailState.newsTabData.loading = false
    state.riverDetailState.newsTabData.error = true
    const wrapper = createWrapper(NewsTab, state, {})

    expect(wrapper.find('.news-tab')).toMatchSnapshot()

    expect(wrapper.find('.utility-block-loading').exists()).toBe(false)
    expect(wrapper.find('.utility-block-error').exists()).toBe(true)
    expect(wrapper.find('.utility-block-content').exists()).toBe(false)
  })
})
