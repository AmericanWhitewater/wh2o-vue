import { submoduleOneData } from '..'
import { fetchSubmoduleOneData } from '../../services/submodule-one'
import flushPromises from 'flush-promises'

jest.mock('../../services/submodule-one')

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

    fetchSubmoduleOneData.mockResolvedValueOnce(result)

    await submoduleOneData.actions['[SUBMODULE_ONE] FETCH_SUBMODULE_ONE_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[SUBMODULE_ONE] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[SUBMODULE_ONE] DATA_SUCCESS', result.data)
  })

  it('fetches data and handles error', async () => {
    const error = {
      message: 'lorem error'
    }

    fetchSubmoduleOneData.mockRejectedValueOnce(error)

    await submoduleOneData.actions['[SUBMODULE_ONE] FETCH_SUBMODULE_ONE_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[SUBMODULE_ONE] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[SUBMODULE_ONE] DATA_ERROR', error)
  })
})
