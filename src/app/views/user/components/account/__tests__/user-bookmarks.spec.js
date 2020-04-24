import UserBookmarks from '../user-bookmarks.vue'
import { createWrapper } from '@/utils'

const mockStore = {
  state: {
    riverDetailState: {
      bookmarksData: {
        error: null,
        data: [],
        loading: null
      }
    }
  }
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('user-profile.vue', () => {
  it('shows loading block when loading', () => {
    mockStore.state.riverDetailState.bookmarksData.loading = true

    const wrapper = createWrapper(UserBookmarks, options)

    expect(wrapper.find('.user-bookmarks')).toMatchSnapshot()
    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
  })

  it('shows search bar when user has no bookmarks', () => {
    mockStore.state.riverDetailState.bookmarksData.loading = false

    const wrapper = createWrapper(UserBookmarks, options)
    expect(wrapper.find('.cv-search').exists()).toBe(true)
  })
})
