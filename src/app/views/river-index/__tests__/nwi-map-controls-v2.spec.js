import { createWrapper } from '@/utils'
import NwiMapControlsV2 from '@/app/views/river-index/components/nwi-map-controls-v2.vue'
import { SearchBar } from '@/app/global/components'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}))

const mockStore = {
  dispatch: jest.fn()
}

const options = {
  mocks: {
    $store: mockStore
  },
  stubs: ['PaintBrushAlt16', 'Maximize16']
}
test.todo('toggles icons: assert presence of component')

describe('nwi-map-controls-v2.vue', () => {
  it('dispatches search query when emitted from search bar', async () => {
    const wrapper = createWrapper(NwiMapControlsV2, options)

    wrapper.findComponent(SearchBar).vm.$emit('search:submitted', 'gore crik')

    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenCalledTimes(2)
    expect(mockStore.dispatch).toHaveBeenCalledWith('[RIVER_SEARCH] FETCH_RIVER_SEARCH_DATA', { river: 'gore crik' })
  })
})
