import * as types from '@/app/store/mutations/mutations-types'
import { getResource, createResource, deleteResource, updateResource } from '@/app/store/services'

export default {

  async getProperty (context, data) {
    context.commit(types.DATA_LOADING, true)

    let url

    if (typeof data === 'string') {
      url = data
    } else {
      url = data.url
    }

    try {
      const result = await getResource(url)
      if (data.key) {
        context.commit(types.DATA_SUCCESS, result[data.key])
      } else {
        context.commit(types.DATA_SUCCESS, result)
      }
    } catch (error) {
      context.commit(types.DATA_ERROR, error.response.data.message || error.response.statusText)
      /* eslint-disable-next-line no-console */
      console.log('error :>> ', error)
    }
  },
  async createProperty (context, { url, payload, key = '' }) {
    context.commit(types.CREATE_REQUEST)

    try {
      const result = await createResource({ url, payload })
      if (key) {
        context.commit(types.CREATE_SUCCESS, result[key])
      } else {
        context.commit(types.CREATE_SUCCESS, result)
      }
    } catch (error) {
      context.commit(types.CREATE_ERROR, error.response.data.message || error.response.statusText)
    }
  },
  async updateProperty (context, { url, payload, key = '' }) {
    context.commit(types.UPDATE_REQUEST)

    try {
      const result = await updateResource({ url, payload })
      if (key) {
        context.commit(types.UPDATE_SUCCESS, result[key])
      } else {
        context.commit(types.UPDATE_SUCCESS, result)
      }
    } catch (error) {
      context.commit(types.UPDATE_ERROR, error.response.data.message || error.response.statusText)
    }
  },
  async deleteProperty (context, url) {
    context.commit(types.DELETE_LOADING)
    try {
      const result = await deleteResource(url)
      if (result) {
        context.commit(types.DELETE_SUCCESS, result)
      } 
    } catch (error) {
      context.commit(types.DELETE_ERROR, error.response.data.message || error.response.statusText)
    }
  }

}
