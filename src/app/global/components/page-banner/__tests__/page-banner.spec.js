import { createWrapper } from '@/utils'
import PageBanner from '../page-banner.vue'

const options = {
  propsData: {
    title: 'lorem ipsum'
  }
}

describe('page-banner.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(PageBanner, options)
    expect(wrapper.find('header').exists()).toBe(true)
  })
})
