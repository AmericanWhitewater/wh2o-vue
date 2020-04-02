import UserBookmarks from '../user-bookmarks.vue'
import { createWrapper } from '@/app/global/services'

const state = {
  riverDetailState: {
    bookmarksData: {
      error: null,
      data: [],
      loading: null
    }
  }
}

describe('user-profile.vue', () => {
  it('shows loading block when loading', () => {
    state.riverDetailState.bookmarksData.loading = true

    const wrapper = createWrapper(UserBookmarks, state, {})

    expect(wrapper.find('.user-bookmarks')).toMatchSnapshot()
    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
  })

  it('shows search bar when user has no bookmarks', () => {
    state.riverDetailState.bookmarksData.loading = false

    const wrapper = createWrapper(UserBookmarks, state, {})
    expect(wrapper.find('.cv-search').exists()).toBe(true)
  })
})
