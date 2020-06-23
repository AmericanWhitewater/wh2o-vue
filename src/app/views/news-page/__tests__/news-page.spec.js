import { createWrapper } from '@/utils'
import NewsPage from '../news-page.vue'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockStore = {
  state: {
    newsPageState: {
      newsData: {
        loading: false,
        data: null,
        featured: null
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

describe('news-page.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(NewsPage, options)

    expect(wrapper.find('.news-page').exists()).toBe(true)
  })
})
