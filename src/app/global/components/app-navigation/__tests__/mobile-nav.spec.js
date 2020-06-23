import { createWrapper } from '@/utils'
import MobileNav from '../components/mobile-nav.vue'

describe('mobile-nav.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(MobileNav)

    expect(wrapper.find('.mobile-nav').exists()).toBe(true)
  })
})
