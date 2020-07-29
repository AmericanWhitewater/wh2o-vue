import { createWrapper } from '@/utils'
import FeatureCard from '../feature-card.vue'

const options = {
  propsData: {
    to: '/foo',
    img: 'bar',
    title: 'lorem ipsum'
  },
  stubs: ['router-link', 'ResourceCard']
}

describe('feature-card.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(FeatureCard, options)

    expect(wrapper.find('.bx--feature-card').exists()).toBe(true)
  })
})
