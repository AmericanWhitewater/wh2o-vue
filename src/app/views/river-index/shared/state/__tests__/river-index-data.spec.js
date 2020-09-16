import riverIndexData from '../river-index-data'
import { fetchRiverSearchData } from '../../services/map-search'
import flushPromises from 'flush-promises'

jest.mock('../../services/map-search.js')

const commit = jest.fn()

const result = {
  data: {
    reachmap: {
      data: [
        { reach_id: 1234 }
      ]
    }
  }
}

describe('riverIndexData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches river search data and handles success', async () => {
    fetchRiverSearchData.mockResolvedValueOnce(result)

    await riverIndexData.actions['[RIVER_INDEX] FETCH_MAP_SEARCH_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenCalledWith('[RIVER_INDEX] MAP_SEARCH_TERM', '123')
    expect(commit).toHaveBeenCalledWith('[RIVER_INDEX] MAP_SEARCH_LOADING', true)
    expect(commit).toHaveBeenCalledWith('[RIVER_INDEX] MAP_SEARCH_SUCCESS', result.data.reachmap.data)
  })

  it('clears search term', async () => {
    await riverIndexData.actions['[RIVER_INDEX] CLEAR_MAP_SEARCH_QUERY']({ commit })

    await flushPromises()

    expect(commit).toHaveBeenCalledWith('[RIVER_INDEX] MAP_SEARCH_TERM', null)
    expect(commit).toHaveBeenCalledWith('[RIVER_INDEX] MAP_SEARCH_LOADING', false)
  })
})
