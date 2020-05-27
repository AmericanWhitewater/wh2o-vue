import { createWrapper } from '@/utils'
import FeatureCard from '../feature-card.vue'

describe('feature-card.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(FeatureCard)

    expect(wrapper.find('.bx--feature-card').exists()).toBe(true)
  })
})
