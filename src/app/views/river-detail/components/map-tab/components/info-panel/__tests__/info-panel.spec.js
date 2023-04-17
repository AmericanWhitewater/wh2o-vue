import { createWrapper } from '@/utils'
import InfoPanel from '../info-panel.vue'

jest.mock('maplibre-gl/dist/maplibre-gl', () => ({
  Map: () => ({})
}))

describe('info-panel.vue', () => {
  it('exists', () => {
    const wrapper = createWrapper(InfoPanel)

    expect(wrapper.find('.info-panel').exists()).toBe(true)
  })
})
