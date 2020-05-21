import { createWrapper } from '@/utils'
import ArticleDetail from '../components/article-detail.vue'

const mockStore = {
  state: {
    newsPageState: {
      articleData: {
        data: null,
        loading: false,
        error: false
      },
      newsData: {
        frontPageNews: null,
        loading: false,
        error: false
      }
    }
  },
  dispatch: jest.fn()
}

const mockRoute = {
  params: {
    id: '123'
  }
}

const options = {
  mocks: {
    $store: mockStore,
    $route: mockRoute
  }
}

describe('article-detail.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(ArticleDetail, options)

    expect(wrapper.find('.article-detail').exists()).toBe(true)
  })
})
