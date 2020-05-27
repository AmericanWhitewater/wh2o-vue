import { createWrapper } from '@/utils'
import ResourceCard from '../resource-card.vue'

describe('resource-card.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(ResourceCard)

    expect(wrapper.find('.bx--resource-card').exists()).toBe(true)
  })
})
