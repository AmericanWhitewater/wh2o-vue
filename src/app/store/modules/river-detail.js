import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import wkx from "wkx";
import {updateReach, getReach, deleteReach } from "@/app/services"

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
    ['UPDATE_SUCCESS'](state, payload) {
      // just overwrite the fields that have changed
      const newReach = Object.assign({}, state.data, payload);
      Object.assign(state, {
        loading: false,
        data: newReach
      });
    },
    ['DATA_RESET'](state) {
      Object.assign(state, {
        error: false,
        loading: false,
        data: null,
        refId: null
      })
    },

    ['DELETE_REQUEST']() { },

    ['DELETE_SUCCESS']() { }
  },
  actions: {
    ...actions,
    async updateProperty(context, data) {
      context.commit('UPDATE_REQUEST');
      try {
        const payload = Object.assign({}, data);
        const id = data.id;
        delete payload.id;
        if (data.geom) {
          Object.assign(payload, {
            geom: wkx.Geometry.parseGeoJSON(data.geom).toWkt(),
            ploc: `${data.ploc[0]} ${data.ploc[1]}`,
            tloc: `${data.tloc[0]} ${data.tloc[1]}`,
          });
        }

        const result = await updateReach({
          id: id,
          reach: payload
        });

        if (result.errors) {
          context.commit('UPDATE_ERROR', result.errors);
        } else {
          context.commit('UPDATE_SUCCESS', result.data.reachUpdate);
          if (payload.geom) {
            context.dispatch('Global/sendToast', {
                title: 'Geometry updated. It may take up to 5 minutes for your changes to appear in the national map.',
                kind: 'info',
                contrast: false,
                action: false,
                autoHide: false
              }, { root: true });
          }

          // refresh credits list to include new revision
          // river-detail component watches for changes and will pop up a form
          // prompting users to set the revision comment
          context.dispatch("RiverCredits/getProperty", id, { root: true });
        }
      } catch (error) {
        context.commit('UPDATE_ERROR', error);
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
    async deleteReach(context, data) {
      context.commit('DELETE_REQUEST', data);
      try {
        const result = await deleteReach(data)
        if (!result.errors) {
          context.commit('DELETE_SUCCESS', result.data.reachDelete);
          context.commit('DATA_RESET');
        } else {
          context.commit('DATA_ERROR', "error");
        }
      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    },
    dataReset(context) {
      context.commit('DATA_RESET')
    }
  }
}
