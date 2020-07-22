import { createWrapper } from '@/utils'
import PageBanner from '../page-banner.vue'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockGeom = '-98.937033 29.543013,-98.93711 29.542808,-98.937091 29.542642,-98.936953 29.542384,-98.936915 29.542076,-98.936934 29.541894,-98.936997 29.541806,-98.937299 29.541724,-98.937664 29.541696,-98.93784 29.541652,-98.938022 29.541526,-98.938054 29.541278,-98.938286 29.540618,-98.938205 29.540376,-98.938205 29.540046,-98.938349 29.539798,-98.938827 29.539182,-98.938928 29.538995,-98.938941 29.538736,-98.938991 29.538637,-98.938985 29.538549,-98.938941 29.538379,-98.938771 29.538236,-98.93857 29.538175,-98.937726 29.538181,-98.937481 29.538131,-98.937311 29.538043,-98.937192 29.537889,-98.937148 29.537487,-98.937097 29.537328,-98.93704 29.537062,-98.936984 29.537009,-98.936852 29.536987,-98.936537 29.536888,-98.93645 29.536835,-98.936336 29.536777,-98.936095 29.536532,-98.935986 29.536436,-98.93578 29.536256,-98.93546 29.536067,-98.935292 29.535958,-98.935191 29.535771,-98.935065 29.535215,-98.935034 29.534962,-98.934946 29.53472,-98.934858 29.534533,-98.934839 29.534318,-98.934914 29.533752,-98.934958 29.533509,-98.935172 29.533372,-98.935273 29.533163,-98.935556 29.533075,-98.935602 29.532837,-98.935476 29.532088'

const options = {
  propsData: {
    title: 'lorem ipsum',
    map: true
  },
  stubs: ['nwi-map']
}

describe('page-banner.vue', () => {
  it('should show map when map prop is true', () => {
    const wrapper = createWrapper(PageBanner, options)

    expect(wrapper.find('.map-wrapper').exists()).toBe(true)
  })

  it('should show map unavailable prompt when no geom is passed', () => {
    const wrapper = createWrapper(PageBanner, options)

    expect(wrapper.find('#utility-block').exists()).toBe(true)
    expect(wrapper.find('nwi-map-stub').exists()).toBe(false)
  })

  it('should render reach geom and show map when geom prop passed', () => {
    options.propsData.geom = mockGeom

    const wrapper = createWrapper(PageBanner, options)

    expect(wrapper.find('nwi-map-stub').exists()).toBe(true)
    expect(wrapper.find('#utility-block').exists()).toBe(false)
  })

  it('should hide map when map prop is false', () => {
    options.propsData.map = false

    const wrapper = createWrapper(PageBanner, options)
    expect(wrapper.find('.map-wrapper').exists()).toBe(false)
    expect(wrapper.find('header').exists()).toBe(true)
  })
})
