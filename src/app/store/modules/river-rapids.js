import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { httpClient } from '@/app/global/services'
import * as type from "../mutations/mutations-types"

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
    },

    ['CREATE_REQUEST']() {

    },
    ['CREATE_SUCCESS'](state, payload) {
      const newReach = payload;
      state.data.push(newReach);
      const rapids = state.data.sort((a, b) => a.distance - b.distance);
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
        const result = await httpClient
          .post('graphql', {
            query: `
                  query {
                    reach(id: ${reachId}) {
                      pois {
                        approximate
                        character
                        description
                        difficulty
                        distance
                        id
                        name
                        rloc
                        photo {
                          poi_name
                          subject
                          description
                          author
                          caption
                          photo_date
                          image {
                            uri {
                              thumb
                              medium
                              big
                            }
                          }
                          id
                        }
                      }
                    }
                  }
                `
          })
          .then(res => res.data)

        if (!result.errors) {
          const sortedPois = result.data.reach.pois.sort(
            (a, b) => a.distance - b.distance
          );
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
      const point = `${data.geom.coordinates[0]} ${data.geom.coordinates[1]}`;

      const payload = {
        ...data,
        rloc: point,
      };
      try {
        const result = await httpClient.post('graphql', {
          query: `
              mutation ($id:ID!, $poi: POIInput!) {
                poiUpdate(id: $id, poi: $poi) {
                  id,
                  name,
                  rloc,
                  description,
                  difficulty,
                  distance,
                  character
                }
              }
            `,
          variables: {
            id: payload.id,
            poi: {
              name: payload.name,
              rloc: payload.rloc,
              description: payload.description,
              difficulty: payload.difficulty,
              distance: payload.distance,
              character: payload.character
            }
          }
        }).then(res => res.data)

        if (!result.errors) {
          context.commit('UPDATE_SUCCESS', result.data.poiUpdate);
        } else {
          context.commit(type.DATA_ERROR, result.errors);
        }

      } catch (error) {
        context.commit(type.DATA_ERROR, error);
      }

    },

    async createRapid(context, data) {
      context.commit('CREATE_REQUEST', data);

      const payload = {
        ...data,
        rloc: `${data.geom.coordinates[0]} ${data.geom.coordinates[1]}`,
      };

      try {
        const result = await httpClient.post('graphql', {
          query: `
                mutation ($id:ID!, $poi: POIInput!) {
                  poiUpdate(id: $id, poi: $poi) {
                    id,
                    name,
                    rloc,
                    description,
                    difficulty,
                    distance,
                    character
                  }
                }
              `,
          variables: {
            id: payload.id,
            poi: {
              reach_id: payload.reach_id,
              name: payload.name,
              rloc: payload.rloc,
              description: payload.description,
              difficulty: payload.difficulty,
              distance: payload.distance,
              character: payload.character || [],
              approximate: false // change this if approximate is added to form
            }
          }
        }).then(res => res.data)

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
        const result = await httpClient.post('graphql', {
          query: `
            mutation ($id:ID!) {
              poiDelete(id: $id) {
                id
              }
            }
          `,
          variables: {
            id: data
          }
        }).then(res => res.data)
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
