import { createWrapper } from '@/utils'
import PageDescription from '../page-description.vue'

const options = {
  propsData: {
    description: 'lorem description'
  }
}

describe('page-description.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(PageDescription, options)

    expect(wrapper.find('.page-description').exists()).toBe(true)
  })
})
