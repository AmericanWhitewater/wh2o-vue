import { createWrapper } from '@/utils'
import SearchBar from '../search-bar.vue'

describe('search-bar.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(SearchBar)

    expect(wrapper.find('.search-bar').exists()).toBe(true)
  })
})
