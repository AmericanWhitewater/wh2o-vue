import { rest } from '@/services'
import * as types from '../mutations/mutationTypes'

export default {
  async getProperty(context, data) {
    try {
      context.commit(types.DATA_LOADING, true)

      let requestURL = ''

      if (data.url) {
        requestURL = data.url
      } else {
        requestURL = data
      }

      const result = await rest.get(requestURL).then((res) => res.data)

      if (result) {

        if (data.key) {
          context.commit(types.DATA_SUCCESS, result[data.key])
        } else {
          context.commit(types.DATA_SUCCESS, result)
        }
      }

    } catch (error) {
      context.commit(types.DATA_ERROR, error)
    } finally {
      context.commit(types.DATA_LOADING, false)
    }
  },
  setProperty(context, data) {
    context.commit(types.SET_DATA, data)
  }
}