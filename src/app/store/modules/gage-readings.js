import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import {getGageReadings} from "@/app/services"

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
    refId: null
  },
  mutations,
  actions: {
    ...actions,
    async getProperty(context, data) {
      try {
        context.commit('DATA_REQUEST')
        const result = await getGageReadings(data)

        context.commit('DATA_SUCCESS', result)
      } catch (error) {
        // console.log('error :>> ', error);
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
