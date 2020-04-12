import riverDetailState from '../main-tab/river-detail-data'
import { fetchRiverDetailData } from '@/app/views/river-detail/shared/services/main-tab.js'
import flushPromises from 'flush-promises'

jest.mock('@/app/views/river-detail/shared/services/main-tab.js')

const commit = jest.fn()

const result = {
  data: {
    reach: { avggradient: 71, class: 'IV', description: '<h3>mobile editing test </h3><p></p><p>@todo: add link support</p><p>The Numbers is widely considered just about the best Class IV run in the state of Colorado. At low levels, the river channelizes and is fun IV- down to about 300cfs for playboaters. At about 1000cfs the rapids graduate to IV proper, and over 2200cfs they take on a IV+ character.</p><p>There are six major Class IV rapids creatively named number 1 through 6, although most takeout shortly after #5. Rapid #1 is the most technical, but #4 and #5 generally have the most carnage. Above 3000cfs, the run takes on a big water character, massive holes abound. At these levels, a powerful 8-foot surfing wave forms at the base of rapid #1.5.</p><p>Much of the land on either side of the river is private property, so scouting is most likely illegal. Do what you have to do to be safe. As noted above, most people take out just after #5 where there is an abundance of unofficial takeouts. If the water level is medium to high, consider making the most of a short run and takeout below #6 at the railroad trestle.</p><p><strong>Elevations</strong></p><p>The river at the launch area is about 8,640 feet, while the take out at the railroad trestle is about 8,247 feet. </p><p><strong>Other Information Sources</strong></p><p><em>Colorado Rivers and Creeks II</em>, by Banks and Eckardt <em>(The Bible)</em></p>', edited: '2020-03-28 23:56:22', length: 5.98, maxgradient: null, plat: 38.994999, plon: -106.220001, photo: { id: '15196', post: { user: { uname: 'rangerrob', uid: '4671' } }, image: { uri: { medium: '/photos/archive/medium/15196.jpg', big: '/photos/archive/15196.jpg' } } }, river: 'Arkansas', section: '02. The Numbers' }
  }
}

describe('riverDetailState', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches river data and handles success', async () => {
    fetchRiverDetailData.mockResolvedValueOnce(result)

    await riverDetailState.actions['[RIVER_DETAIL] FETCH_RIVER_DETAIL_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[RIVER_DETAIL] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[RIVER_DETAIL] DATA_SUCCESS', result.data.reach)
  })
  it('fetches river data and handles error', async () => {
    const error = {
      message: 'lorem error'
    }

    fetchRiverDetailData.mockRejectedValueOnce(error)

    await riverDetailState.actions['[RIVER_DETAIL] FETCH_RIVER_DETAIL_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[RIVER_DETAIL] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[RIVER_DETAIL] DATA_ERROR', error)
  })

  it('toggles edit mode', async () => {
    await riverDetailState.actions['[RIVER_DETAIL] SET_EDIT_MODE']({ commit }, true)

    expect(commit).toHaveBeenNthCalledWith(1, '[RIVER_DETAIL] MODE_SET', true)
  })
})
