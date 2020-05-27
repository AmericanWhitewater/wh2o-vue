import { createWrapper } from '@/utils'
import PageDescription from '../page-description.vue'

describe('page-description.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(PageDescription)

    expect(wrapper.find('.page-description').exists()).toBe(true)
  })
})
