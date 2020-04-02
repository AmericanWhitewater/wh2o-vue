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
    },
    alertsData: {
      error: null,
      data: null,
      loading: null
    }
  }
}

const options = {
  mocks: {
    $route: {
      params: {
        id: '123456789'
      }
    }
  }
}

describe('NewsTab', () => {
  it('shows loading block when articles loading', () => {
    state.riverDetailState.newsTabData.loading = true
    const wrapper = createWrapper(NewsTab, state, [], options)

    expect(wrapper.find('.news-tab')).toMatchSnapshot()
    expect(wrapper.find('.articles-loading').exists()).toBe(true)
    expect(wrapper.find('.articles-error').exists()).toBe(false)
  })

  it('shows error block when articles failed to load', () => {
    state.riverDetailState.newsTabData.loading = false
    state.riverDetailState.newsTabData.error = true
    const wrapper = createWrapper(NewsTab, state, [], options)

    expect(wrapper.find('.news-tab')).toMatchSnapshot()

    expect(wrapper.find('.articles-loading').exists()).toBe(false)
    expect(wrapper.find('.articles-error').exists()).toBe(true)
  })
  it('shows loading block when alerts loading', () => {
    state.riverDetailState.alertsData.loading = true
    const wrapper = createWrapper(NewsTab, state, [], options)

    expect(wrapper.find('.news-tab')).toMatchSnapshot()
    expect(wrapper.find('.alerts-loading').exists()).toBe(true)
    expect(wrapper.find('.alerts-error').exists()).toBe(false)
  })

  it('shows error block when alerts failed to load', () => {
    state.riverDetailState.alertsData.loading = false
    state.riverDetailState.alertsData.error = true
    const wrapper = createWrapper(NewsTab, state, [], options)

    expect(wrapper.find('.news-tab')).toMatchSnapshot()

    expect(wrapper.find('.alerts-loading').exists()).toBe(false)
    expect(wrapper.find('.alerts-error').exists()).toBe(true)
  })
})
