import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import wkx from "wkx";
import {updateReach, getReach, updateReachGeom} from "@/app/services"

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
    ['GEOM_UPDATE_REQUEST'](state) {
      Object.assign(state, { loading: true, error: null });
    },

    ['GEOM_UPDATE_SUCCESS'](state, payload) {
      state.loading = false;
      Object.assign(state.data, {
        ...payload,
      });
    },

    ['GEOM_UPDATE_ERROR'](state, payload) {
      Object.assign(state, {
        error: payload || true,
        loading: false,
      });
    },
    ['DATA_RESET'](state) {
      Object.assign(state, {
        error: false,
        loading: false,
        data: null,
        refId: null
      })
    }
  },
  actions: {
    ...actions,
    async updateProperty(context, data) {
      context.commit('DATA_REQUEST');
      try {
        const result = await updateReach(data)
        
        if (result.errors) {
          context.commit('DATA_ERROR', result.errors);
        } else {

          context.commit('DATA_SUCCESS', result.data.reachUpdate);
        }
      } catch (error) {
        context.commit('DATA_ERROR', error);
      } finally {
        context.commit('DATA_LOADING', false)
      }
    },
    async getProperty(context, id) {
      try {
        context.commit('DATA_REQUEST')
        const result = await getReach(id)

        if (!result.errors) {
          context.commit('DATA_SUCCESS', result.data.reach)
        } else {
          context.commit('DATA_ERROR', 'error')
        }
      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    },
    async updateGeom(context, geomData) {
      context.commit('GEOM_UPDATE_REQUEST', geomData);

      const payloadData = {
        ...context.state.data, // must be first so fields are overridden
        geom: wkx.Geometry.parseGeoJSON(geomData.geom).toWkt(),
        ploc: `${geomData.ploc[0]} ${geomData.ploc[1]}`,
        tloc: `${geomData.tloc[0]} ${geomData.tloc[1]}`,
        length: geomData.length
      };

      try {
        const result = await updateReachGeom(payloadData)

        if (result.data.errors) {
          context.commit('GEOM_UPDATE_ERROR', result.data.errors);
        } else {
          context.commit('GEOM_UPDATE_SUCCESS', result.data.reachUpdate);
        }

      } catch (error) {
        context.commit('GEOM_UPDATE_ERROR', error);
      }
    },
    dataReset(context) {
      context.commit('DATA_RESET')
    }
  }
}
