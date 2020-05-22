import { createWrapper } from '@/utils'
import PageBanner from '../page-banner.vue'

describe('page-banner.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(PageBanner)

    expect(wrapper.find('.page-banner').exists()).toBe(true)
  })
})
