import gageDetailData from '../gage-detail-data'
import { fetchGageDetailData } from '../../services/gage-detail'
import flushPromises from 'flush-promises'

jest.mock('../../services/gage-detail')

const commit = jest.fn()

const result = {
  data: {
    gauge: { enabled: true, huc: '01010001', updates: [{ write_sequence: '13058862', updated: '2020-05-03 11:30:17', obs_time: '2020-05-03 10:59:12', obs_ref: null, obs_reading: 7.88, obs_id: '4493530247', obs_data: null, metric_id: 8, lobs_time: '2020-05-03 00:00:00', lobs_reading: 7.74, lobs_id: '4493525297', last_journal_date: null, gd_ref: null }, { write_sequence: '13058862', updated: '2020-05-03 11:30:17', obs_time: '2020-05-03 10:59:12', obs_ref: null, obs_reading: 19700, obs_id: '4493530247', obs_data: null, metric_id: 2, lobs_time: '2020-05-03 00:00:00', lobs_reading: 19000, lobs_id: '4493525297', last_journal_date: null, gd_ref: null }], timezone: 'America/New_York', state: 'USA-MAI', source_id: '01010000', source: 'usgs', name: 'St. John River at Ninemile Bridge, Maine', loc: '0101000020E6100000399D64ABCB6D51C01F82AAD1AB594740', id: '1' }
  }
}

describe('fetchGageDetailData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches data and handles success', async () => {
    fetchGageDetailData.mockResolvedValueOnce(result)

    await gageDetailData.actions['[GAGE_DETAIL] FETCH_GAGE_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[GAGE_DETAIL] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[GAGE_DETAIL] DATA_SUCCESS', result.data.gauge)
  })
  it('fetches data and handles error', async () => {
    const error = {
      message: 'lorem error'
    }

    fetchGageDetailData.mockRejectedValueOnce(error)

    await gageDetailData.actions['[GAGE_DETAIL] FETCH_GAGE_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[GAGE_DETAIL] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[GAGE_DETAIL] DATA_ERROR', error)
  })
})
