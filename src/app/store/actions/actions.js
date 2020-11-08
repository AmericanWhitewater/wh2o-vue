import * as types from '@/app/store/mutations/mutations-types'
import { getResource } from '@/app/store/services'

export default {

  async getProperty (context, data) {
    context.commit(types.DATA_LOADING, true)

    try {
      const result = await getResource(data)
      if (data.key) {
        context.commit(types.DATA_SUCCESS, result[data.key])
      } else {
        context.commit(types.DATA_SUCCESS, result)
      }
    } catch (error) {
      context.commit(types.DATA_ERROR, error.response.data.message || error.response.statusText)
    }
  }

}
