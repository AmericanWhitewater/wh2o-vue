import moduleData from '../module-data'
import { fetchModuleData } from '../../services/module'
import flushPromises from 'flush-promises'

jest.mock('../../services/module')

const commit = jest.fn()

const result = {
  data: {
    message: 'data'
  }
}

describe('moduleData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches data and handles success', async () => {
    fetchModuleData.mockResolvedValueOnce(result)

    await moduleData.actions['[MODULE] FETCH_MODULE_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[MODULE] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[MODULE] DATA_SUCCESS', result.data)
  })
  it('fetches data and handles error', async () => {
    const error = {
      message: 'lorem error'
    }

    fetchModuleData.mockRejectedValueOnce(error)

    await moduleData.actions['[MODULE] FETCH_MODULE_DATA']({ commit }, '123')

    await flushPromises()

    expect(commit).toHaveBeenNthCalledWith(1, '[MODULE] DATA_REQUEST')
    expect(commit).toHaveBeenNthCalledWith(2, '[MODULE] DATA_ERROR', error)
  })
})
