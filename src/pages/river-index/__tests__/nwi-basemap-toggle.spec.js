import { createWrapper } from '@/utils'
import NwiBasemapToggle from '../components/nwi-basemap-toggle.vue'

const mockStore = {
  state: {
    riverIndexState: {
      riverIndexData: {
        mapStyle: 'satellite'
      }
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
    expect(mockStore.dispatch).toBeCalledWith('[RIVER_INDEX] SET_MAP_STYLE', 'topo')
  })
})
