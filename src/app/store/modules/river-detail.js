import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { httpClient } from '@/app/global/services'
import wkx from "wkx";

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
  },
  actions: {
    ...actions,
    async updateReach(context, data) {
      context.commit('DATA_REQUEST');
      try {
        const result = await httpClient
          .post('graphql', {
            query: `
              mutation ($id:ID!, $reach: ReachInput!) {
                reachUpdate(id: $id, reach: $reach) {
                  river,
                  section,
                  class,
                  length,
                  avggradient,
                  maxgradient
                }
              }
            `,
            variables: {
              id: data.id,
              reach: {
                river: data.river,
                section: data.section,
                class: data.class,
                length: data.length,
                avggradient: data.avggradient,
                maxgradient: data.maxgradient
              }
            }
          }).then(res => res.data)

        if (result.errors) {
          context.commit('DATA_ERROR', result.errors);
        } else {
          context.commit('DATA_SUCCESS', result.reachUpdate);
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
        const result = await httpClient
          .post('graphql', {
            query: `
              {
                reach(id: ${id}) {
                  avggradient
                  id
                  class
                  description
                  edited
                  edited
                  length
                  maxgradient
                  plat
                  plon
                  geom
                  photo {
                    id
                    post {
                      user {
                        uname
                        uid
                      }
                    }
                    image {
                      uri {
                        medium
                        big
                      }
                    }
                  }
                  river
                  section
                }
              }
            
            `,
          })
          .then((res) => res.data);

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
      context.commit('GEOM_UPDATE_REQUEST');

      const payloadData = {
        geom: wkx.Geometry.parseGeoJSON(geomData.geom).toWkt(),
        ploc: `${geomData.ploc[0]} ${geomData.ploc[1]}`,
        tloc: `${geomData.tloc[0]} ${geomData.tloc[1]}`,
        length: geomData.length,
      };

      const data = {
        id: context.state.data.id,
        ...payloadData,
      }

      try {
        const result = await httpClient
          .post('graphql', {
            query: `
                mutation ($id:ID!, $reach: ReachInput!) {
                  reachUpdate(id: $id, reach: $reach) {
                    geom,
                    ploc,
                    tloc,
                    length
                  }
                }
              `,
            variables: {
              id: data.id,
              reach: {
                geom: data.geom,
                ploc: data.ploc,
                tloc: data.tloc,
                length: data.length,
              },
            },
          })
          .then(res => res.data);

        if (result.data.errors) {
          context.commit('GEOM_UPDATE_ERROR', result.data.errors);
        } else {
          context.commit('GEOM_UPDATE_SUCCESS', result.data.reachUpdate);
        }

      } catch (error) {
        context.commit('GEOM_UPDATE_ERROR', error);
      }
    },
  }
}
