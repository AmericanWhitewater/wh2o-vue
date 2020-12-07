import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getRapids, updateRapid, createRapid, deleteRapid } from '@/app/services'
import * as type from "../mutations/mutations-types"

const sortRapids = (a, b) => {
  if (a.distance === null) return 1;
  if (b.distance === null) return -1;
  else return (a.distance - b.distance);
}

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
    refId: null
  },
  mutations: {
    ...mutations,
    ['UPDATE_REQUEST']() {

    },
    ['UPDATE_SUCCESS'](state, payload) {
      const updatedReach = payload;
      const existingRapid = state.data.find((r) => r.id === updatedReach.id);
      Object.assign(existingRapid, { ...updatedReach });
      // resort in case the distances have changed
      Object.assign(state, {
        data: state.data.sort(sortRapids)
      });
    },

    ['CREATE_REQUEST']() {

    },
    ['CREATE_SUCCESS'](state, payload) {
      const newReach = payload;
      state.data.push(newReach);
      const rapids = state.data.sort(sortRapids);
      Object.assign(state, {
        data: rapids,
      });
    },

    ['DELETE_REQUEST']() { },

    ['DELETE_SUCCESS'](state, payload) {
      const id = payload.id;
      state.data = state.data.filter((x) => x.id !== id);
    },
  },
  actions: {
    ...actions,
    async getProperty(context, reachId) {
      context.commit(type.DATA_REQUEST);

      try {
        const result = await getRapids(reachId)

        if (!result.errors) {
          const sortedPois = result.data.reach.pois.sort(sortRapids);
          context.commit(type.DATA_SUCCESS, sortedPois);
        }
      } catch (error) {
        context.commit(type.DATA_ERROR, error);
      }
    },

    async resetState(context) {
      context.commit(type.DATA_RESET);
    },

    async updateRapid(context, data) {
      context.commit(type.UPDATE_REQUEST, data);
      
      try {
        const result = await updateRapid(data)

        if (!result.errors) {
          context.commit('UPDATE_SUCCESS', result.data.poiUpdate);
        } else {
          context.commit(type.DATA_ERROR, result.errors);
          context.dispatch('Global/sendToast', {
            kind: 'error',
            title: 'Unauthorized',
            text: 'You are not authorized to access edit features.'
          })
        }

      } catch (error) {
        context.commit(type.DATA_ERROR, error);
      }

    },

    async createRapid(context, data) {
      context.commit('CREATE_REQUEST', data);

      try {
        const result = await createRapid(data)

        if (!result.errors) {
          context.commit('CREATE_SUCCESS', result.data.poiUpdate);
        } else {
          context.commit(type.DATA_ERROR, result.errors);
        }

      } catch (error) {
        context.commit(type.DATA_ERROR, error)
      }
    },

    async deleteRapid(context, data) {
      context.commit('DELETE_REQUEST', data);
      try {
        const result = await deleteRapid(data)
        if (!result.errors) {
          context.commit('DELETE_SUCCESS', result.data.poiDelete);
        } else {
          context.commit(type.DATA_ERROR, "error");
        }
      } catch (error) {
        context.commit(type.DATA_ERROR, error)
      }
    },
  }
}
