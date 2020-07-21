import { createWrapper } from '@/utils'
import PageBanner from '../page-banner.vue'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const options = {
  propsData: {
    title: 'lorem ipsum'
  }
}

describe('page-banner.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(PageBanner, options)

    expect(wrapper.find('.page-banner').exists()).toBe(true)
  })
})
