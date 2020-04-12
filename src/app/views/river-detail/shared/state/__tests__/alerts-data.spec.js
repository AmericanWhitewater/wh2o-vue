import alertsData from '@/app/views/river-detail/shared/state/main-tab/alerts-data.js'
import { fetchAlertsData } from '@/app/views/river-detail/shared/services/alerts.js'
import flushPromises from 'flush-promises'

jest.mock('@/app/views/river-detail/shared/services/alerts.js')

const commit = jest.fn()

const result = {
  data: {
    reach: {
      posts: {
        data: [
          { id: 'bY_TrFERilHvbdE4N_-t1', title: 'This is a new alert', detail: 'Yo!!!', post_date: '2020-04-09 00:00:00', revision: 31782, post_type: 'WARNING', gauge: null, user: { uname: 'drewalth', uid: '153461', image: { uri: { thumb: '/resources/images/contacts/thumb/153461-1.jpg', medium: '/resources/images/contacts/medium/153461-1.jpg', big: '/resources/images/contacts/153461-1.jpg' } } } }
        ]
      }
    }
  }
}

describe('alertsData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches river data and handles success', async () => {
    fetchAlertsData.mockResolvedValueOnce(result)

    await alertsData.actions['[ALERTS] FETCH_ALERTS_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[ALERTS] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[ALERTS] DATA_SUCCESS', result.data.reach.posts.data)
  })

  it('fetches river data and handles error', async () => {
    const error = {
      message: 'lorem error'
    }

    fetchAlertsData.mockRejectedValueOnce(error)

    await alertsData.actions['[ALERTS] FETCH_ALERTS_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[ALERTS] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[ALERTS] DATA_ERROR', error)
  })
})
