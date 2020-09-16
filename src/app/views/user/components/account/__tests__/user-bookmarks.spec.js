import UserBookmarks from '../user-bookmarks.vue'
import { createWrapper } from '@/utils'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

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
    expect(wrapper.find('.utility-block-loading').exists()).toBe(true)
  })
})
