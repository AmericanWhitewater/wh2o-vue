import { createWrapper } from '@/utils'
import ResourceCard from '../resource-card.vue'

const options = {
  propsData: {
    title: 'lorem ipsum',
    to: '/foo'
  },
  stubs: ['router-link', 'ArrowRight16']
}

describe('resource-card.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(ResourceCard, options)

    expect(wrapper.find('.bx--resource-card').exists()).toBe(true)
  })
})
