import { createWrapper } from '@/utils'
import NwiBasemapToggle from '../components/nwi-basemap-toggle.vue'

const mockStore = {
  state: {
    RiverIndex: {
      mapStyle: 'satellite'
    }
  },
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  }
}

describe('nwi-basemap-toggle.vue', () => {
  it('dispatches mapstyle action when maystlye changed', async () => {
    const wrapper = createWrapper(NwiBasemapToggle, options)

    wrapper.setData({
      baseMap: 'topo'
    })

    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toBeCalledTimes(1)
    expect(mockStore.dispatch).toBeCalledWith('RiverIndex/setMapStyle', 'topo')
  })
})
