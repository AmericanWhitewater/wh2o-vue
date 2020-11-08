import { modules } from '../index'
import flushPromises from 'flush-promises'
import { getResource } from '../services'

jest.mock('../services')

const commit = jest.fn()

const mockError = {
  response: {
    data: {
      message: 'ERROR YO!'
    }
  }
}

Object.keys(modules).forEach(key => {
  describe(`Core: ${key}`, () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('fetches data with provided info and handles error', async () => {
      getResource.mockRejectedValueOnce(mockError)

      await modules[key].actions.getProperty({ commit }, true)

      await flushPromises()

      expect(commit).toHaveBeenCalledTimes(2)
      expect(commit).toHaveBeenNthCalledWith(1, 'DATA_LOADING', true)
      expect(commit).toHaveBeenNthCalledWith(2, 'DATA_ERROR', 'ERROR YO!')
    })

    it('fetches data with provided info and handles success', async () => {
      getResource.mockResolvedValueOnce('data')

      await modules[key].actions.getProperty({ commit }, true)

      await flushPromises()

      expect(commit).toHaveBeenCalledTimes(2)
      expect(commit).toHaveBeenNthCalledWith(1, 'DATA_LOADING', true)
      expect(commit).toHaveBeenNthCalledWith(2, 'DATA_SUCCESS', 'data')
    })
  })
})
