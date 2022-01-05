import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getReachCredits, updateReachRevision } from '@/app/services'

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null
  },
  mutations: {
    ...mutations,
    ['UPDATE_SUCCESS'](state, payload) {
      // if the credit exists in our list of credits, find it and update
      const newCreditList = state.data.slice();
      const indexToUpdate = newCreditList.findIndex(x => x.revision === payload.revision);
      newCreditList[indexToUpdate].revision_comment = payload.revision_comment;
      Object.assign(state, { loading: false, data: newCreditList });
    }
  },
  actions: {
    ...actions,
    async updateProperty(context, data) {
      context.commit('UPDATE_REQUEST');
      const result = await updateReachRevision(data);

      try {
        if (result.errors) {
          context.commit("UPDATE_ERROR", result.errors);
        } else {
          context.commit("UPDATE_SUCCESS", result.data.reachRevisionUpdate)
        }
      } catch (error) {
        context.commit("UPDATE_ERROR", error);
      }
    },
    async getProperty(context, id) {
      try {
        context.commit('DATA_REQUEST')
        const result = await getReachCredits(id)
        
        if (!result.errors) {
          context.commit('DATA_SUCCESS', result.data.reach.revisions.data)
        }
        
      } catch (error) {
        context.commit('DATA_ERROR', error)
        // console.log('error :>> ', error);
      }
    }
  }
}
