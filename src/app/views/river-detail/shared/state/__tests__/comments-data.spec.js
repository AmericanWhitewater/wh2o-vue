import commentsData from '@/app/views/river-detail/shared/state/main-tab/comments-data.js'
import { fetchCommentsData } from '@/app/views/river-detail/shared/services/comments.js'
import flushPromises from 'flush-promises'

jest.mock('@/app/views/river-detail/shared/services/comments.js')

const commit = jest.fn()

const result = {
  data: {
    reach: {
      posts: {
        data: [
          { id: 'bY_TrFERilHvbdE4N_-t1', title: 'This is a new alert', detail: 'Yo!!!', post_date: '2020-04-09 00:00:00', revision: 31782, post_type: 'COMMENT', gauge: null, user: { uname: 'drewalth', uid: '153461', image: { uri: { thumb: '/resources/images/contacts/thumb/153461-1.jpg', medium: '/resources/images/contacts/medium/153461-1.jpg', big: '/resources/images/contacts/153461-1.jpg' } } } }
        ]
      }
    }
  }
}

describe('commentsData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches comments data and handles success', async () => {
    fetchCommentsData.mockResolvedValueOnce(result)

    await commentsData.actions['[COMMENTS] FETCH_COMMENTS_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[COMMENTS] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[COMMENTS] DATA_SUCCESS', result.data.reach.posts.data)
  })

  it('fetches comments data and handles error', async () => {
    const error = {
      message: 'lorem error'
    }

    fetchCommentsData.mockRejectedValueOnce(error)

    await commentsData.actions['[COMMENTS] FETCH_COMMENTS_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[COMMENTS] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[COMMENTS] DATA_ERROR', error)
  })
})
