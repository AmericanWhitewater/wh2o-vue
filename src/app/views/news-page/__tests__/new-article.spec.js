import { createWrapper } from '@/utils'
import NewArticle from '../components/new-article.vue'

const options = {
  stubs: ['ContentEditor']
}

describe('new-article.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(NewArticle, options)

    expect(wrapper.find('.new-article').exists()).toBe(true)
  })
})
