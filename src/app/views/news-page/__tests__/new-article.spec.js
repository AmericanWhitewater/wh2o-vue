import { createWrapper } from '@/utils'
import NewArticle from '../components/new-article.vue'

describe('new-article.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(NewArticle)

    expect(wrapper.find('.new-article').exists()).toBe(true)
  })
})
