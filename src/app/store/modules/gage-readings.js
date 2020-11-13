import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import axios from 'axios'
import { baseUrl } from '@/app/environment'

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
        const url = `${baseUrl}api/gauge/${data.gauge_id}/flows/${data.metric_id}?from=${data.timeStart}&to=${data.timeEnd}&resolution=${data.resolution}`
        /**
         * @note points to laravel rest endpoint
         */
        const result = await axios.get(url).then(res => res.data)

        context.commit('DATA_SUCCESS', result)

      } catch (error) {
        console.log('error :>> ', error);
      }
    }
  }
}
