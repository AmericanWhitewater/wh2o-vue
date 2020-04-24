import ArticleCard from '../article-card'
import { createWrapper } from '@/utils'

const options = {
  propsData: {
    title: 'test'
  },
  mocks: {
    $router: jest.fn()
  }
}

describe('ArticleCard', () => {
  it('it is a vue instance', () => {
    const wrapper = createWrapper(ArticleCard, options)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
