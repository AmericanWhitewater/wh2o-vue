import { createWrapper } from '@/utils'
import MobileNav from '../components/mobile-nav.vue'

const options = {
  propsData: {
    offline: false
  }
}

describe('mobile-nav.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(MobileNav, options)

    expect(wrapper.find('.mobile-nav').exists()).toBe(true)
  })
})
