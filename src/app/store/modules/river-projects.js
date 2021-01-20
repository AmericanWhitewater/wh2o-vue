import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getReachProjects } from '@/app/services'

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
    async getProperty(context, id) {
      context.commit('DATA_REQUEST')
      try {
        const result = await getReachProjects(id)
        const projects = result.data.linker.find(x => x.type === 'PROJECT').data
        
        context.commit('DATA_SUCCESS', projects)
      } catch (error) {
        // console.log('error :>> ', error);
      }

    }
  }
}
