import { createWrapper } from '@/utils'
import NwiMapSearch from '@/app/views/river-index/components/nwi-map-search.vue'
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

describe('nwi-map-search.vue', () => {
  it('dispatches search query when emitted from search bar', async () => {
    const wrapper = createWrapper(NwiMapSearch, options)

    wrapper.findComponent(SearchBar).vm.$emit('search:submitted', 'gore crik')

    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1)
    expect(mockStore.dispatch).toHaveBeenCalledWith('[RIVER_INDEX] FETCH_MAP_SEARCH_DATA', 'gore crik')
  })
})
