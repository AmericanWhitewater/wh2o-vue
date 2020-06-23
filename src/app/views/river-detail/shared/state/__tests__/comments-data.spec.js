import commentsData from '@/app/views/river-detail/shared/state/main-tab/comments-data.js'
import { fetchCommentsData } from '@/app/views/river-detail/shared/services/comments.js'
import flushPromises from 'flush-promises'

jest.mock('@/app/views/river-detail/shared/services/comments.js')

const commit = jest.fn()

const result = {
  data: {
    posts: {
      data: [{ id: '7KBzeegug0_EmpPUsUJEL', title: null, detail: 'test 01', post_date: '2020-04-12 00:00:00', revision: 31783, post_type: 'COMMENT', user: { uname: 'drewalth', uid: '153461', image: { uri: { thumb: '/resources/images/contacts/thumb/153461-1.jpg', medium: '/resources/images/contacts/medium/153461-1.jpg', big: '/resources/images/contacts/153461-1.jpg' } } } }, { id: '101251163', title: null, detail: '', post_date: '2014-06-18 00:00:00', revision: 23822, post_type: 'COMMENT', user: { uname: 'ppodgorski', uid: '145800', image: { uri: { thumb: null, medium: null, big: null } } } }, { id: '101251162', title: null, detail: '', post_date: '2014-06-15 00:00:00', revision: 23823, post_type: 'COMMENT', user: { uname: 'ppodgorski', uid: '145800', image: { uri: { thumb: null, medium: null, big: null } } } }, { id: '101250363', title: null, detail: 'how is there absolutely zero beta on this run?', post_date: '2013-06-27 00:00:00', revision: 23592, post_type: 'COMMENT', user: { uname: 'circuitmonkey', uid: '151431', image: { uri: { thumb: null, medium: null, big: '/resources/images/contacts/151431.jpg' } } } }]
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
    expect(commit).toHaveBeenNthCalledWith(2, '[COMMENTS] DATA_SUCCESS', result.data.posts.data)
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
