import submoduleTwoData from '../submodule-two-data'
import { fetchSubmoduleTwoData } from '../../services/submodule-two'
import flushPromises from 'flush-promises'

jest.mock('../../services/submodule-two')

const commit = jest.fn()

describe('subModuleData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches data and handles success', async () => {
    const result = {
      data: {
        message: 'data'
      }
    }

    fetchSubmoduleTwoData.mockResolvedValueOnce(result)

    await submoduleTwoData.actions['[SUBMODULE_TWO] FETCH_SUBMODULE_TWO_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[SUBMODULE_TWO] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[SUBMODULE_TWO] DATA_SUCCESS', result.data)
  })
  it('fetches data and handles error', async () => {
    const error = {
      message: 'lorem error'
    }

    fetchSubmoduleTwoData.mockRejectedValueOnce(error)

    await submoduleTwoData.actions['[SUBMODULE_TWO] FETCH_SUBMODULE_TWO_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[SUBMODULE_TWO] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[SUBMODULE_TWO] DATA_ERROR', error)
  })
})
