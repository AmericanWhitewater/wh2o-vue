import { createWrapper } from '@/utils'
import PageBanner from '../page-banner.vue'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

describe('page-banner.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(PageBanner)

    expect(wrapper.find('.page-banner').exists()).toBe(true)
  })
})
